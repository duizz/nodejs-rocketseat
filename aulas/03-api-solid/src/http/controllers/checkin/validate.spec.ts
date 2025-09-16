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

  it('should be able to validate check in', async () => {
    const { token } = await createAuthenticateUser(app, true)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript gym',
        latitude: -29.93283823,
        longitude: -40.382382838,
      },
    })

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
