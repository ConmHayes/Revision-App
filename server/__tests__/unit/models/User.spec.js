// __tests__/unit
const User = require('../../../models/user')
const db = require('../../../database/connect')



describe ('Notes model', () =>{
    beforeEach(()=> jest.clearAllMocks())

    afterAll(()=> jest.resetAllMocks())

    describe('checkUsername', () =>{
        it ('checks if the username exists in the database and returns it', async ()=>{
            jest.spyOn(db, 'query'). mockResolvedValueOnce({
                rows:[{
                    users_id: 1,
                    username: 'constantinos',
                    password: 'stylianou'
                }]
            })

            const userName = 'constantinos'
            const checkUsername = await User.checkUsername(userName)

            expect(checkUsername).toHaveProperty('users_id', 1)
            expect(checkUsername).toHaveProperty('username', userName)
            expect(checkUsername).toHaveProperty('password', 'stylianou')
            
        })

        it ('should throw an Error on database query error', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows:[{
                    users_id: 1,
                    username: 'constantinos',
                    password: 'stylianou'
                }]
            })

            try{
                userName = 'NOTconstantinos'
                await User.checkUsername(userName)
            } catch (err){
                expect(err).toBeDefined()
                expect(err.message).toBe("Unable to locate username!")
            }
        })
    })

    describe('create', () =>{
        it ('should create a username returning the users id on success', async () =>{
            const newUsername = {
                username: 'newConstantinos',
                password: 'newStylianou'
            }

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                    users_id:1, 
                    username: 'newConstantinos',
                    password: 'newStylianou'
                }]
            })

            const createdUsername = await User.create(newUsername)

            expect(createdUsername).toHaveProperty('users_id')
            expect(createdUsername).toHaveProperty('username', 'newConstantinos')
            expect(createdUsername).toHaveProperty('password', 'newStylianou')
        })
        
        it ('should throw an error when the database insertion fails', async () => {
            const newUsername = {
                username: 'newConstantinos',
                password: 'newStylianou' 
            }

            jest.spyOn(db,'query').mockRejectedValueOnce(new Error("Failed to create username"))

            await expect(User.create(newUsername)).rejects.toThrowError("Failed to create username")
        })

        it ('should throw an error when the username already exists', async()=>{
            const existingUsername = {
                username: 'existingUsername',
                password: 'newStylianou'
            }

            jest.spyOn(db, 'query').mockRejectedValueOnce({
                message: 'duplicate key value violates unique constraint "users_username_key"'
            }
            )

            await expect(User.create(existingUsername)).rejects.toThrowError('Username already exists')
        })
    })
})