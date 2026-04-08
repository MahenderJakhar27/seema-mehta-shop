import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({ url: 'prisma/dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.product.deleteMany() // Clear existing products
  
  const products = [
    {
      name: 'Soft Pink Crochet Rose',
      description: 'A beautifully handcrafted crochet rose flower in soft pink. Perfect as an everlasting gift or a stunning decor piece.',
      price: 24.99,
      imageUrl: '/rose.png',
      stock: 15,
    },
    {
      name: 'Vibrant Sunflower Bouquet',
      description: 'A beautiful bouquet of vibrant crochet sunflowers. Brings sunshine to any room without the need for watering.',
      price: 49.99,
      imageUrl: '/sunflowers.png',
      stock: 8,
    },
    {
      name: 'Lavender Dream Sprig',
      description: 'Delicate crochet lavender, offering a rustic yet premium touch to your floral arrangements.',
      price: 18.50,
      imageUrl: '/rose.png', // Reusing image placeholder
      stock: 20,
    },
    {
      name: 'Miniature Succulent Pot',
      description: 'Cute, zero-maintenance crochet succulent. A perfect desk companion.',
      price: 15.00,
      imageUrl: '/sunflowers.png', // Reusing image placeholder
      stock: 10,
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }
  
  console.log('Seeded database with products!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
