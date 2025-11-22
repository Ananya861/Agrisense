import { useState } from 'react'
import './Marketplace.css'

interface Product {
  id: number
  name: string
  category: 'seed' | 'fertilizer'
  price: number
  rating: number
  reviews: number
  inStock: boolean
  image: string
  description: string
}

interface MarketplaceProps {
  locale: string
  t: any
}

export default function Marketplace({ locale, t }: MarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'seed' | 'fertilizer'>('all')
  
  // Create products array that updates with locale
  const getProducts = (): Product[] => [
    {
      id: 1,
      name: locale === 'en' ? 'Premium Tomato Seeds' : locale === 'kn' ? 'ಪ್ರೀಮಿಯಂ ಟೊಮಾಟೊ ಬೀಜಗಳು' : locale === 'hi' ? 'प्रीमियम टमाटर के बीज' : 'Tomato Seeds',
      category: 'seed',
      price: 299,
      rating: 4.5,
      reviews: 128,
      inStock: true,
      image: '🌱',
      description: locale === 'en' ? 'High-yield hybrid tomato seeds, disease-resistant' : locale === 'kn' ? 'ಹೆಚ್ಚಿನ ಇಳುವರಿ ಹೈಬ್ರಿಡ್ ಟೊಮಾಟೊ ಬೀಜಗಳು, ರೋಗ-ನಿರೋಧಕ' : locale === 'hi' ? 'उच्च उपज वाले संकर टमाटर के बीज, रोग प्रतिरोधी' : 'High-yield seeds'
    },
    {
      id: 2,
      name: locale === 'en' ? 'Organic NPK Fertilizer' : locale === 'kn' ? 'ಸಾವಯವ NPK ರಸಗೊಬ್ಬರ' : locale === 'hi' ? 'जैविक NPK उर्वरक' : 'Organic NPK',
      category: 'fertilizer',
      price: 899,
      rating: 4.8,
      reviews: 256,
      inStock: true,
      image: '🧪',
      description: locale === 'en' ? 'Balanced NPK 10:26:26, 25kg bag' : locale === 'kn' ? 'ಸಮತೋಲಿತ NPK 10:26:26, 25kg ಚೀಲ' : locale === 'hi' ? 'संतुलित NPK 10:26:26, 25kg बैग' : 'Balanced NPK'
    },
    {
      id: 3,
      name: locale === 'en' ? 'Rice Seeds - Basmati' : locale === 'kn' ? 'ಭತ್ತ ಬೀಜಗಳು - ಬಾಸ್ಮತಿ' : locale === 'hi' ? 'चावल के बीज - बासमती' : 'Basmati Rice',
      category: 'seed',
      price: 450,
      rating: 4.6,
      reviews: 89,
      inStock: true,
      image: '🌾',
      description: locale === 'en' ? 'Premium basmati rice seeds, 1kg pack' : locale === 'kn' ? 'ಪ್ರೀಮಿಯಂ ಬಾಸ್ಮತಿ ಭತ್ತ ಬೀಜಗಳು, 1kg ಪ್ಯಾಕ್' : locale === 'hi' ? 'प्रीमियम बासमती चावल के बीज, 1kg पैक' : 'Premium seeds'
    },
    {
      id: 4,
      name: locale === 'en' ? 'Urea Fertilizer' : locale === 'kn' ? 'ಯುರಿಯಾ ರಸಗೊಬ್ಬರ' : locale === 'hi' ? 'यूरिया उर्वरक' : 'Urea',
      category: 'fertilizer',
      price: 650,
      rating: 4.4,
      reviews: 167,
      inStock: false,
      image: '💊',
      description: locale === 'en' ? '46% nitrogen content, 50kg bag' : locale === 'kn' ? '46% ನೈಟ್ರೋಜನ್ ಅಂಶ, 50kg ಚೀಲ' : locale === 'hi' ? '46% नाइट्रोजन सामग्री, 50kg बैग' : '46% nitrogen'
    },
  ]
  
  const products = getProducts()
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '⭐' : '')
  }

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h1>🛒 {t.marketplace?.title || 'Marketplace for Seeds & Fertilizers'}</h1>
        <p>{t.marketplace?.description || 'Browse, compare, and order agricultural products'}</p>
      </div>

      <div className="marketplace-content">
        <div className="category-filter">
          <button 
            className={selectedCategory === 'all' ? 'active' : ''}
            onClick={() => setSelectedCategory('all')}
          >
            {locale === 'en' ? 'All Products' : locale === 'kn' ? 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು' : locale === 'hi' ? 'सभी उत्पाद' : 'All'}
          </button>
          <button 
            className={selectedCategory === 'seed' ? 'active' : ''}
            onClick={() => setSelectedCategory('seed')}
          >
            {t.marketplace?.seeds || 'Seeds'}
          </button>
          <button 
            className={selectedCategory === 'fertilizer' ? 'active' : ''}
            onClick={() => setSelectedCategory('fertilizer')}
          >
            {t.marketplace?.fertilizers || 'Fertilizers'}
          </button>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.image}</div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-rating">
                  <span>{renderStars(product.rating)}</span>
                  <span className="rating-text">{product.rating} ({product.reviews} {t.marketplace?.reviews || 'reviews'})</span>
                </div>
                <div className="product-price">
                  <span className="price">₹{product.price}</span>
                  {!product.inStock && (
                    <span className="out-of-stock">{t.marketplace?.outOfStock || 'Out of Stock'}</span>
                  )}
                </div>
                <div className="product-actions">
                  <button className="view-details-btn">
                    {t.marketplace?.viewDetails || 'View Details'}
                  </button>
                  <button 
                    className="add-to-cart-btn"
                    disabled={!product.inStock}
                  >
                    {t.marketplace?.addToCart || 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

