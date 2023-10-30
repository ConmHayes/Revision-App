const db = require('../database/connect')

class Timetable {
    constructor({timeTable_id,users_id, note_id}){
        this.timeTable_id = timeTable_id
        this.users_id = users_id
        this.note_id = note_id
    }

    static async getAllTimeTableFromUser(users_id){
        const responses = await db.query("SELECT * FROM TimeTable WHERE users_id = $1;",[users_id])
        if(responses.rows.length === 0){
            throw new Error("User doesn't have a timetable")
        }
        return responses.rows.map(t => new Timetable(t))
    }

}

module.exports = Timetable