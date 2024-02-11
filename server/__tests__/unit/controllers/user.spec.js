const userController = require('../../../controllers/user')
const User = require('../../../models/user')

const bcrypt = require("bcrypt")
const Token = require("../../../models/token")

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }


describe('user controller', () => {
    beforeEach(()=> jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('register', () => {
        it ('should register a new user and hash the password. Returns a status code 201', async () =>{
            const mockReq = {
                body: {
                username: "newUser",
                password: "newPassword"}
            }

            jest.spyOn(bcrypt, 'genSalt').mockResolvedValue(parseInt(process.env.BCRYPT_SALT_ROUNDS))

            jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword')

            const userCreated = {
                users_id: 1,
                username: "newUser"
            }

            jest.spyOn(User,'create').mockResolvedValue(userCreated)

            await userController.register(mockReq, mockRes)

            expect(bcrypt.genSalt).toHaveBeenCalledWith(parseInt(process.env.BCRYPT_SALT_ROUNDS))
            expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', parseInt(process.env.BCRYPT_SALT_ROUNDS))
            
            expect(User.create).toHaveBeenCalledWith({
                username: 'newUser',
                password: 'hashedPassword'
            })

            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockSend).toHaveBeenCalledWith(userCreated)

        })

        it ('should handle errors and return a status code 401 with an error message', async () =>{
            const mockReq = {
                body: {
                username: "newUser",
                password: "newPassword"}
            }

            jest.spyOn(bcrypt, 'genSalt').mockRejectedValue(new Error ("Bcrypt error"))

            await userController.register(mockReq,mockRes)

            expect(bcrypt.genSalt).toHaveBeenCalledWith(parseInt(process.env.BCRYPT_SALT_ROUNDS))

            expect(bcrypt.hash).not.toHaveBeenCalled()
            expect(User.create).not.toHaveBeenCalled()

            expect(mockStatus).toHaveBeenCalledWith(401)
            expect(mockJson).toHaveBeenCalledWith({error: "Bcrypt error"})

        })

    })

    describe ('logIn', () =>{
        it ('should log in user, create a token, and return status 200', async ()=>{
            const mockReq = {
                body: {
                    username: "existingUsername",
                    password: "matchingPassword"
                }
            }

            const userData = {
                users_id:1,
                username: "existingUsername",
                password: "correctPasswordHashed"
            }

            const tokenData = {
                token: "token test"
            }

            jest.spyOn(User,'checkUsername').mockResolvedValue(userData)
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)
            jest.spyOn(Token, 'getByUser').mockResolvedValue({destroyToken: jest.fn()}) 
            jest.spyOn(Token, 'create').mockResolvedValue(tokenData)

            await userController.logIn(mockReq, mockRes)

            expect(User.checkUsername).toHaveBeenCalledWith('existingUsername')
            expect(bcrypt.compare).toHaveBeenCalledWith(mockReq.body.password, userData.password)
            expect(Token.getByUser).toHaveBeenCalledWith(userData.users_id)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({token: tokenData.token})

        })

        it('should identify incorrect password and return status 401', async () =>{
            const mockReq = {
                body:{
                    username:'existingUsername',
                    password:'incorrectPassword'
                }
            }

            const userData = {
                users_id:1,
                username: 'existingUsername',
                password: 'correctPasswordHashed'
            }

            jest.spyOn(User, 'checkUsername').mockResolvedValue(userData)
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false)

            await userController.logIn(mockReq, mockRes)

            expect(User.checkUsername).toHaveBeenCalledWith(userData.username)
            expect(bcrypt.compare).toHaveBeenCalledWith(mockReq.body.password, userData.password)
            expect(mockStatus).toHaveBeenCalledWith(401)
            expect(mockJson).toHaveBeenCalledWith({error: 'Username and password does not match'})
        })

       it ('should identify incorrect username and return status 401', async () =>{
            const mockReq = {
                body:{
                    username: 'incorrectUser',
                    password: 'correctPassword'
                }
            }

            jest.spyOn(User, 'checkUsername').mockRejectedValue(new Error('User not found'))

            await userController.logIn(mockReq, mockRes)

            expect(User.checkUsername).toHaveBeenCalledWith(mockReq.body.username)
            expect(mockStatus).toHaveBeenCalledWith(401)
            expect(mockJson).toHaveBeenCalledWith({error: 'User not found'})

       }) 
    })

    describe ('logOut', () =>{
        it('should log out user, destroy token and return a status 204', async() =>{
            
            const tokenSet = 'awyaacszcisvvrixxkjkzgrhxmligzfvtibr'
            const tokenInstance = new Token({
                token_id: 1,
                users_id:1,
                token: tokenSet
            })

            const mockReq = {body:{token:tokenSet}}


            jest.spyOn(Token, 'getOneByToken').mockResolvedValue(tokenInstance)
            jest.spyOn(tokenInstance, 'destroyToken').mockResolvedValue({message:'Token destroyed'})

            await userController.logOut(mockReq, mockRes)

            expect (Token.getOneByToken).toHaveBeenCalledTimes(1)
            expect(Token.getOneByToken).toHaveBeenCalledWith(tokenSet)
            expect(tokenInstance.destroyToken).toHaveBeenCalledTimes(1)

            expect(mockStatus).toHaveBeenCalledWith(204)

            expect(mockJson).toHaveBeenCalledWith({message:'Token destroyed'})
        })

        it ('should handle errors and return status code 404', async () =>{
            const tokenSet = 'awyaacszcisvvrixxkjkzgrhxmligzfvtibr'

            const tokenInstance = new Token({
                token_id: 1,
                users_id:1,
                token: tokenSet
            })

            const mockReq = {body:{token:tokenSet}}

            jest.spyOn(Token, 'getOneByToken').mockResolvedValue(tokenInstance)
            jest.spyOn(tokenInstance, 'destroyToken').mockRejectedValue(new Error("Failed to delete token"))


            await userController.logOut(mockReq, mockRes)

            expect(Token.getOneByToken).toHaveBeenCalledTimes(1)
            expect(Token.getOneByToken).toHaveBeenCalledWith(tokenSet)

            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: "Failed to delete token"})

        })
    })


})
