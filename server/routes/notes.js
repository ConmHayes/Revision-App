const {Router} = require('express')
const notesController = require('../controllers/notes')
const notesRouter = Router()

notesRouter.get("/", notesController.index)
notesRouter.post("/dates", notesController.showNotesByDate)
notesRouter.get("/:id", notesController.showNote)
notesRouter.post("/", notesController.createNote)
notesRouter.patch("/:id", notesController.updateNote)
notesRouter.delete("/:id", notesController.deleteNote)

module.exports = notesRouter