const request = require('supertest');
const app = require('../../app');

const User = require('../../')
const userController = require('../../')
 
const Token = require('../../models/token')


describe('api server', ()=> {
    let api

    beforeAll(() => {
        api = app.listen(4000, () => {
            console.log("test running on port 4000")
        })
    }) 

    afterAll((done)=>{
        api.close(done)
    })

    it('responds to GET /notes with status 200', (done) =>{
        request(api)
            .get('/notes')
            .expect(200,done)
    })

    it('responds to GET /notes/:id with a 200', (done) =>{
        request (api)
            .get('/notes/1')
            .expect(200,done)
    })

    it('responds to POST /notes with a 200', (done) =>{
        request (api)
            .post('/notes')
            .send({

            })
            .expect(200,done)
    })

})

// notesRouter.post("/", notesController.createNote)