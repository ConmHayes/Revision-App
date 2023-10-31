const Notes = require('../models/notes')

const index = async (req,res) => {
   try {
        const notes = await Notes.getAll()
        res.status(200).json(notes)    
   } catch (err) {
    res.status (500).json({error:err.message})
   }
}

const showNote = async (req,res) => {
    try{
        const id = req.params.id
        const note = await Notes.getOneById(id)
        res.status(200).json(note)

    } catch (err){
        res.status(404).json({error: err.message})
    }
}

const createNote = async (req, res) => {
    try{
        const note = await Notes.createNote(req.body)
        res.status(200).json(note)

    }catch (err){
        res.status(404). json({error: err.message})
    }
}

const updateNote = async (req, res) => {
    try{
        const id = req.params.id
        const note = await Notes.updateNote(id, req.body)
        res.status(200).json(note)

    }catch(err) {
        res.status(404).json({error: err.message})
    }
}

const deleteNote = async (req, res) => {
    try{
        const id = req.params.id
        const note = await Notes.getOneById(id)
        const result = await note.deleteNote()
        res.status(200).json(result)
    }catch(err){
        res.status(404).json({error:err.message})
    }
}

module.exports = { index, showNote, createNote, updateNote, deleteNote }