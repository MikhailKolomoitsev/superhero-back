const { Hero } = require('../models/Hero')
const { cloudinary } = require('../utils/cloudinary');


class HeroController {
    async create(req, res, next) {
        try {
            const { nickname, realName, superpowers, catchPhrase } = req.body


            const files = req.images?.img
            console.log(req);
            let images = []
            if (files !== undefined && files.length > 0) {
                const promises = files.map(async (img) => {
                    const base64Image = img.toString('base64');
                    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
                        upload_preset: 'ml_default',
                    });
                    return uploadResponse.url
                })
                images = await Promise.all(promises)
            } else if (files !== undefined && files) {
                const base64Image = files.toString('base64');
                const uploadResponse = await cloudinary.uploader.upload(base64Image, {
                    upload_preset: 'ml_default',
                });
                images.push(uploadResponse.url)
            }
            const hero = await Hero.create({ nickname, realName, superpowers, catchPhrase, images })

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
            const { nickname, realName, superpowers, catchPhrase } = req.body
            const files = req.files?.img
            const hero = await Hero.findById(id)
            let { images } = hero
            if (files !== undefined && files.length > 0) {
                const promises = files.map(async (img) => {
                    const uploadResponse = await cloudinary.uploader.upload(img, {
                        upload_preset: 'ml_default',
                    });
                    return uploadResponse.url
                })
                images = await Promise.all(promises)
                images.filter((item, index) => images.indexOf(item) === index)
            } else if (typeof files === 'object') {
                const uploadResponse = await cloudinary.uploader.upload(files, {
                    upload_preset: 'ml_default',
                });
                images.push(uploadResponse.url).filter((item, index) => images.indexOf(item) === index)
            }

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