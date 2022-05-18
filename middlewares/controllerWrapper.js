const controllerWrapper = (ctrl) => {
    const controller = async (req, rex, next) => {
        try {
            await ctrl(req, rex, next)
        } catch (error) {
            next(error)
        }
    }
    return controller
}

module.exports = controllerWrapper