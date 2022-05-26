const path = require('path')
const { v4: uuidv4 } = require('uuid');
const { Hero } = require('../models/Hero')
const { cloudinary } = require('../utils/cloudinary');


class HeroController {
    async create(req, res, next) {
        try {
            const { nickname, realName, superpowers, catchPhrase, images } = req.body
            const img = []
            if (images.length > 0) {
                img.push(...images)
            }
            const hero = await Hero.create({ nickname, realName, superpowers, catchPhrase, images: img })

            res.status(201).json({
                status: 'success',
                code: 201,
                data: { hero }
            })
        } catch (error) {
            console.log(error.message);
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
            const { nickname, realName, superpowers, catchPhrase, images } = req.body
            const result = await Hero.findByIdAndUpdate(id, { nickname, realName, superpowers, catchPhrase, images }, { new: true })
            if (!result) {
                throw new NotFound(`Product ${id} not found`)
            }
            res.json({
                status: 'resource updated successfully',
                code: 204,
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