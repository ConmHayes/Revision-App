const db = require('../database/connect')

class User {
    constructor({users_id, username, password}){
        this.users_id = users_id;
        this.username = username;
        this.password = password;
    }

    static async checkUsername (username){
        const response = await db.query("SELECT * FROM users WHERE username = $1;", [username])
        if (response.rows.length != 1){
            throw new Error("Unable to locate username!")
        }
        return new User(response.rows[0])
    }

    static async create(data) {
        try{
        const {username, password} = data;

        let response = await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING users_id;", [username, password]) 

        if (response.rows.length === 0) {
            throw new Error ("Failed to create username")
        }
        return response.rows[0]
        } catch(err){ 
            if (err.message === 'duplicate key value violates unique constraint "users_username_key"'){
                throw new Error('Username already exists')
            } else {
                throw new Error('Failed to create username')
            }
        }

    }

    
}

module.exports = User