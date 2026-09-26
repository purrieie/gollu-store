import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { StoreProvider } from './context/Store'
import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import SearchOverlay from './components/SearchOverlay'
import MobileMenu from './components/MobileMenu'
import Toast from './components/Toast'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Bundles from './pages/Bundles'
import OurStory from './pages/OurStory'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'

function ScrollManager() {
  const { pathname, hash, search } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
      return () => window.clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, search])
  return null
}

const KeyedCollection = () => { const { slug } = useParams(); return <Collection key={slug} /> }
const KeyedProduct = () => { const { slug } = useParams(); return <Product key={slug} /> }

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ScrollManager />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">Skip to content</a>
        <AnnouncementBar />
        <Header />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/collections/:slug" element={<KeyedCollection />} />
            <Route path="/products/:slug" element={<KeyedProduct />} />
            <Route path="/bundles" element={<Bundles />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer />
        <SearchOverlay />
        <MobileMenu />
        <Toast />
      </StoreProvider>
    </BrowserRouter>
  )
}
