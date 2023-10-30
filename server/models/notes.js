const db = require('../database/connect')

class Notes {
  constructor({note_id, note, topic, datePosted}) {
    this.note_id = note_id
    this.note = note
    this.topic = topic
    this.datePosted = datePosted
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM Notes;")
    try {
      if (response.rows.length === 0) {
          throw new Error("No Notes available")
      }
      return response.rows.map(notes => new Notes(notes))
    } catch {
      throw new Error(err.message)
  }
}

  static async getOneById(id) {
    try {
      const response = await db.query("SELECT * FROM Notes WHERE note_id = $1;", [id])
      if (response.rows.length != 1) {
          throw new Error("unable to find that note")
      }
      return new Notes(response.rows[0])
    } catch { 
      throw new Error(err.message)
    }
  }

  static async createNote(data) {
    try {
      const {note_id, note, topic, datePosted} = data
      const response = await db.query("INSERT INTO Notes (note_id, note, topic, datePosted) VALUES ($1,$2,$3,$4) RETURNING *;", [note_id, note, topic, datePosted])
      return new Notes(response.rows)
    } catch(err){ 
      throw new Error(err.message)
    } 
  }

  static async updateNote(id, data) {
    try {
      const { description, category, rating } = data;
      const response = await db.query('UPDATE Notes SET note = $1, topic = $2, datePosted = $3 WHERE note_id = $4 RETURNING *;', [description, category, rating, id])
      return new Notes(response.rows[0])
    } catch(err) {
      throw new Error(err.message)
    }
  }
  async deleteNote() {
    try {
      const response = await db.query('DELETE FROM Notes WHERE note_id = $1 RETURNING *;', [this.note_id]);
      if (response.rows.length === 0) {
          throw new Error("Unable to delete note.");
      }
      return new Notes(response.rows[0])
    } catch(err) {
      throw new Error(err.message)
    }    
  }
}

module.exports = Notes