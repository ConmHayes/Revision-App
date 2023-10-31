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

    })
})
