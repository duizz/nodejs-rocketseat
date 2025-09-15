import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAuthenticateUser } from '@/utils/test/create-authenticated-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms', async () => {
    const { token } = await createAuthenticateUser(app)

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'smart fit',
        description: '',
        phone: '',
        latitude: 0,
        longitude: 0,
      })

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'yes fit',
        description: '',
        phone: '',
        latitude: 0,
        longitude: 0,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        search: 'smart',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gym).toHaveLength(1)
    expect(response.body.gym).toEqual([
      expect.objectContaining({
        title: 'smart fit',
      }),
    ])
  })
})
