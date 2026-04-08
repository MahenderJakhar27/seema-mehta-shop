'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Minus, Plus, ShoppingBag, Heart, Eye } from 'lucide-react'
import { useCart } from '@/store/useCart'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)
  const reviewCount = Math.floor(Math.random() * 20) + 5

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    for (let i = 0; i < quantity; i++) addItem(product)
  }

  const stopNav = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="product-card animate-fade-in">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="card-image">
        <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 768px) 50vw, 20vw" />
        <span className="card-badge">-15%</span>
        <div className="card-actions">
          <button onClick={stopNav} className="card-action-btn"><Heart size={16} /></button>
          <button onClick={handleAddToCart} className="card-action-btn"><ShoppingBag size={16} /></button>
          <button onClick={stopNav} className="card-action-btn"><Eye size={16} /></button>
        </div>
      </Link>

      {/* Info */}
      <div className="card-info">
        <Link href={`/product/${product.id}`}>
          <div className="card-title">{product.name}</div>
        </Link>

        <div className="card-stars">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} />)}
          <span className="card-review-count">{reviewCount} reviews</span>
        </div>

        <div className="card-price">
          <span className="current">${product.price.toFixed(2)}</span>
          <span className="original">${(product.price * 1.2).toFixed(2)}</span>
        </div>

        <div className="card-bottom">
          <div className="qty-control">
            <button onClick={(e) => { stopNav(e); setQuantity(q => Math.max(1, q - 1)) }}><Minus size={12} /></button>
            <span className="qty-num">{quantity}</span>
            <button onClick={(e) => { stopNav(e); setQuantity(q => q + 1) }}><Plus size={12} /></button>
          </div>
          <button onClick={handleAddToCart} className="add-btn">Add</button>
        </div>
      </div>
    </div>
  )
}
