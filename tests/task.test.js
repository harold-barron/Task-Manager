const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')


const {userOneId,userOne,setupDatabase, userTwo, userTwoId, taskOne} = require('./fixtures/db')
beforeEach(setupDatabase)

test('Should create task for user', async ()=>{
    const response = await request(app)
        .post('/task')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(200)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should get all tasks for user one', async ()=>{
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Testing delete task security', async ()=>{
    const response = await request(app)
        .delete(`/task/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const taks = Task.findById(taskOne._id)
    expect(taks).not.toBeNull()
})