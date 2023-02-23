import express from 'express';

const router = express.Router();

import processingImage from '../controller/diction.js';

router.get('/', (req, res, next) => {
    res.render('webcam')
});

router.post('/processingData', async (req, res, next) => {
    try {
        const imageData = req.body.data;
        const objectData = await processingImage(imageData);
        res.json(objectData);
    } catch (err) {
        res.sendStatus(500)
    }
});

router.post('/processed', async (req, res, next) => {
    const serializedBlog = req.body.imageData
    res.render('processedData', {
        imageBase: serializedBlog
    })
});

export default router;
