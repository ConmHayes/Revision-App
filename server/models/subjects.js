const db = require('../database/connect')

class Subjects{
  constructor({subject_id, subjectdescription, subjectname, note_id, users_id}) {
    this.subject_id = subject_id
    this.subjectdescription = subjectdescription
    this.subjectname = subjectname
    this.note_id = note_id
    this.users_id = users_id
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM Subjects")
    try {
      if (response.rows.length === 0) {
        throw new Error("No subjects available available")
      }
      return response.rows.map(subjects => new Subjects(subjects))
    } catch(err) {
      throw new Error(err.message)
    }
  }

  static async getBySubject(subject) {
    const response = await db.query("SELECT * FROM Subjects WHERE LOWER(subjectname) = $1", [subject])
    if (response.rows.length === 0) {
      throw new Error("No notes for this subject available")
    }
  }

  static async getOneById(id) {
    try {
      const response = await db.query("SELECT * FROM Subjects WHERE note_id = $1;", [id])
      if (response.rows.length != 1) {
          throw new Error("unable to find that Subject")
      }
      return new Subjects(response.rows[0])
    } catch { 
      throw new Error(err.message)
    }
  }

  static async createSubject(data) {
    try {
      const {subjectdescription, subjectname, note_id, users_id} = data
      const response = await db.query("INSERT INTO Subjects (subjectdescription, subjectname, note_id, users_id) VALUES ($1,$2,$3,$4) RETURNING *;", [subjectdescription, subjectname, note_id, users_id])
      return new Subjects(response.rows)
    } catch(err){ 
      throw new Error(err.message)
    } 
  }

  static async updateSubject(id, data) {
    try {
      const { subjectdescription, subjectname, note_id, users_id } = data;
      const response = await db.query('UPDATE Subjects SET subjectdescription = $1, subjectname = $2, note_id = $3, users_id = $4 WHERE subject_id = $5 RETURNING *;', [subjectdescription, subjectname, note_id, users_id, id])
      return new Subjects(response.rows[0])
    } catch(err) {
      throw new Error(err.message)
    }
  }

  async deleteSubject() {
    try {
      const response = await db.query('DELETE FROM Subjects WHERE subject_id = $1 RETURNING *;', [this.subject_id]);
      if (response.rows.length === 0) {
          throw new Error("Unable to delete Subject.");
      }
      return new Subjects(response.rows[0])
    } catch(err) {
      throw new Error(err.message)
    }    
  }

}

module.exports = Subjects