const db = require('../database/connect')

class User {
    constructor({users_id, username, password, lastLoggedIn, streak}){
        this.users_id = users_id;
        this.username = username;
        this.password = password;
        this.lastLoggedIn = lastLoggedIn;
        this.streak = streak;
    }

    static async checkUsername (username){
        const response = await db.query("SELECT * FROM users WHERE username = $1;", [username])

        const today = new Date()
        const y = today.getFullYear() 
        const m = today.getMonth() 
        const d = today.getDate()

        console.log(response.rows[0].lastloggedin)
        const LLI = response.rows[0].lastloggedin
        const year = LLI.getUTCFullYear();
        const month = (LLI.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = LLI.getUTCDate().toString().padStart(2, '0');

        console.log(day, month, year)

        console.log(new Date(LLI))
        const workingDate = new Date(y, m, d)
        const SQLTimestamp = workingDate.toISOString().slice(0, 19).replace("T", " ")
    
        console.log(today, SQLTimestamp)
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

    static async getOneById(id){
        const response = await db.query("SELECT * FROM users WHERE users_id = $1", [id])
        
        if (response.rows.length != 1){
            throw new Error("Unable to locate user")
        }
        return new User(response.rows[0])
    }

    static async getOneByToken(token){
        const responseToken = await db.query("SELECT users_id FROM Token WHERE token = $1", [token])
        if (responseToken.rows.length != 1){
            throw new Error ("Unable to locate user")
        }
        const user = await User.getOneById((await responseToken).rows[0].users_id)
        return user
    }

    
}

module.exports = User