const db = require('../database/connect')

class Notes {
  constructor({note_id, note, topic, dateposted}) {
    this.note_id = note_id
    this.note = note
    this.topic = topic
    this.dateposted = dateposted
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM Notes;")
    try {
      if (response.rows.length === 0) {
          throw new Error("No Notes available")
      }
      return response.rows.map(notes => new Notes(notes))
    } catch (err) {
      throw new Error(err.message)
  }
}

  static async getOneById(id) {
    try {
      const response = await db.query("SELECT * FROM Notes WHERE note_id = $1;", [id])
      if (response.rows.length != 1) {
          throw new Error("Unable to find that note")
      }
      return new Notes(response.rows[0])
    } catch (err) { 
      throw new Error(err.message)
    }
  }

  static async createNote(data) {
    try {
      const { note, topic, dateposted } = data
      const response = await db.query("INSERT INTO Notes (note, topic, dateposted) VALUES ($1,$2,$3) RETURNING *;", [note, topic, dateposted])
      return new Notes(response.rows[0])
    } catch(err){ 
      throw new Error(err.message)
    } 
  }

  static async updateNote(note_id, data) {
    try {
      const { note, topic, dateposted } = data;
      const response = await db.query('UPDATE Notes SET note = $1, topic = $2, dateposted = $3 WHERE note_id = $4 RETURNING *;', [note, topic, dateposted, note_id])
      return new Notes(response.rows[0])
    } catch(err) {
      throw new Error(err.message)
    }
  }

  async deleteNote() {
    try{
      const response = await db.query('DELETE FROM Notes WHERE note_id = $1 RETURNING *;', [this.note_id]);
      if (response.rows.length ===0){
        return null
      }
      return new Notes(response.rows[0])  
  } catch (err){
    throw new Error (err.message)
  }
}
}

module.exports = Notes