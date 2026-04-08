'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { ChevronDown } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

export default function ProductMainContent({ products }: { products: Product[] }) {
  const [cols, setCols] = useState(5)

  return (
    <>
      <div className="switcher-bar animate-fade-in">
        <div className="switcher-left">
          <button className="filter-btn">
            Filter <ChevronDown size={13} strokeWidth={2.5} />
          </button>
          <div className="filter-divider" />
          <button className="filter-btn">
            Sort: Newest <ChevronDown size={13} strokeWidth={2.5} />
          </button>
        </div>

        <div className="switcher-right">
          <span className="view-label">View</span>
          <div className="grid-controls">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setCols(n)}
                className={`grid-btn ${cols === n ? 'active' : ''}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`grid-layout cols-${cols}`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
