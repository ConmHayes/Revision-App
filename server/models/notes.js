const db = require('../database/connect')
const User = require("./user")

class Notes {
  constructor({note_id, note, topic, dateposted, users_id}) {
    this.note_id = note_id
    this.note = note
    this.topic = topic
    this.dateposted = dateposted
    this.users_id = users_id
  }

  static async getAll(token) {
    const user = await User.getOneByToken(token)
    const response = await db.query("SELECT * FROM Notes WHERE users_id = $1 ORDER BY datePosted;", [user])
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
  static async getAllByDate(data, token){
    try{
      const { dateposted } = data
      const query = "SELECT * FROM Notes WHERE datePosted = $1 AND users_id = $2"
      const user = await User.getOneByToken(token)
      const values = [dateposted, user.users_id]

      const response = await db.query(query, values)
      console.log(response.rows)
      if (response.rows.length == 0){
        return {note: "No notes for that date yet", topic: "N/A", dateposted: dateposted}
      }
      return response.rows.map(note => new Notes(note))


    }catch(err){
      throw new Error(err.message)
    }
  }

  static async createNote(data, token) {
    try {
      const user = await User.getOneByToken(token)
      console.log(user)
      const { note, topic, dateposted } = data
      const response = await db.query("INSERT INTO Notes (note, topic, dateposted, users_id) VALUES ($1,$2,$3,$4) RETURNING *;", [note, topic, dateposted, user.users_id])
      return new Notes(response.rows[0])
    } catch(err){ 
      throw new Error(err.message)
    } 
  }

  static async updateNote(note_id, data) {
    try {
      const { note, topic, dateposted, users_id } = data;
      const response = await db.query('UPDATE Notes SET note = $1, topic = $2, dateposted = $3 users_id = $4 WHERE note_id = $5 RETURNING *;', [note, topic, dateposted, users_id, note_id])
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