import { prisma } from '@/lib/prisma'
import ProductMainContent from '@/components/ProductMainContent'

async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div>
      <section className="container">
        <div className="collection-header animate-fade-in">
          <h1>Crochet Flowers Collection</h1>
          <p>
            Add a touch of handmade charm with our Crochet Flowers Collection. Each delicate flower is lovingly handcrafted 
            using vibrant, premium yarns — perfect for embellishing caps, scarves, bags, home décor, or scrapbooking projects.
          </p>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: '60px' }}>
        <ProductMainContent products={products.map(p => ({ ...p, id: p.id }))} />
      </section>

      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-card animate-fade-in">
            <div className="nl-badge">Exclusive Access</div>
            <h2>Join the Seema Mehta family</h2>
            <p className="nl-desc">
              Get 10% off your first order and stay updated with our latest artisan designs, 
              workshops, and everlasting crochet blooms.
            </p>
            <div className="nl-form">
              <input type="email" placeholder="Enter your email address" />
              <button>Subscribe</button>
            </div>
            <p className="nl-fine">By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
