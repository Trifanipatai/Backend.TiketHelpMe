const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog');
const { post } = require('../routes/blog');
const fs =  require ('fs');
const path = require('path')

exports.createBlogPost = (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const unit = req.body.unit;
    const nama = req.body.nama;
    const email = req.body.email;
    const NoHP = req.body.NoHp;
    const topik = req.body.topik;
    const deskripsi = req.body.deskripsi;
    const lokasi = req.body.lokasi;


    const Posting = new BlogPost ({
        unit: unit,
        nama: nama,
        email: email,
        NoHP: NoHP,
        topik: topik,
        deskripsi: deskripsi,
        lokasi: lokasi,
    })

    Posting.save ()
    .then(result =>{
        res.status(201).json({
            message: 'Data Berhasil dibuat',
            data: result
        });
        
    })
    .catch(err => {
        console.log('err: ', err);
    });     
   
}

exports.getAllBlogPost = (req, res, next) => {
    BlogPost.find()
    .then(result => {
        res.status(200).json({
            message: 'Data Blog Berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getBlogPostById = (req, res, next) => {
    const postId = req.params.postId;
    BlogPost.findById(postId)
    .then(result =>{
        if(!result) {
            const error =  new Error('Blog Post tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Data Blog Post Berhasil Dipanggil',
            data: result,
        })

    })
    .catch(err => {
        next(err);
    })
}

exports.updateBlogPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }


    const unit = req.body.unit;
    const nama = req.body.nama;
    const email = req.body.email;
    const NoHP = req.body.NoHp;
    const topik = req.body.topik;
    const deskripsi = req.body.deskripsi;
    const lokasi = req.body.lokasi;
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post =>{
        if(!post){
            const err = new Error('Blog Post tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }
        post.unit = unit;
        post.nama = nama;
        post.email = email;
        post.NoHP = NoHP;
        post.topik = topik;
        post.deskripsi = deskripsi;
        post.lokasi = lokasi;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update Data Success',
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteBlogPost = (req, res, next) => {
    const postId = req.params.postId;
    
    BlogPost.findById(postId)
    .then(post =>{
        if(!post) {
            const error =  new Error('Blog Post tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }

    })
    .then(result => {
        res.status(200).json({
            message: 'Hapus Blog Post Berhasil',
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
}