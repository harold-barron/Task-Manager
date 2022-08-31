const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')


const {userOneId,userOne,setupDatabase} = require('./fixtures/db')
beforeEach(setupDatabase)

test('Should create task for user', async ()=>{
    const response = await request(app)
        .post('/task')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(200)
})