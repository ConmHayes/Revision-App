const request = require('supertest')
const app = require('../../app')

describe('api server', ()=>{
    let api

    beforeAll(()=> {
        api = app.listen(3000, ()=>{
            console.log('Test running on port 3000')
        })
    })

    afterAll(()=>{
        api.close(done) //done is a keyword that comes from jest
    })

    // test('responds to GET / with status 200', (done) => {
    //     request(api)
    //     .get('/')
    //     .expect(200,done)
    // })

    test('responds to GET /notes with status 200', (done)=>{

    })

    test('responds to GET /notes/:id with a 200', () => {
        request(api)
          .get('/notes/3')
          .expect(200)
    })
})