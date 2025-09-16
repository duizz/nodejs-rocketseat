import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAuthenticateUser } from '@/utils/test/create-authenticated-user'

describe('Create (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register gym', async () => {
    const { token } = await createAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'smart fit',
        description: '',
        phone: '',
        latitude: 0,
        longitude: 0,
      })

    expect(response.statusCode).toEqual(201)
  })
})
