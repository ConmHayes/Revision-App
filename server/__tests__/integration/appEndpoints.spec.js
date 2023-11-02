require('dotenv').config() // needed for integration testing


const request = require('supertest');
const app = require('../../app');
const { resetTestDB } = require('../../database/testConnect')


describe('api server', ()=> {
    let api


    beforeAll(() => {
        
        api = app.listen(4000, () => {
            console.log("test running on port 4000")
        })

    }) 

    beforeEach(async() => {
        await resetTestDB()
    })


    afterAll((done)=>{
        api.close(done)
    })

    it('responds to GET /notes with status 200', (done) =>{

        request(api)
            .get('/notes')
            .set('authorization', 'tokenTest1')
            .expect(200,done)
    })



    it('responds to GET /notes/:id with a 200', (done) =>{
        request (api)
            .get('/notes/2')
            .set('authorization', 'tokenTest2')
            .expect(200,done)
    })

    it('responds to POST /notes with a 200', (done) =>{
        const postNote = {
            body:{
                note: 'Test note created 1',
                topic: 'Test topic created 1',
                dateposted: '2024-02-23 13:50:25.789'
            }
        }
        request (api)
            .post('/notes')
            .set('authorization', 'tokenTest1')
            .send(postNote.body)
            .expect(200,done)
    })

    it('responds to POST /notes/dates with a 200', (done)=>{
        const showByDatesData = {
            body: {
                dateposted: '2024-01-23 13:50:25.789'
            }
        }

        request (api)
            .post('/notes/dates')
            .set('authorization', 'tokenTest2')
            .send(showByDatesData.body)
            .expect(200,done)
    })

    it('responds to PATCH /notes/:id with a 200', (done) =>{
        const updateNoteData = {
            body:{
                    note: 'Test note updated 1',
                    topic: 'Test topic updated 1',
                    dateposted: '2024-03-23 13:50:25.789',
            }
        }

        request (api)
            .patch('/notes/1')
            .set('authorization', 'tokenTest1')
            .send(updateNoteData.body)
            .expect(200,done)
    })



})





// notesRouter.post("/", notesController.createNote)