import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create sample volunteer reasons
    const volunteerReasons = await prisma.volunteerReason.createMany({
        data: [
            {
                reason: 'Justice and Rule of Law - Supporting a leader committed to upholding justice and the rule of law in Kenya'
            },
            {
                reason: 'Economic Development - Working towards economic prosperity and job creation for all Kenyans'
            },
            {
                reason: 'Good Governance - Promoting transparency, accountability, and good governance practices'
            },
            {
                reason: 'Youth Empowerment - Creating opportunities for young people to thrive and contribute to nation building'
            },
            {
                reason: 'Healthcare Access - Ensuring quality healthcare is accessible to all Kenyans'
            }
        ],
        skipDuplicates: true
    })

    // Create sample home page content
    await prisma.homePage.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: 'David Maraga 2027',
            description: 'Reset. Restore. Rebuild.'
        }
    })

    console.log('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
