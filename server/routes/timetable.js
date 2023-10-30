const {Router} = require('express')

const timeTableController = require('../controllers/timetable')

const timeTableRouter = Router()

timeTableRouter.get("/user/:user", timeTableController.allUser)