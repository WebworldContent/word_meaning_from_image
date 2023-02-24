import axios from "axios";
import readline from 'readline';
import {Readable} from 'stream';
import Tesseract from 'tesseract.js';
import path from 'path';
import url from 'url';

async function fetchMeaning(word) {
    try {
        const result = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (200 === result.status) {
            return result ?. data[0] ?. meanings[0] ?. definitions.map((data) => data.definition)
        }

        return [];

    } catch (err) {
        return [];
    }
}

function convertToStream(str) {
    const stream = new Readable();
    stream.push(str);
    stream.push(null);
    return stream;
}

async function readData(data) {
    const rl = readline.createInterface({input: convertToStream(data), crlfDelay: Infinity});
    const mapping = {};

    for await(let line of rl) {
        line = line.trim()
        const words = line ? line.match(/\w+[^\s+?._+,-]{3,}/g) : [];
        const meanings = await Promise.all(words.map(word => fetchMeaning(word)));

        words.forEach((word, indx) => {
            mapping[word] = meanings[indx]
        });
    }

    return mapping;
}

async function readImage(imageData, isUploaded = false) {
    try {
        const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
        if (imageData.length) {
            const image = isUploaded ? path.join(__dirname, '..' , 'public', imageData) : Buffer.from(imageData, "base64")
            const lang = 'eng'; // for only english recognition for 
            const { data: { text } } = await Tesseract.recognize(image , lang)
            return await readData(text)
        }
    } catch (err) {
        Tesseract.terminate();
        throw err;
    }
}

export default readImage
