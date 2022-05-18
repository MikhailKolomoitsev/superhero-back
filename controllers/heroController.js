const uuid = require('uuid')
const path = require('path')
const { Hero } = require('../models/Hero')
const { cloudinary } = require('../utils/cloudinary');

class HeroController {
    async create(req, res, next) {
        try {
            // const { nickname, realName, superpowers, chatchPhrase, images}=req.body

            // const fileName = uuid.v4() + '.jpg'
            // const filePath = path.resolve(__dirname, '..', "static", fileName)
            // const uploadResponse = await cloudinary.uploader.upload(filePath, {
            //     upload_preset: 'ml_default',
            // });
            // const images = uploadResponse.url
            // console.log(images);

            const hero = await Hero.create(req.body)
            res.status(201).json({
                status: 'success',
                code: 201,
                data: { hero }
            })
            return res.json(hero)
        } catch (error) {
            console.log(error.message);
        } finally {
            next()
        }
    }

    async getAll(req, res, next) {
        try {
            const Heroes = await Hero.find({})
            res.json(Heroes)
        } catch (error) {
            console.log(error.message);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            const result = await Hero.findById(id)
            if (!result) {
                throw new NotFound(`Product ${id} not found`)
            }
            res.json({
                status: 'success',
                code: 200,
                data: { result }
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    async updateById(req, res, next) {
        try {
            const { id } = req.params
            const result = await Hero.findByIdAndUpdate(id, req.body, { new: true })
            if (!result) {
                throw new NotFound(`Product ${id} not found`)
            }
            res.json({
                status: 'success',
                code: 200,
                data: { result }
            })
        } catch (error) {
            console.log(error.messamge);
        }
    }

    async deleteById(req, res, next) {
        try {
            const { id } = req.params
            const result = await Hero.findByIdAndRemove(id)
            if (!result) {
                throw new NotFound(`Product ${id} not found`)
            }
            res.status(201).json({
                status: 'success',
                code: 200,
                message: 'Remove success'
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = new HeroController()