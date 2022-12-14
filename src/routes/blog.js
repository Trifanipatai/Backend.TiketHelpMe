const express = require ('express');
const {body} = require('express-validator');

const router = express.Router();

const blogController = require('../controllers/blog');

router.post('/post', [
    body('unit'),
    body('nama'),
    body('email').isEmail({}).withMessage('Input email tidak sesuai'),
    body('NoHp').isLength({min: 9, max: 12}).withMessage('Input Min 9 dan Max 12'),
    body('topik'),
    body('deskripsi').isLength({min: 20}).withMessage('Min 20 Karakter'),
    body('lokasi')],blogController.createBlogPost);

router.get('/posts', blogController.getAllBlogPost);
router.get('/post/:postId', blogController.getBlogPostById);
router.put('/post/:postId', [
        body('title')
        .isLength({min: 5})
        .withMessage('Input tittle tidak sesuai'),
        body('body')
        .isLength({min: 5})
        .withMessage('Input body tidak sesuai')], 
        blogController.updateBlogPost);
    
router.delete('/post/:postId', blogController.deleteBlogPost);

module.exports = router;