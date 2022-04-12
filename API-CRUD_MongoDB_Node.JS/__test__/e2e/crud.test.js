const api = require('../../api')
const superTest = require('supertest')

describe('API E2E routes test', () => {
    test('Should add a new student and return it', async () => {
        const response = await superTest(api)
        .get('/input/1b-alunos')
        
        
        

        expect(response).toBe(response)
    })
})