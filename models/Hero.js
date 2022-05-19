const { Schema, model } = require('mongoose')
const Joi = require('joi')

const heroSchema = Schema({
    nickname: {
        type: String,
        required: [true, 'Enter nickname of your Hero'],
    },
    realName: {
        type: String,
        required: [true, 'Write Heros real name, but only here'],
    },
    superpowers: {
        type: String,
        required: true,
    },
    catchPhrase: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
}, { versionKey: false, timestamps: true }
)

const joiSchema = Joi.object({
    nickname: Joi.string().required(),
    realName: Joi.string().required(),
    superpowers: Joi.string(),
    catchPhrase: Joi.string().required(),
    images: Joi.array().min(1).max(5).items(Joi.string()),
})

const Hero = model('Hero', heroSchema)

module.exports = { Hero, joiSchema }