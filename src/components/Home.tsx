import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Home.css'

interface HomeProps {
  locale: string
  t: any
}

export default function Home({ locale, t }: HomeProps) {
  const [showLogin, setShowLogin] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    farmSize: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const { login, isAuthenticated } = useAuth()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (!formData.name.trim()) {
      setError(locale === 'en' ? 'Name is required' : locale === 'kn' ? 'ಹೆಸರು ಅಗತ್ಯವಿದೆ' : locale === 'hi' ? 'नाम आवश्यक है' : 'Name required')
      return
    }
    if (!formData.email.trim()) {
      setError(locale === 'en' ? 'Email is required' : locale === 'kn' ? 'ಇಮೇಲ್ ಅಗತ್ಯವಿದೆ' : locale === 'hi' ? 'ईमेल आवश्यक है' : 'Email required')
      return
    }
    if (!formData.phone.trim()) {
      setError(locale === 'en' ? 'Phone number is required' : locale === 'kn' ? 'ಫೋನ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ' : locale === 'hi' ? 'फोन नंबर आवश्यक है' : 'Phone required')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError(locale === 'en' ? 'Please enter a valid email address' : locale === 'kn' ? 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ' : locale === 'hi' ? 'कृपया एक वैध ईमेल पता दर्ज करें' : 'Invalid email')
      return
    }

    // Phone validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setError(locale === 'en' ? 'Please enter a valid phone number' : locale === 'kn' ? 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ' : locale === 'hi' ? 'कृपया एक वैध फोन नंबर दर्ज करें' : 'Invalid phone')
      return
    }

    try {
      setIsSubmitting(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Create user object and login
      const userData = {
        email: formData.email,
        name: formData.name,
        phoneNumber: formData.phone,
        isVerified: true,
      }

      login(userData)
      setSuccess(locale === 'en' ? 'Login successful! Welcome to AgriSense.' : locale === 'kn' ? 'ಲಾಗಿನ್ ಯಶಸ್ವಿ! AgriSense ಗೆ ಸ್ವಾಗತ.' : locale === 'hi' ? 'लॉगिन सफल! AgriSense में आपका स्वागत है।' : 'Login successful!')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        farmSize: ''
      })
      
      setTimeout(() => {
        setShowLogin(false)
        setSuccess('')
      }, 2000)
    } catch (err: any) {
      console.error('Home handleLogin error:', err)
      setError(locale === 'en' ? 'Login failed. Please try again.' : locale === 'kn' ? 'ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : locale === 'hi' ? 'लॉगिन विफल। कृपया पुनः प्रयास करें।' : 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    {
      title: locale === 'en' ? 'Plant Doctor Chatbot' : locale === 'kn' ? 'ಸಸ್ಯ ವೈದ್ಯ ಚಾಟ್‌ಬಾಟ್' : locale === 'hi' ? 'प्लांट डॉक्टर चैटबॉट' : 'Plant Doctor',
      description: locale === 'en' ? 'AI assistant with image upload, predictions, and organic remedies' : locale === 'kn' ? 'ಚಿತ್ರ ಅಪ್ಲೋಡ್, ಭವಿಷ್ಯಗಳು ಮತ್ತು ಸಾವಯವ ಚಿಕಿತ್ಸೆಗಳೊಂದಿಗೆ AI ಸಹಾಯಕ' : locale === 'hi' ? 'छवि अपलोड, भविष्यवाणी और जैविक उपचार के साथ AI सहायक' : 'AI assistant',
      icon: '🌿',
      link: '/plant-doctor'
    },
    {
      title: locale === 'en' ? 'Voice Diagnosis' : locale === 'kn' ? 'ಧ್ವನಿ ರೋಗನಿರ್ಣಯ' : locale === 'hi' ? 'आवाज निदान' : 'Voice Diagnosis',
      description: locale === 'en' ? 'Speak symptoms and get instant suggestions' : locale === 'kn' ? 'ರೋಗಲಕ್ಷಣಗಳನ್ನು ಮಾತನಾಡಿ ಮತ್ತು ತಕ್ಷಣದ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ' : locale === 'hi' ? 'लक्षण बोलें और तत्काल सुझाव प्राप्त करें' : 'Speak symptoms',
      icon: '🎤',
      link: '/voice'
    },
    {
      title: locale === 'en' ? 'Weather Fertilizer' : locale === 'kn' ? 'ಹವಾಮಾನ ರಸಗೊಬ್ಬರ' : locale === 'hi' ? 'मौसम उर्वरक' : 'Weather Fertilizer',
      description: locale === 'en' ? 'Dynamic recommendations based on weather and soil' : locale === 'kn' ? 'ಹವಾಮಾನ ಮತ್ತು ಮಣ್ಣಿನ ಆಧಾರದ ಮೇಲೆ ಚಲನಶೀಲ ಶಿಫಾರಸುಗಳು' : locale === 'hi' ? 'मौसम और मिट्टी के आधार पर गतिशील सिफारिशें' : 'Weather-based recommendations',
      icon: '🌦️',
      link: '/weather-fertilizer'
    },
    {
      title: locale === 'en' ? 'Fertilizer Recommendations' : locale === 'kn' ? 'ರಸಗೊಬ್ಬರ ಶಿಫಾರಸುಗಳು' : locale === 'hi' ? 'उर्वरक सिफारिशें' : 'Fertilizer',
      description: locale === 'en' ? 'Personalized fertilizer plan based on weather & soil' : locale === 'kn' ? 'ಹವಾಮಾನ ಮತ್ತು ಮಣ್ಣಿನ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕ ರಸಗೊಬ್ಬರ ಯೋಜನೆ' : locale === 'hi' ? 'मौसम और मिट्टी के आधार पर व्यक्तिगत उर्वरक योजना' : 'Fertilizer plan',
      icon: '🌱',
      link: '/fertilizer'
    },
    {
      title: locale === 'en' ? 'Crop Calendar' : locale === 'kn' ? 'ಬೆಳೆ ಕ್ಯಾಲೆಂಡರ್' : locale === 'hi' ? 'फसल कैलेंडर' : 'Crop Calendar',
      description: locale === 'en' ? 'Automated sowing, fertilizer, and watering schedules' : locale === 'kn' ? 'ಸ್ವಯಂಚಾಲಿತ ಬಿತ್ತನೆ, ರಸಗೊಬ್ಬರ ಮತ್ತು ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿಗಳು' : locale === 'hi' ? 'स्वचालित बुवाई, उर्वरक और सिंचाई कार्यक्रम' : 'Automated schedules',
      icon: '📅',
      link: '/calendar'
    },
    {
      title: locale === 'en' ? 'Disease Heatmap' : locale === 'kn' ? 'ರೋಗ ಹೀಟ್‌ಮ್ಯಾಪ್' : locale === 'hi' ? 'रोग हीटमैप' : 'Heatmap',
      description: locale === 'en' ? 'Real-time disease spread visualization' : locale === 'kn' ? 'ತಕ್ಷಣದ ರೋಗ ಹರಡುವಿಕೆ ದೃಶ್ಯೀಕರಣ' : locale === 'hi' ? 'वास्तविक समय रोग फैलाव दृश्य' : 'Disease visualization',
      icon: '🗺️',
      link: '/heatmap'
    },
    {
      title: locale === 'en' ? 'Organic Recommendations' : locale === 'kn' ? 'ಸಾವಯವ ಶಿಫಾರಸುಗಳು' : locale === 'hi' ? 'जैविक सिफारिशें' : 'Organic',
      description: locale === 'en' ? 'Environment-friendly organic remedies' : locale === 'kn' ? 'ಪರಿಸರ-ಸ್ನೇಹಿ ಸಾವಯವ ಚಿಕಿತ್ಸೆಗಳು' : locale === 'hi' ? 'पर्यावरण-अनुकूल जैविक उपचार' : 'Eco-friendly remedies',
      icon: '🌿',
      link: '/organic'
    }
  ]

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>🌾 {t?.hero?.title || 'AgriSense - AI for Precision Agriculture'}</h1>
        <p className="hero-lead">{t?.hero?.lead || 'Diagnose, recommend, and forecast crop health with AI-powered tools'}</p>
        <div className="hero-actions">
          {!isAuthenticated && (
            <button 
              onClick={() => setShowLogin(!showLogin)} 
              className="primary-btn login-toggle-btn"
            >
              {locale === 'en' ? 'Login / Register' : locale === 'kn' ? 'ಲಾಗಿನ್ / ನೋಂದಣಿ' : locale === 'hi' ? 'लॉगिन / पंजीकरण' : 'Login'}
            </button>
          )}
          <Link to="/plant-doctor" className="primary-btn">
            {locale === 'en' ? 'Try Plant Doctor' : locale === 'kn' ? 'ಸಸ್ಯ ವೈದ್ಯ ಪ್ರಯತ್ನಿಸಿ' : locale === 'hi' ? 'प्लांट डॉक्टर आज़माएं' : 'Try Now'}
          </Link>
          <Link to="/heatmap" className="secondary-btn">
            {locale === 'en' ? 'View Heatmap' : locale === 'kn' ? 'ಹೀಟ್‌ಮ್ಯಾಪ್ ನೋಡಿ' : locale === 'hi' ? 'हीटमैप देखें' : 'View Heatmap'}
          </Link>
        </div>
      </div>

      {!isAuthenticated && showLogin && (
        <div className="login-section">
          <div className="login-section-header">
            <h2>
              {locale === 'en' ? '👤 Login to AgriSense' : locale === 'kn' ? '👤 AgriSense ಗೆ ಲಾಗಿನ್ ಮಾಡಿ' : locale === 'hi' ? '👤 AgriSense में लॉगिन करें' : 'Login'}
            </h2>
            <p>
              {locale === 'en' 
                ? 'Enter your personal details to access all features' 
                : locale === 'kn' 
                ? 'ಎಲ್ಲಾ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಪ್ರವೇಶಿಸಲು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ'
                : locale === 'hi'
                ? 'सभी सुविधाओं तक पहुंचने के लिए अपनी व्यक्तिगत जानकारी दर्ज करें'
                : 'Enter your details'}
            </p>
            <button 
              className="close-login-btn" 
              onClick={() => {
                setShowLogin(false)
                setError('')
                setSuccess('')
              }}
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="login-error">
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="login-success">
              <p>{success}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">
                  {locale === 'en' ? 'Full Name *' : locale === 'kn' ? 'ಪೂರ್ಣ ಹೆಸರು *' : locale === 'hi' ? 'पूरा नाम *' : 'Name *'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={locale === 'en' ? 'Enter your full name' : locale === 'kn' ? 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ' : locale === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 'Full name'}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  {locale === 'en' ? 'Email Address *' : locale === 'kn' ? 'ಇಮೇಲ್ ವಿಳಾಸ *' : locale === 'hi' ? 'ईमेल पता *' : 'Email *'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={locale === 'en' ? 'your.email@example.com' : locale === 'kn' ? 'ನಿಮ್ಮ.ಇಮೇಲ್@ಉದಾಹರಣೆ.com' : locale === 'hi' ? 'आपका.ईमेल@उदाहरण.com' : 'email@example.com'}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">
                  {locale === 'en' ? 'Phone Number *' : locale === 'kn' ? 'ಫೋನ್ ಸಂಖ್ಯೆ *' : locale === 'hi' ? 'फोन नंबर *' : 'Phone *'}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={locale === 'en' ? '+91 9876543210' : locale === 'kn' ? '+91 9876543210' : locale === 'hi' ? '+91 9876543210' : '+91 9876543210'}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">
                  {locale === 'en' ? 'Location / Village' : locale === 'kn' ? 'ಸ್ಥಳ / ಗ್ರಾಮ' : locale === 'hi' ? 'स्थान / गाँव' : 'Location'}
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder={locale === 'en' ? 'Your village or city' : locale === 'kn' ? 'ನಿಮ್ಮ ಗ್ರಾಮ ಅಥವಾ ನಗರ' : locale === 'hi' ? 'आपका गाँव या शहर' : 'Location'}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="farmSize">
                {locale === 'en' ? 'Farm Size (Acres)' : locale === 'kn' ? 'ಕೃಷಿ ಜಮೀನು ಗಾತ್ರ (ಎಕರೆ)' : locale === 'hi' ? 'खेत का आकार (एकड़)' : 'Farm Size'}
              </label>
              <select
                id="farmSize"
                name="farmSize"
                value={formData.farmSize}
                onChange={handleInputChange}
                disabled={isSubmitting}
              >
                <option value="">{locale === 'en' ? 'Select farm size' : locale === 'kn' ? 'ಕೃಷಿ ಜಮೀನು ಗಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ' : locale === 'hi' ? 'खेत का आकार चुनें' : 'Select'}</option>
                <option value="0-1">{locale === 'en' ? 'Less than 1 acre' : locale === 'kn' ? '1 ಎಕರೆಗಿಂತ ಕಡಿಮೆ' : locale === 'hi' ? '1 एकड़ से कम' : '< 1 acre'}</option>
                <option value="1-5">{locale === 'en' ? '1-5 acres' : locale === 'kn' ? '1-5 ಎಕರೆ' : locale === 'hi' ? '1-5 एकड़' : '1-5 acres'}</option>
                <option value="5-10">{locale === 'en' ? '5-10 acres' : locale === 'kn' ? '5-10 ಎಕರೆ' : locale === 'hi' ? '5-10 एकड़' : '5-10 acres'}</option>
                <option value="10-25">{locale === 'en' ? '10-25 acres' : locale === 'kn' ? '10-25 ಎಕರೆ' : locale === 'hi' ? '10-25 एकड़' : '10-25 acres'}</option>
                <option value="25+">{locale === 'en' ? 'More than 25 acres' : locale === 'kn' ? '25 ಎಕರೆಗಿಂತ ಹೆಚ್ಚು' : locale === 'hi' ? '25 एकड़ से अधिक' : '25+ acres'}</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="login-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (locale === 'en' ? 'Logging in...' : locale === 'kn' ? 'ಲಾಗ್ ಇನ್ ಮಾಡಲಾಗುತ್ತಿದೆ...' : locale === 'hi' ? 'लॉगिन हो रहा है...' : 'Logging in...')
                : (locale === 'en' ? 'Login / Register' : locale === 'kn' ? 'ಲಾಗಿನ್ / ನೋಂದಣಿ' : locale === 'hi' ? 'लॉगिन / पंजीकरण' : 'Login')
              }
            </button>

            <p className="login-note">
              {locale === 'en' 
                ? '* Required fields. By logging in, you agree to our terms and conditions.' 
                : locale === 'kn' 
                ? '* ಅಗತ್ಯವಾದ ಜಾಗಗಳು. ಲಾಗ್ ಇನ್ ಮಾಡುವ ಮೂಲಕ, ನೀವು ನಮ್ಮ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳಿಗೆ ಒಪ್ಪುತ್ತೀರಿ.'
                : locale === 'hi'
                ? '* आवश्यक फ़ील्ड। लॉगिन करके, आप हमारी शर्तों और नियमों से सहमत हैं।'
                : '* Required fields'}
            </p>
          </form>
        </div>
      )}

      <div className="features-grid">
        {features.map((feature, idx) => (
          <Link key={idx} to={feature.link} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

