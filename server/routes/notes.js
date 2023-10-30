const {Router} = require('express')
const notesController = require('../controllers/notes')
const notesRouter = Router()

notesController.get("/", notesRouter.index)
notesController.get("/:id", notesRouter.showNotes)
notesController.post("/", notesRouter.createNote)
notesController.patch("/:id", notesRouter.updateNote)
notesController.delete("/:id", notesRouter.deleteNote)