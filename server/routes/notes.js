const {Router} = require('express')

const notesController = require('../controllers/notes')

const notesController = Router()

notesController.get("/notes", notesController.getAll)