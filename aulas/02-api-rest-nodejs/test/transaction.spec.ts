import { afterAll, beforeAll,test, describe, it, expect, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app.js'

describe('Transaction Routes', () => {

    beforeAll(async () => {
        await app.ready()
    } )

    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
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

    it('should be abble to list all transactions', async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions')
            .set('Content-type', 'application/json')
            .send({
                title: 'bank transaction',
                amount: 1200,
                type: 'credit'
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionResponse = await request(app.server)
            .get('/transactions')
            .set("Cookie", cookies!)
            .expect(200)

        expect(listTransactionResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: expect.any(String),
                amount: expect.any(Number)
            })
        ])

    })

    it('should be list specific transaction', async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions')
            .set('Content-type', 'application/json')
            .send({
                title: 'bank transaction',
                amount: 1200,
                type: 'credit',
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionsResponse = await request(app.server)
            .get(`/transactions/`)
            .set("Cookie", cookies!)
            .expect(200)

        const transactionId = listTransactionsResponse.body.transactions[0].id

        const getTransactionResponse = await request(app.server)
            .get(`/transactions/${transactionId}`)
            .set("Cookie", cookies!)
            .expect(200)
            

        expect(getTransactionResponse.body.transaction).toEqual(
            expect.objectContaining({
                title: expect.any(String),
                amount: expect.any(Number)
            })
        )
    })

    it('should be abble get the summary', async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions')
            .set('Content-type', 'application/json')
            .send({
                title: 'bank transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        await request(app.server)
            .post('/transactions')
            .set("Cookie", cookies!)
            .set('Content-type', 'application/json')
            .send({
                title: 'bank transaction',
                amount: 2000,
                type: 'debit'
            })

        const listTransactionResponse = await request(app.server)
            .get('/transactions/summary')
            .set("Cookie", cookies!)
            .expect(200)

        expect(listTransactionResponse.body.summary).toEqual({
            amount: 3000
        })

    })
})
