'use client'

import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/store/useCart'
import Image from 'next/image'
import Link from 'next/link'

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()

  if (!isOpen) return null

  return (
    <div className="cart-overlay">
      <div className="cart-backdrop" onClick={onClose} />
      
      <div className="cart-panel">
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={22} />
            <h2>Your Cart</h2>
          </div>
          <button onClick={onClose} className="cart-close">
            <X size={22} />
          </button>
        </div>
        
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={56} />
              <p>Your cart is empty</p>
              <button onClick={onClose} className="btn btn-secondary">Start Shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <Link href={`/product/${item.id}`} onClick={onClose} className="cart-item-image">
                  <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </Link>
                <div className="cart-item-info">
                  <Link href={`/product/${item.id}`} onClick={onClose}>
                    <h4>{item.name}</h4>
                  </Link>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                  <div className="cart-item-controls">
                    <div className="cart-item-qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={13} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={13} /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="cart-delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="label">Subtotal</span>
              <span className="amount">${totalPrice().toFixed(2)}</span>
            </div>
            <Link href="/checkout" onClick={onClose} className="cart-checkout-btn">
              Checkout Now
            </Link>
            <p className="cart-shipping-note">Free shipping on all crochet orders over $100</p>
          </div>
        )}
      </div>
    </div>
  )
}
