import 'dotenv/config'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { db } from '../src/db'

// Separate auth instance without `disableSignUp` so seed can create users.
// Mirrors the production additionalFields so `role` is accepted in the sign-up body.
const seedAuth = betterAuth({
  database: prismaAdapter(db, { provider: 'postgresql' }),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      role: { type: 'string' },
    },
  },
})

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set')
  }

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    if (existing.role !== 'admin') {
      await db.user.update({ where: { email }, data: { role: 'admin' } })
      console.log(`Promoted existing user to admin: ${email}`)
    } else {
      console.log(`Admin user already exists: ${email}`)
    }
    return
  }

  await seedAuth.api.signUpEmail({
    body: { email, password, name: 'Admin', role: 'admin' },
  })
  console.log(`Created admin user: ${email}`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
