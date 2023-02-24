import express from 'express';
import multer from 'multer';

const router = express.Router();

// this below code is for storing the image on pulic other other preferred folder 
// const store = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '..' , 'public'))
//     },
//     filename: (req, file, cb) => {
//         cb(null, `uploadedImage.${file.mimetype.split('/')[1] }`)
//     }
// })

const upload = multer({})

import processingImage from '../controller/diction.js';

router.get('/', (req, res, next) => {
    console.log('on index page')
    res.render('webcam')
});

router.post('/processingData', async (req, res, next) => {
    try {
        const objectData = await processingImage(req.body.data);
        res.json(objectData);
    } catch (err) {
        res.sendStatus(500)
    }
});

router.post('/processed', upload.single('image'), async (req, res, next) => {
    console.log('on processed route')
    const base64Init = 'data:image/png;base64,';
    const imageData = req.file ? req.file.buffer.toString('base64') : base64Init + req.body.imageData;
    res.render('processedData', {
        imageBase: base64Init + imageData
    })
});

export default router;
