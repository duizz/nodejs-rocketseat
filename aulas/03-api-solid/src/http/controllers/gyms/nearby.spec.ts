import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAuthenticateUser } from '@/utils/test/create-authenticated-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search nearby gyms', async () => {
    const { token } = await createAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'near fit',
        description: '',
        phone: '',
        latitude: 0,
        longitude: 0,
      })

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'far fit',
        description: '',
        phone: '',
        latitude: 1,
        longitude: 1,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: 0,
        longitude: 0,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.nearGym).toHaveLength(1)
    expect(response.body.nearGym).toEqual([
      expect.objectContaining({
        title: 'near fit',
      }),
    ])
  })
})
