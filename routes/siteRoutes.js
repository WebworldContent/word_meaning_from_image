import express from 'express';
import multer from 'multer';
import path from 'path';
import url from 'url';

const router = express.Router();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..' , 'public'))
    },
    filename: (req, file, cb) => {
        cb(null, `uploadedImage.${file.mimetype.split('/')[1] }`)
    }
})

const upload = multer({
    storage: store
})

import processingImage from '../controller/diction.js';

router.get('/', (req, res, next) => {
    res.render('webcam')
});

router.post('/processingData', async (req, res, next) => {
    try {
        const objectData = await processingImage(req.body.data, req.body.isUploaded);
        res.json(objectData);
    } catch (err) {
        res.sendStatus(500)
    }
});

router.post('/processed', upload.single('image'), async (req, res, next) => {
    let imageData = '';
    let uploadedImage = 0;
    if (req.file) {
        imageData= req.file.filename
        uploadedImage = 1;
    } else {
        const base64Init = 'data:image/png;base64,';
        imageData = base64Init + req.body.imageData
    }
    res.render('processedData', {
        imageBase: imageData,
        isUploadedImage: uploadedImage
    })
});

export default router;
