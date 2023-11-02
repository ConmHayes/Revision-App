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

        const today = new Date(); const y = today.getFullYear(); const m = today.getMonth(); const d = today.getDate()
        const LLI = response.rows[0].lastloggedin

        const year = LLI.getUTCFullYear();
        const month = (LLI.getUTCMonth()).toString().padStart(2, '0');
        const day = LLI.getUTCDate().toString().padStart(2, '0');

        const lastLogIn = new Date(year, month, day)
        const workingDate = new Date(y, m, d)

        const date_UTC = Date.UTC(workingDate.getUTCFullYear(), workingDate.getUTCMonth(), workingDate.getUTCDate(), 0, 0, 0)
        const LLI_UTC = Date.UTC(lastLogIn.getUTCFullYear(), lastLogIn.getUTCMonth(), lastLogIn.getUTCDate(), 0, 0, 0)

        
        let newStreak = response.rows[0].streak
        const newLLI = workingDate.toISOString().slice(0, 19).replace("T", " ")
        const query = "UPDATE users SET streak = $1, lastloggedin = $2 WHERE username = $3 RETURNING *"

        if((date_UTC - LLI_UTC) ==  86400000){
            newStreak++
            const values = [newStreak, newLLI, username]
            const streakResponse = await db.query(query, values)
        }else if((date_UTC - LLI_UTC) ==  0){
            console.log("Same Day")
        }else{
            newStreak = 1
            const values = [newStreak, newLLI, username]
            const streakResponse = await db.query(query, values)
        }
        

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