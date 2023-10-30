const notesController = require('../../../controllers/notes')
const Notes = require('../../../models/notes')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('notes controller', () => {
    beforeEach(()=> jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('index', () => {
        it('should return notes with a status code 200', async () => {
            const testNotes = [
                {
                  note_id: 1,
                  note: 'Sample note 1',
                  topic: 'Topic 1',
                  datePosted: '2023-10-30T12:00:00.000Z'
                },
                {
                  note_id: 2,
                  note: 'Sample note 2',
                  topic: 'Topic 2',
                  datePosted: '2023-10-30T13:00:00.000Z'
                }
              ];
              
            jest.spyOn(Notes, 'getAll')
                .mockResolvedValue(testGoats)
        
            await notesController.index(null, mockRes)
        
            expect(Notes.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockSend).toHaveBeenCalledWith(testNotes)
            })

      it('sends an error upon fail', async () =>{
        jest.spyOn(Notes,'getAll')
            .mockRejectedValue(new Error('Something happened to your db'))

        await notesController.index (null,mockRes)
        expect(Notes.getAll).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(500)
        expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db'})
      })
    })


    describe('showNote', () => {
        it('should return a single note with a status code 200', async () =>{
            const noteId = 1;
            const testNote = {
                note_id = noteId,
                note: 'Test Note',
                topic: 'Test topic',
                datePosted: '2023-10-30T12:00:00.000Z'
            }
            // spyon basically gets the getOneById in the Notes.
            jest.spyOn(Notes, 'getOneById').mockResolvedValue(testNote);

            const mockReq = { params: {id: noteId}}

            await notesController.showNote(mockReq, mockRes);

            expect(Notes.getOneById).toHaveBeenCalledTimes(1)
            expect(Notes.getOneById).toHaveBeenCalledWith(noteId)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(testNote)
        })

        it ('should send an error with a status code 404 upon failure', async () =>{
            const noteId = 1
            const err = 'Note not found'

            jest.spyOn(Notes, 'getOneById').mockRejectedValue(new Error(err));

            const mockReq = {params: {id:noteId} };

            await notesController.showNote(mockReq, mockRes)

            expect(Notes.getOneById).toHaveBeenCalledTimes(1);
            expect(Notes.getOneById).toHaveBeenCalledWith(noteId);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: err });

        })
    })
  })
