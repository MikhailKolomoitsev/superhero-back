const validation = (schema) => {
    const itemValidation = (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (error) {
            error.status = 404;
            next(error)
        }
        next()
    }
    return itemValidation
}

module.exports = validation