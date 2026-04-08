'use client'

import Link from 'next/link'
import { ShoppingBag, Search, User, Heart } from 'lucide-react'
import { useCart } from '@/store/useCart'
import { useState, useEffect } from 'react'

export default function Navbar({ onCartClick }: { onCartClick: () => void }) {
  const totalItems = useCart((state) => state.totalItems())
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-inner">
          <Link href="/" className="logo-text">SEEMA MEHTA</Link>
          
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/" className="nav-link">Crochet Flowers</Link>
            <Link href="/" className="nav-link">Bouquets</Link>
            <Link href="/" className="nav-link">Workshops</Link>
            <Link href="/" className="nav-link">About</Link>
          </div>
          
          <div className="nav-icons">
            <button className="nav-icon-btn hide-mobile"><Search size={20} strokeWidth={1.5} /></button>
            <button className="nav-icon-btn hide-mobile"><User size={20} strokeWidth={1.5} /></button>
            <button className="nav-icon-btn"><Heart size={20} strokeWidth={1.5} /></button>
            <button className="cart-btn" onClick={onCartClick}>
              <div style={{ position: 'relative' }}>
                <ShoppingBag size={20} strokeWidth={1.5} />
                {mounted && totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </div>
              <span className="cart-label">Bag</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
