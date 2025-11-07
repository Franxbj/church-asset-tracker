/**
 * Development seed script.
 * Creates an initial admin user and a couple of sample assets.
 * Run with: node prisma/seed.js (after prisma generate/migrate)
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function main() {
  const adminEmail = 'admin@example.com';
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const hashed = await bcrypt.hash('changeme123', SALT_ROUNDS);
    await prisma.user.create({
      data: { email: adminEmail, password: hashed, role: 'admin', name: 'Administrator' }
    });
    console.log('Created admin user: admin@example.com / changeme123 (change the password!)');
  } else {
    console.log('Admin user already exists.');
  }

  await prisma.asset.createMany({
    data: [
      {
        name: "Laptop - Dell XPS 13",
        manufacturer: "Dell",
        model: "XPS 13 9310",
        category: "electronic",
        acquisitionDate: new Date('2021-03-15'),
        price: 1200,
        quantity: 2,
        imageUrl: "",
        status: "in use",
        custody: "church premises",
        location: "Helsinki"
      },
      {
        name: "PA Mixer",
        manufacturer: "Yamaha",
        model: "MG12XU",
        category: "electronic",
        acquisitionDate: new Date('2019-09-01'),
        price: 650,
        quantity: 1,
        status: "in use",
        custody: "church premises",
        location: "Tampere"
      }
    ]
  });
  console.log('Seeded sample assets.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
