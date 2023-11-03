// __tests__/unit
const User = require('../../../models/user')
const db = require('../../../database/connect')



describe ('Users model', () =>{
    beforeEach(()=> jest.clearAllMocks())

    afterAll(()=> jest.resetAllMocks())

    describe('checkUsername', () =>{
        it ('checks if the username exists in the database and returns it', async ()=>{

            const userName = 'constantinos';

            jest.spyOn(db, 'query'). mockResolvedValueOnce({
                rows:[{
                    users_id: 1,
                    username: 'constantinos',
                    password: 'stylianou',
                    lastloggedin: new Date('2023-10-30T12:00:00Z')
                }]
            })

          
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
                    password: 'stylianou',
                    lastloggedin: new Date('2023-10-30T12:00:00Z')
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

    describe ('getOneById', () =>{
        it('should select get user from the user id', async ()=>{
            const userId = 1

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{
                    users_id: userId, 
                    username: 'Constantinos',
                    password: 'Stylianou'}]
                }
                )

            const user = await User.getOneById(userId)

            expect(db.query).toHaveBeenCalledWith('SELECT * FROM users WHERE users_id = $1', [userId])
            expect(user).toHaveProperty('users_id', userId)
            expect(user).toHaveProperty('username', 'Constantinos')
            expect(user).toHaveProperty('password', 'Stylianou')
        })

        it('should throw an error when the user does not exist', async () => {
            const userId = 1
        
            jest.spyOn(db, 'query').mockResolvedValueOnce({
              rows: [],
            })
        
            await expect(User.getOneById(userId)).rejects.toThrow('Unable to locate user')
          })
    })

    describe('getOneByToken', () => {
        it('should retrieve a user based on a valid token', async () => {
          const token = 'test-token';
          const userId = 1
      
          jest.spyOn(db, 'query').mockResolvedValueOnce({
            rows: [{ users_id: userId }],
          })
      
          const expectedUser = {
            users_id: userId,
            username: 'TestUser',
            password: 'TestPassword',
          }
          jest.spyOn(User, 'getOneById').mockResolvedValueOnce(expectedUser);
      
          const user = await User.getOneByToken(token);
      
          expect(db.query).toHaveBeenCalledWith('SELECT users_id FROM Token WHERE token = $1', [token]);
          expect(User.getOneById).toHaveBeenCalledWith(userId);
          expect(user).toEqual(new User(expectedUser));
        })
      
        it('should throw an error when the token does not exist', async () => {
          const token = 'wrong-token';
      
          jest.spyOn(db, 'query').mockResolvedValueOnce({
            rows: [],
          })
      
          await expect(User.getOneByToken(token)).rejects.toThrow('Unable to locate user');
        })
      })
})