const Subjects = require('../models/subjects')

const index = async (req, res) => {
  try {
    const subjectName = await Subjects.getAll()
    res.status(200).json(subjectName)
  } catch(err) {
    res.status(404).json({error: err.message})
  }
}

const showSubject = async (req, res) => {
  try {
    const name = req.params.subject.toLowerCase()
    const subjectName = await Subjects.getNotesBySubject(name)
    res.status(200).json(subjectName)
  } catch(err) {
    res.status(404).json({ error: err.message })
  }
}

const createSubject = async (req, res) => {
  try{
      const subject = await Subjects.createSubject(req.body)
      res.status(200).json(subject)
  } catch (err) {
      res.status(404). json({error: err.message})
  }
}

const updateSubject = async (req, res) => {
  try{
      const id = req.params.id
      const subject = await Subjects.updateSubject(id, req.body)
      res.status(200).json(subject)
  }catch (err) {
      res.status(404).json({error: err.message})
  }
}

const deleteSubject = async (req, res) => {
  try{
      const id = req.params.id
      const subject = await Subjects.getOneById(id)
      const result = await subject.deleteSubject()
      res.status(200).json(result)
  }catch(err){
      res.status(404).json({error:err.message})
  }
}

module.exports = { index, showSubject, createSubject, updateSubject, deleteSubject }