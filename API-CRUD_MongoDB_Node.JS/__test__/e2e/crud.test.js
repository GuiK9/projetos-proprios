const api = require('../../api')
const superTest = require('supertest')

async function login() {

    const response = await superTest(api).post('/login').send({
        "name": "mateus do sudário",
        "password": "cabresfbé"
    })

    return response
}

describe('API E2E Test Suite', () => {

    test('GET / - Should return a class of students', async () => {

        const responseLogin = await login()
        const {token} = JSON.parse(responseLogin.text)

        const response = await superTest(api).get('/all/1b-alunos').send({
            token: token
        })


        const data = JSON.parse(response.text)

        expect(data[0]).toEqual(
            expect.objectContaining({
                name: expect.any(String)
            }),
        );
    })

    test('POST /  - Should add a new student and return it', async () => {

        const responseLogin = await login()
        const {token} = JSON.parse(responseLogin.text)

        const response = await superTest(api).post('/input/1b-alunos').send({
            name: "Baltazar",
            firstNote: 1,
            secondNote: 2,
            thirdNote: 2,
            fourthNote: 2,
            cpf: "12345678901",
            token: token
        })

        const data = JSON.parse(response.text)


        expect(data).toEqual(
            expect.objectContaining({
                name: "Baltazar"
            }),
        );
    })

    test('DELETE /  - Should delete a new student and return it', async () => {

        const responseLogin = await login()
        const {token} = JSON.parse(responseLogin.text)

        const responseRaw = await superTest(api).get("/all/1b-alunos/").send({
            token: token
        })

        const studentToBeDeleted = JSON.parse(responseRaw.text)[0]

        const response = await superTest(api).delete(`/delete/1b-alunos/${studentToBeDeleted._id}`).send({
            token: token
        })

        const data = JSON.parse(response.text)

        expect(data).toEqual(
            expect.objectContaining({
                _id: studentToBeDeleted._id
            }),
        );
    })

    test('PUT /  - Should update a new student and return it', async () => {

        const responseLogin = await login()
        const {token} = JSON.parse(responseLogin.text)


        const responseRaw = await superTest(api).get("/all/1b-alunos/").send({
            token: token
        })


        const studentToBeUpdated = JSON.parse(responseRaw.text)[0]


        const response = await superTest(api).put(`/update/1b-alunos/${studentToBeUpdated._id}`).send({
            fourthNote: 23,
            token: token

        })

        const data = JSON.parse(response.text)[0]

        expect(data).toEqual(
            expect.objectContaining({
                modifiedCount: 1
            }),
        );
    })
})
