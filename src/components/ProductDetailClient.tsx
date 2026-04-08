'use client'

import { useState } from 'react'
import { useCart } from '@/store/useCart'
import { ShoppingBag, ChevronLeft, Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product)
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">
        <ChevronLeft size={16} />
        Back to shop
      </Link>

      <div className="detail-grid animate-fade-in">
        <div className="detail-image">
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" priority />
        </div>

        <div>
          <span className="detail-badge">In Stock & Ready to Ship</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          
          <div className="detail-desc-box">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="detail-qty-row">
            <span className="detail-qty-label">Quantity:</span>
            <div className="detail-qty">
              <div className="qty-control">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={14} /></button>
                <span className="qty-num">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}><Plus size={14} /></button>
              </div>
            </div>
          </div>

          <div className="detail-actions">
            <button onClick={handleAddToCart} className="btn btn-primary" style={{ flex: 1, padding: '16px 24px', fontSize: '14px' }}>
              <ShoppingBag size={18} />
              Add to Bag
            </button>
            <button className="btn btn-secondary" style={{ padding: '16px 28px', fontSize: '12px' }}>
              Add to Wishlist
            </button>
          </div>

          <div className="detail-features">
            <div className="feature-card">
              <h4>Handcrafted</h4>
              <p>Made with premium yarn</p>
            </div>
            <div className="feature-card">
              <h4>Everlasting</h4>
              <p>Beauty that never fades</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
