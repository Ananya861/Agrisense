import { type ReactNode, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { type Locale } from '../i18n'
import { useAuth } from '../contexts/AuthContext'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
  locale: Locale
  setLocale: (locale: Locale) => void
  t: any
}

export default function Layout({ children, locale, setLocale, t }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const navLinks = t?.navLinks || []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/home')
  }

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          <Link to="/" className="logo">
            🌾 AgriSense
          </Link>
          <nav className="main-nav">
            {navLinks.map((link: any) => (
              <Link
                key={link.href}
                to={link.href}
                className={location.pathname === link.href ? 'active' : ''}
                onClick={() => {
                  // Ensure navigation works
                  window.scrollTo(0, 0)
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            {isAuthenticated && user ? (
              <div className="user-info">
                <div className="user-details">
                  {user.picture && (
                    <img src={user.picture} alt={user.name} className="user-avatar" />
                  )}
                  <span className="user-name">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="logout-button">
                  {t.login?.logout || 'Logout'}
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-button">
                {locale === 'en' ? 'Login' : locale === 'kn' ? 'ಲಾಗಿನ್' : locale === 'hi' ? 'लॉगिन' : locale === 'te' ? 'లాగిన్' : locale === 'ta' ? 'உள்நுழை' : locale === 'mr' ? 'लॉगिन' : 'Login'}
              </Link>
            )}
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="language-select"
            >
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="hi">हिंदी</option>
              <option value="te">తెలుగు</option>
              <option value="ta">தமிழ்</option>
              <option value="mr">मराठी</option>
            </select>
          </div>
        </div>
      </header>
      <main className="app-main">
        {children}
      </main>
      <footer className="app-footer">
        <p>© 2024 AgriSense - AI-Powered Agriculture Platform</p>
        <p>{locale === 'en' ? 'Supporting farmers with technology' : locale === 'kn' ? 'ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ರೈತರಿಗೆ ಬೆಂಬಲ' : locale === 'hi' ? 'तकनीक के साथ किसानों का समर्थन' : 'Supporting farmers'}</p>
      </footer>
    </div>
  )
}

