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
              
            jest.spyOn(Notes, 'getAll').mockResolvedValue(testNotes)
        
            await notesController.index(null, mockRes)
        
            expect(Notes.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(testNotes)
            })

      it('sends an error upon fail', async () =>{
        jest.spyOn(Notes,'getAll')
            .mockRejectedValue(new Error('Something happened to your db'))

        await notesController.index (null,mockRes)
        expect(Notes.getAll).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(500)
        expect(mockJson).toHaveBeenCalledWith({ error: 'Something happened to your db'})
      })
    })


    describe('showNote', () => {
        it('should return a single note with a status code 200', async () =>{
            const noteId = 1;
            const testNote = {
                note_id: noteId,
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


    describe ('createNote', () => {
        it ('should create a note with a status code 200', async () =>{
            const reqBody = {
                note: 'test note',
                topic: 'test topic',
                datePosted: '2023-10-30T12:00:00.000Z'
            }

            const createdNote = {
                note_id: 1,
                ... reqBody
            }

            jest.spyOn(Notes, 'createNote').mockResolvedValue(createdNote)

            const mockReq = {body: reqBody}

            await notesController.createNote(mockReq, mockRes)

            expect(Notes.createNote).toHaveBeenCalledTimes(1);
            expect(Notes.createNote).toHaveBeenCalledWith(reqBody);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(createdNote);
        })

        it ('should send an error with a status code 404 upon failing', async () =>{
            const reqBody = {
                note: 'test note',
                topic: 'test topic',
                datePosted: '2023-10-30T12:00:00.000Z'
            }

            const err = 'Failure to create note'

            jest.spyOn(Notes, 'createNote').mockRejectedValue(new Error(err))

            const mockReq = {body: reqBody}

            await notesController.createNote(mockReq, mockRes)

            expect(Notes.createNote).toHaveBeenCalledTimes(1);
            expect(Notes.createNote).toHaveBeenCalledWith(reqBody);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({error: err});
        })
    })

    describe ('updateNote', () =>{
        it ('should update note with a status code 200', async ()=> {
            const noteId=1
            const reqBody = {
                note: 'Update note test',
                topic: 'Update topic test',
                datePosted: '2023-10-30T14:00:00.000Z'
            }

            const updatedNote = {
                note_id: noteId,
                ...reqBody
            }

            jest.spyOn(Notes, 'updateNote').mockResolvedValue(updatedNote)

            const mockReq = {params: {id: noteId}, body: reqBody}

            await notesController.updateNote(mockReq, mockRes)

            expect (Notes.updateNote).toHaveBeenCalledTimes(1)
            expect (Notes.updateNote).toHaveBeenCalledWith(noteId, reqBody)
            expect (mockStatus).toHaveBeenCalledWith(200);
            expect (mockJson).toHaveBeenCalledWith(updatedNote)
        })

        it ('should send an error with status code 404 upon failing', async ()=>{
            const noteId = 1;
            const reqBody = {
                note: 'Update note test',
                topic: 'Updated topic test',
                datePosted: '2023-10-30T14:00:00.000Z'
            }

            const err = 'Failed to update note';

            jest.spyOn(Notes, 'updateNote').mockRejectedValue(new Error(err))

            const mockReq = {params:{id:noteId}, body: reqBody}

            await notesController.updateNote(mockReq, mockRes)

            expect(Notes.updateNote).toHaveBeenCalledTimes(1);
            expect(Notes.updateNote).toHaveBeenCalledWith(noteId, reqBody);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({error: err});
        })

    })
   
    
    describe ('deleteNote', () => {
        it ('should delete a note with a status code 200', async()=>{
            const noteId = 1
            const deletedNote = new Notes({
                note_id: noteId,
                note: 'deleted note',
                topic: 'deleted note',
                datePosted: '2023-10-30T12:00:00.000Z'
            })

            jest.spyOn(Notes, 'getOneById').mockResolvedValue(deletedNote)

            jest.spyOn(deletedNote, 'deleteNote').mockResolvedValue({message: 'Note has been successfully deleted'})

            const mockReq = {params:{id:noteId}}

            await notesController.deleteNote(mockReq, mockRes)

            expect (Notes.getOneById).toHaveBeenCalledTimes(1)
            expect (Notes.getOneById).toHaveBeenCalledWith(noteId)
            expect (deletedNote.deleteNote).toHaveBeenCalledTimes(1)
            expect (mockStatus).toHaveBeenCalledWith(200)
            expect (mockJson).toHaveBeenCalledWith({message: 'Note has been successfully deleted'})
        })

        it ('should send an error with a status code 404 upon failing', async () => {
            const noteId = 1;
            const attemptedDeletedNote = new Notes({
                note_id: noteId,
                note: 'deleted note',
                topic: 'deleted note',
                datePosted: '2023-10-30T12:00:00.000Z'
            })

            const err = 'Failed to delete note'

            jest.spyOn(Notes, 'getOneById').mockResolvedValue(attemptedDeletedNote)

            jest.spyOn(attemptedDeletedNote, 'deleteNote').mockRejectedValue(new Error(err))

            const mockReq = {params: {id: noteId}}

            await notesController.deleteNote(mockReq, mockRes)

            expect (Notes.getOneById).toHaveBeenCalledTimes(1)
            expect (mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: err})
        })
    })
})
