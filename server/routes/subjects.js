const {Router} = require('express')
const subjectsController = require('../controllers/subjects')
const subjectsRouter = Router()

subjectsController.get("/", subjectsRouter.index)
subjectsController.get("/:id", subjectsRouter.showSubjects)
subjectsController.post("/", subjectsRouter.createSubject)
subjectsController.patch("/:id", subjectsRouter.updateSubject)
subjectsController.delete("/:id", subjectsRouter.deleteSubject)