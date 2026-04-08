'use client'

import { useCart } from '@/store/useCart'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CreditCard, CheckCircle2, Lock, Truck, Shield } from 'lucide-react'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const orderData = {
      customerName: formData.get('name'),
      customerEmail: formData.get('email'),
      address: formData.get('address'),
      city: formData.get('city'),
      postalCode: formData.get('postalCode'),
      country: formData.get('country'),
      totalAmount: totalPrice(),
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    }

    try {
      const resp = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      if (resp.ok) {
        setIsSuccess(true)
        clearCart()
      } else {
        alert('Failed to place order. Please try again.')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!mounted) return null

  if (isSuccess) {
    return (
      <div className="container">
        <div className="checkout-success animate-fade-in">
          <div className="success-icon">
            <CheckCircle2 size={48} />
          </div>
          <h1>Thank you for your order!</h1>
          <p>
            We've received your order and will begin handcrafting your crochet items right away. 
            A confirmation email has been sent to your inbox.
          </p>
          <Link href="/" className="btn btn-primary">Return to Shop</Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="checkout-success animate-fade-in">
          <h1>Your cart is empty</h1>
          <p>Add some beautiful crochet items to get started.</p>
          <Link href="/" className="btn btn-primary">Go to Shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">
        <ArrowLeft size={16} />
        Back to shopping
      </Link>

      <div className="checkout-grid animate-fade-in">
        {/* Left Column — Form */}
        <div className="checkout-form-col">
          <div className="checkout-card">
            <div className="checkout-card-header">
              <h2>Shipping Information</h2>
              <span className="checkout-step">Step 1 of 2</span>
            </div>
            
            <form id="checkout-form" onSubmit={handleSubmit}>
              <div className="form-row form-row-2">
                <div className="form-group">
                  <label>Full Name</label>
                  <input name="name" required placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input name="email" type="email" required placeholder="john@example.com" />
                </div>
              </div>

              <div className="form-group">
                <label>Shipping Address</label>
                <input name="address" required placeholder="123 Crochet Lane" />
              </div>

              <div className="form-row form-row-3">
                <div className="form-group">
                  <label>City</label>
                  <input name="city" required placeholder="New York" />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input name="postalCode" required placeholder="10001" />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input name="country" required placeholder="USA" />
                </div>
              </div>
            </form>
          </div>

          <div className="checkout-card">
            <div className="checkout-card-header">
              <h2>Payment Information</h2>
              <span className="checkout-step">Step 2 of 2</span>
            </div>
            
            <div className="payment-demo">
              <CreditCard size={22} />
              <div>
                <p className="payment-demo-title">Demo Mode</p>
                <p className="payment-demo-desc">This is a mock payment for testing purposes. No real charges will be made.</p>
              </div>
            </div>
            
            <button 
              type="submit" 
              form="checkout-form"
              disabled={isProcessing}
              className="checkout-submit"
            >
              <Lock size={16} />
              {isProcessing ? 'Processing...' : `Place Order · $${totalPrice().toFixed(2)}`}
            </button>
          </div>

          <div className="checkout-trust">
            <div className="trust-item">
              <Lock size={16} />
              <span>Secure Checkout</span>
            </div>
            <div className="trust-item">
              <Truck size={16} />
              <span>Free Shipping</span>
            </div>
            <div className="trust-item">
              <Shield size={16} />
              <span>Money-back Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Column — Order Summary */}
        <div className="checkout-summary-col">
          <div className="checkout-card summary-card">
            <h2>Order Summary</h2>
            
            <div className="summary-items">
              {items.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-image">
                    <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    <span className="summary-item-qty">{item.quantity}</span>
                  </div>
                  <div className="summary-item-info">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="summary-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span className="free-shipping">FREE</span>
              </div>
              <div className="summary-line summary-total">
                <span>Total</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="checkout-quote">
            <p>&ldquo;Each flower is unique, handcrafted with sustainable materials.&rdquo;</p>
            <span>— The Seema Mehta Shop</span>
          </div>
        </div>
      </div>
    </div>
  )
}
