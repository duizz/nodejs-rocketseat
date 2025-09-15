import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAuthenticateUser } from '@/utils/test/create-authenticated-user'
import { prisma } from '@/lib/prisma'

describe('Create Check in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create check in', async () => {
    const { token } = await createAuthenticateUser(app)

    const createdGym = prisma.gym.create({
      data: {
        title: 'JavaScript gym',
        latitude: 0,
        longitude: 0,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${(await createdGym).id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 0,
        longitude: 0,
      })

    expect(response.statusCode).toEqual(201)
  })
})
