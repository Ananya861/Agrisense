// React import not required with new JSX transforms; keep file minimal
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Home.css'

interface HomeProps {
  locale: string
  t: any
}

export default function Home({ locale, t }: HomeProps) {
  const { isAuthenticated } = useAuth()

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
            <Link to="/login" className="primary-btn login-toggle-btn">
              {locale === 'en' ? 'Login / Register' : locale === 'kn' ? 'ಲಾಗಿನ್ / ನೋಂದણી' : locale === 'hi' ? 'लॉगिन / पंजीकरण' : 'Login'}
            </Link>
          )}
          <Link to="/plant-doctor" className="primary-btn">
            {locale === 'en' ? 'Try Plant Doctor' : locale === 'kn' ? 'ಸಸ್ಯ ವೈದ್ಯ ಪ್ರಯತ್ನಿಸಿ' : locale === 'hi' ? 'प्लांट डॉक्टर आज़माएं' : 'Try Now'}
          </Link>
          <Link to="/heatmap" className="secondary-btn">
            {locale === 'en' ? 'View Heatmap' : locale === 'kn' ? 'ಹೀಟ್‌ಮ್ಯಾಪ್ ನೋಡಿ' : locale === 'hi' ? 'हीटमैप देखें' : 'View Heatmap'}
          </Link>
        </div>
      </div>

      

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

