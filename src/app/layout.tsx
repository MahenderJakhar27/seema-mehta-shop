'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import CartDrawer from '@/components/CartDrawer'
import Link from 'next/link'
import { Camera, MessageCircle, Video, Phone } from 'lucide-react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <html lang="en">
      <body>
        {/* Announcement Bar */}
        <div className="announcement-bar">
          <div className="container">
            <div className="bar-inner">
              <div className="bar-social">
                <Camera size={13} />
                <MessageCircle size={13} />
                <Video size={13} />
                <span className="bar-community">10k+ Community</span>
              </div>
              <div>Free express shipping on orders over ₹150</div>
              <div className="bar-contact">
                <Phone size={13} />
                <span>Contact Us</span>
              </div>
            </div>
          </div>
        </div>

        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
        <main>{children}</main>

        {/* Footer */}
        <footer className="boutique-footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-col">
                <h4>Collections</h4>
                <ul>
                  <li><Link href="/">Handmade Crochet</Link></li>
                  <li><Link href="/">Flower Bouquets</Link></li>
                  <li><Link href="/">Home Decor</Link></li>
                  <li><Link href="/">Gift Sets</Link></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Quick Links</h4>
                <ul>
                  <li><Link href="/">Our Story</Link></li>
                  <li><Link href="/">Workshops</Link></li>
                  <li><Link href="/">Retail Store</Link></li>
                  <li><Link href="/">Memberships</Link></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Customer Care</h4>
                <ul>
                  <li><Link href="/">Contact Us</Link></li>
                  <li><Link href="/">Shipping Policy</Link></li>
                  <li><Link href="/">Returns & Refunds</Link></li>
                  <li><Link href="/">FAQ</Link></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>About The Shop</h4>
                <p>
                  The Seema Mehta Shop is dedicated to the art of handcrafted crochet. 
                  Every piece is a labor of love, designed to bring everlasting beauty to your home.
                </p>
                <div className="footer-social">
                  <button className="social-icon"><Camera size={16} /></button>
                  <button className="social-icon"><MessageCircle size={16} /></button>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <div className="footer-logo">THE SEEMA MEHTA SHOP</div>
              <div className="footer-copy">
                © 2026 Seema Mehta Limited. Handcrafted with passion in India.
              </div>
              <div className="footer-legal">
                <Link href="/">Terms</Link>
                <Link href="/">Privacy</Link>
                <Link href="/">Sitemap</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
