import { prisma } from '@/lib/prisma'
import { describe, it, beforeAll, expect } from 'vitest'

describe('API', () => {
  beforeAll(async () => {
    // Initialize Prisma connection
    await prisma.$connect()
  })

  it('fetches users', async () => {
    const users = await prisma.user.findMany()
    expect(users).toBeDefined()
  })
})
