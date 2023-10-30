const Timetable = require('../models/timetable')


const allUser = async(req,res) => {
    try{
        const user = parseInt(req.params.user)
        const result = await Timetable.getAllTimeTableFromUser(user)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({"error": err.message})
    }
}


module.exports = { allUser }