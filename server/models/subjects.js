const db = require('../database/connect')

class subjects{
  constructor({subject_id, description, subjectName, notes_id}) {
    this.subject_id = subject_id
    this.description = description
    this.subjectName = subjectName
    this.notes
  }

  static async getAll() {
    const response = await db.query("SELECT topics FROM Subjects")
    if (response.rows.length === 0) {
      throw new Error("No subjects available available")
    }
    return response.rows.map(subjects => new Notes(subjects))
  }

  static async getNotesBySubject(subject) {
    const response = await db.query("SELECT * FROM Subjects WHERE LOWER(subjectName) = $1", [subject])
    if (response.rows.length === 0) {
      throw new Error("No notes for this subject available")
    }
  }
}