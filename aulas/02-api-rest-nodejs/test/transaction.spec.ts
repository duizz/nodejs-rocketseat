import { afterAll, beforeAll,test } from 'vitest'
import request from 'supertest'
import { app } from '../src/app.js'

beforeAll(async () => {
    await app.ready()
} )

afterAll(async () => {
    await app.close()
})

test('expect user create a transiction successfully', async () => {
    await request(app.server)
        .post('/transactions')
        .set('Content-type', 'application/json')
        .send({
            title: 'Pix para Luiz',
            amount: 1200,
            type: 'credit'
        })
        .expect(201)
})