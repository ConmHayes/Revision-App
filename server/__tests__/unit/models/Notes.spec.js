// __tests__/unit
const Notes = require('../../../models/notes')
const db = require('../../../database/connect')

describe ('Notes model', () =>{
    beforeEach(()=> jest.clearAllMocks())

    afterAll(()=> jest.resetAllMocks())

    describe('getAll', ()=> {
        it('resolves with notes on success', async () =>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{note: 'sample note 1', topic:'sample topic 1', datePosted:'2023-10-30T12:00:00.000Z'}, 
                {note: 'sample note 2', topic:'sample topic 2', datePosted:'2023-11-30T12:00:00.000Z'}
            ]
            })

            const notes = await Notes.getAll()
            expect(notes).toHaveLength(2)
            expect(notes[0]).toHaveProperty('note_id')
        })

        it ('should throw an Error on database query error', async () =>{
            jest.spyOn(db,'query').mockResolvedValueOnce({ rows: []})

            try {
                await Notes.getAll()
            } catch(err){
                expect(err).toBeDefined()
                expect(err.message).toBe("No Notes available")
            }
        })

    })

    describe('getOneById', ()=> {
        it ('resolves with note of specified id on success', async ()=>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                    note_id: 1,
                    note: 'Sample note 1',
                    topic: 'Sample topic 1',
                    datePosted: '2023-10-30T12:00:00.000Z'

                }]
            })

            const noteId = 1
            const notes = await Notes.getOneById(noteId)
            expect(notes).toHaveProperty('note_id', noteId)
            expect(notes).toHaveProperty('note', 'Sample note 1')
            expect(notes).toHaveProperty('topic', 'Sample topic 1')
            expect(notes).toHaveProperty('datePosted', '2023-10-30T12:00:00.000Z')
        })

        it ('should throw an Error on database query error', async () =>{
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                    note_id: 1,
                    note: 'Sample note 1',
                    topic: 'Sample topic 1',
                    datePosted: '2023-10-30T12:00:00.000Z'

                }]
            })

            try {
                noteId = 2
                await Notes.getOneById(noteId)
            } catch(err){
                expect(err).toBeDefined()
                expect(err.message).toBe("Unable to find that note")
            }
        })
    })

    describe('createNote', ()=> {
        it ('should create a new note and return it on success', async () => {
            const newNote = {
                note_id: 1,
                note: 'Sample note 1',
                topic: 'Sample topic 1',
                datePosted: '2023-10-30T12:00:00.000Z'
            }

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [newNote]
            })

            const createdNote = await Notes.createNote(newNote)

            expect(createdNote).toHaveProperty('note_id', newNote.note_id)
            expect(createdNote).toHaveProperty('note', newNote.note)
            expect(createdNote).toHaveProperty('topic', newNote.topic)
            expect(createdNote).toHaveProperty('datePosted', newNote.datePosted)
        })

        it ('should throw an Error on database query error', async () =>{
            jest.spyOn(db,'query').mockRejectedValueOnce(new Error('Failed to create new note'))

            const newNote = {
                note_id: 1,
                note: 'Sample note 1',
                topic: 'Sample topic 1',
                datePosted: '2023-10-30T12:00:00.000Z'
            }

            await expect(Notes.createNote(newNote)).rejects.toThrowError('Failed to create new note')
        })
    })

    describe('updateNote', ()=> {
        it ('should update a note and return it on success', async () =>{
            const noteId = 1
            const updatedNoteInput = {
                note: 'Updated note 1',
                topic: 'Updated topic 1',
                datePosted: '2023-10-30T12:00:00.000Z'
            }

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                    note_id: noteId,
                    note: updatedNoteInput.note,
                    topic: updatedNoteInput.topic,
                    datePosted: updatedNoteInput.datePosted
                }]
            })

            const updatedNote = await Notes.updateNote(noteId,updatedNoteInput)

            expect(updatedNote).toHaveProperty('note_id', noteId);
            expect(updatedNote).toHaveProperty('note', updatedNoteInput.note);
            expect(updatedNote).toHaveProperty('topic', updatedNoteInput.topic);
            expect(updatedNote).toHaveProperty('datePosted', updatedNoteInput.datePosted);
        })
        
        it ('should throw an Error on database query error', async () =>{
            jest.spyOn(db,'query').mockRejectedValueOnce(new Error('Failure to update note'))

            const noteId = 1
            const updatedNoteInput = {
                note: 'Updated note 1',
                topic: 'Updated topic 1',
                datePosted: '2023-10-30T12:00:00.000Z'
            }

            await expect(Notes.updateNote(noteId, updatedNoteInput)).rejects.toThrowError('Failure to update note')
        })
    })

    describe('deleteNote', ()=> {
        it ('should delete a note and remove it from database on success', async()=>{
            const noteId = 1
            const deletedNoteInput = new Notes({
                note_id: noteId,
                note: 'Delete note test',
                topic: 'Delete note topic',
                datePosted: '2023-10-30T12:00:00.000Z'
            })

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [deletedNoteInput]
            })



            const deletedNote = await deletedNoteInput.deleteNote()

            expect(deletedNote).toHaveProperty('note_id', noteId);
            expect(deletedNote).toHaveProperty('note', 'Delete note test');
            expect(deletedNote).toHaveProperty('topic', 'Delete note topic');
            expect(deletedNote).toHaveProperty('datePosted', '2023-10-30T12:00:00.000Z');
        })
    })
})

