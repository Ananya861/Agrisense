import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Login.css'

interface LoginProps {
  locale: string
  t: any
}

export default function Login({ locale, t }: LoginProps) {
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
  const navigate = useNavigate()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated, navigate])

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
      setSuccess(locale === 'en' ? 'Login successful! Redirecting...' : locale === 'kn' ? 'ಲಾಗಿನ್ ಯಶಸ್ವಿ! ಮರುನಿರ್ದೇಶಿಸಲಾಗುತ್ತಿದೆ...' : locale === 'hi' ? 'लॉगिन सफल! पुनर्निर्देशित कर रहे हैं...' : 'Login successful!')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        farmSize: ''
      })
      
      setTimeout(() => {
        navigate('/home')
      }, 1500)
    } catch (err: any) {
      console.error(err)
      setError(locale === 'en' ? 'Login failed. Please try again.' : locale === 'kn' ? 'ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : locale === 'hi' ? 'लॉगिन विफल। कृपया पुनः प्रयास करें।' : 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🌾 {t.login?.title || 'Login to AgriSense'}</h1>
          <p>
            {locale === 'en' 
              ? 'Enter your personal details to access all features' 
              : locale === 'kn' 
              ? 'ಎಲ್ಲಾ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಪ್ರವೇಶಿಸಲು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ'
              : locale === 'hi'
              ? 'सभी सुविधाओं तक पहुंचने के लिए अपनी व्यक्तिगत जानकारी दर्ज करें'
              : 'Enter your details'}
          </p>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="success-message">
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
            className="primary-button"
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
    </div>
  )
}
