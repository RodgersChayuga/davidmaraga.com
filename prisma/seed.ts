import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create sample volunteer reasons
    const volunteerReasons = await prisma.volunteerReason.createMany({
        data: [
            {
                title: 'Justice and Rule of Law',
                description: 'Supporting a leader committed to upholding justice and the rule of law in Kenya'
            },
            {
                title: 'Economic Development',
                description: 'Working towards economic prosperity and job creation for all Kenyans'
            },
            {
                title: 'Good Governance',
                description: 'Promoting transparency, accountability, and good governance practices'
            },
            {
                title: 'Youth Empowerment',
                description: 'Creating opportunities for young people to thrive and contribute to nation building'
            },
            {
                title: 'Healthcare Access',
                description: 'Ensuring quality healthcare is accessible to all Kenyans'
            }
        ],
        skipDuplicates: true
    })

    // Create sample home page content
    await prisma.homePage.upsert({
        where: { id: 'home-page' },
        update: {},
        create: {
            id: 'home-page',
            title: 'David Maraga 2027',
            description: 'Reset. Restore. Rebuild.',
            content: 'Join David Maraga\'s presidential campaign for 2027. Together, we can build a Kenya that works for everyone through justice, integrity, and inclusive development.'
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
