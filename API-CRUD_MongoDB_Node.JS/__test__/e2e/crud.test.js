const api = require('../../api')
const superTest = require('supertest')



describe('API E2E Test Suite', () => {

    test('GET / - Should return a class of students', async () => {

        const response = await superTest(api).get('/all/1b-alunos')

        const data = JSON.parse(response.text)

        expect(data[0]).toEqual(
            expect.objectContaining({
                name: expect.any(String)
            }),
        );
    })

    test('POST /  - Should add a new student and return it', async () => {

        const response = await superTest(api).post('/input/1b-alunos').send({
            name: "Baltazar",
            firstNote: 1,
            secondNote: 2,
            thirdNote: 2,
            fourthNote: 2,
        })

        const data = JSON.parse(response.text)


        expect(data).toEqual(
            expect.objectContaining({
                name: "Baltazar"
            }),
        );
    })

    test('DELETE /  - Should delete a new student and return it', async () => {

        const responseRaw = await superTest(api).get("/all/1b-alunos")
    
        const studentToBeDeleted = JSON.parse(responseRaw.text)[0]



        const response = await superTest(api).delete(`/delete/1b-alunos/${studentToBeDeleted._id}`)

        const data = JSON.parse(response.text)[0]

        expect(data).toEqual(
            expect.objectContaining({
                _id: studentToBeDeleted._id
            }),
        );
    })

    test('PUT /  - Should update a new student and return it', async () => {


        const responseRaw = await superTest(api).get("/all/1b-alunos")
    
        const studentToBeUpdated = JSON.parse(responseRaw.text)[0]


        const response = await superTest(api).put(`/update/1b-alunos/${studentToBeUpdated._id}`).send({
            fourthNote: 23
        })
        
        const data = JSON.parse(response.text)[0]

        expect(data).toEqual(
            expect.objectContaining({
                modifiedCount: 1
            }),
        );
    })
})