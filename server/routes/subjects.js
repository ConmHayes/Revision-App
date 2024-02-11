const {Router} = require('express')
const subjectsController = require('../controllers/subjects')
const subjectsRouter = Router()

subjectsRouter.get("/", subjectsController.index)
subjectsRouter.get("/:name", subjectsController.showByName)
subjectsRouter.post("/", subjectsController.createSubject)
subjectsRouter.patch("/:id", subjectsController.updateSubject)
subjectsRouter.delete("/:id", subjectsController.deleteSubject)

module.exports = subjectsRouter