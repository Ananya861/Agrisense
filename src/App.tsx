import { useEffect, useState } from 'react'
import './App.css'
import { translations, type Locale } from './i18n'

type FertilizerForm = {
  ph: string
  moisture: string
  nitrogen: string
  phosphorus: string
  potassium: string
}

type ForecastForm = {
  crop: string
  acreage: string
  season: string
}

type ContactForm = {
  name: string
  email: string
  company: string
  message: string
}

type AudioClipKey =
  | 'hero'
  | 'detection'
  | 'fertilizer'
  | 'analytics'
  | 'contact'
  | 'guide'

function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const t = translations[locale]
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [diseaseResult, setDiseaseResult] = useState<{
    name: string
    confidence: number
    description: string
  } | null>(null)

  const [fertilizerForm, setFertilizerForm] = useState<FertilizerForm>({
    ph: '',
    moisture: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
  })
  const [fertilizerSuggestion, setFertilizerSuggestion] = useState<
    string | null
  >(null)

  const [forecastForm, setForecastForm] = useState<ForecastForm>({
    crop: '',
    acreage: '',
    season: '',
  })
  const [forecastInsight, setForecastInsight] = useState<string | null>(null)

  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [contactStatus, setContactStatus] = useState<string | null>(null)
  const [activeClip, setActiveClip] = useState<AudioClipKey | null>(null)
  const [showTutorial, setShowTutorial] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(0)

  const {
    hero,
    detection: detectionCopy,
    fertilizer: fertilizerCopy,
    analytics: analyticsCopy,
    userManagement: userCopy,
    contact: contactCopy,
    messages: messageCopy,
  } = t
  const navLinks = t.navLinks
  const moduleHighlights = t.modules
  const detectionClasses = t.detectionClasses
  const seasons = t.seasons
  const healthyLabel = detectionClasses[detectionClasses.length - 1] ?? ''
  const fertilizerFields: Array<keyof FertilizerForm> = [
    'ph',
    'moisture',
    'nitrogen',
    'phosphorus',
    'potassium',
  ]
  const languageOptions = Object.entries(translations) as Array<[Locale, typeof t]>
  const audioScripts: Record<AudioClipKey, Record<Locale, string>> = {
    hero: {
      en: 'Welcome to AgriSense. This section explains how the platform detects crop disease, suggests fertilizer and forecasts yield. Tap the green button to try a module, or play this anytime for spoken guidance.',
      kn: 'AgriSense ಗೆ ಸುಸ್ವಾಗತ. ಇಲ್ಲಿ ರೋಗ ಪತ್ತೆ, ರಸಗೊಬ್ಬರ ಸಲಹೆ, ಉತ್ಪಾದನೆ ಭವಿಷ್ಯ ವಿವರಿಸಲಾಗುತ್ತದೆ. ಹಸಿರು ಬಟನ್ ಒತ್ತಿ ಅಥವಾ ಈ ಧ್ವನಿಯನ್ನು ಕೇಳಿ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.',
      hi: 'AgriSense में आपका स्वागत है। यह खंड बताता है कि प्लेटफॉर्म फसल रोग का पता कैसे लगाता है, उर्वरक सुझाता है और उपज का पूर्वानुमान लगाता है।',
      te: 'AgriSense కు స్వాగతం.',
      ta: 'AgriSense க்கு வரவேற்கிறோம்.',
      mr: 'AgriSense मध्ये आपले स्वागत आहे.',
    },
    detection: {
      en: 'Step one: snap a clear photo of the affected leaf. Step two: upload it here. The system will tell you the disease name, confidence and treatment in simple speech.',
      kn: 'ಹಂತ 1: ರೋಗ ಬಾಧಿತ ಎಲೆಯ ಸ್ಪಷ್ಟ ಚಿತ್ರ ತೆಗೆದುಕೊಳ್ಳಿ. ಹಂತ 2: ಅದನ್ನು ಇಲ್ಲಿ ಅಪ್ಲೋಡ್ ಮಾಡಿ. ವ್ಯವಸ್ಥೆ ರೋಗದ ಹೆಸರು, ವಿಶ್ವಾಸ ಮತ್ತು ಚಿಕಿತ್ಸೆ ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಹೇಳುತ್ತದೆ.',
      hi: 'चरण एक: प्रभावित पत्ती की एक स्पष्ट तस्वीर लें। चरण दो: इसे यहां अपलोड करें।',
      te: 'దశ 1: ప్రభావిత ఆకు యొక్క స్పష్టమైన ఫోటో తీయండి.',
      ta: 'படி 1: பாதிக்கப்பட்ட இலையின் தெளிவான புகைப்படம் எடுக்கவும்.',
      mr: 'पाऊल 1: प्रभावित पानाचे स्पष्ट फोटो काढा.',
    },
    fertilizer: {
      en: 'Enter soil pH, moisture and NPK from your test kit. AgriSense compares with past fields and narrates the ideal fertilizer mix and quantity.',
      kn: 'ಪರೀಕ್ಷಾ ಕಿಟ್‌ನ pH, ತೇವ, NPK ಮೌಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿ. AgriSense ಹಿಂದಿನ ಕ್ಷೇತ್ರಗಳೊಂದಿಗೆ ಹೋಲಿಸಿ ಸೂಕ್ತ ರಸಗೊಬ್ಬರ ಮಿಶ್ರಣ ಮತ್ತು ಪ್ರಮಾಣವನ್ನು ಧ್ವನಿಯಲ್ಲಿ ಹೇಳುತ್ತದೆ.',
      hi: 'अपने परीक्षण किट से मिट्टी का pH, नमी और NPK दर्ज करें।',
      te: 'మీ పరీక్ష కిట్ నుండి నేల pH, తేమ మరియు NPK నమోదు చేయండి.',
      ta: 'உங்கள் சோதனை கிட் இலிருந்து மண் pH, ஈரப்பதம் மற்றும் NPK ஐ உள்ளிடவும்.',
      mr: 'तुमच्या चाचणी किटमधून मातीचा pH, आर्द्रता आणि NPK प्रविष्ट करा.',
    },
    analytics: {
      en: 'Type the crop, acreage and season. When you press forecast, the dashboard reads out the yield expectation plus weather risks so every farmer understands the plan.',
      kn: 'ಬೆಳೆ, ಎಕರೆ ಮತ್ತು ಹಂಗಾಮನ್ನು ನಮೂದಿಸಿ. Forecast ಒತ್ತಿದಾಗ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಉತ್ಪಾದನೆ ನಿರೀಕ್ಷೆ ಮತ್ತು ಹವಾಮಾನ ಅಪಾಯವನ್ನು ಧ್ವನಿಯಲ್ಲಿ ಓದುತ್ತದೆ.',
      hi: 'फसल, एकड़ और मौसम टाइप करें।',
      te: 'పంట, ఎకరా మరియు సీజన్ టైప్ చేయండి.',
      ta: 'பயிர், ஏக்கர் மற்றும் பருவத்தை தட்டச்சு செய்யவும்.',
      mr: 'पीक, एकर आणि हंगाम टाइप करा.',
    },
    contact: {
      en: 'Fill your name, phone or email and short message. Our agronomy coach will call back in your language within one working day.',
      kn: 'ನಿಮ್ಮ ಹೆಸರು, ಇಮೇಲ್ ಅಥವಾ ಫೋನ್ ಮತ್ತು ಚಿಕ್ಕ ಸಂದೇಶ ನಮೂದಿಸಿ. ಒಂದು ಕಾರ್ಯದಿನದಲ್ಲಿ ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ನಮ್ಮ ಅಗ್ರೋನಮಿ ಸಲಹೆಗಾರ ಕರೆಮಾಡುತ್ತಾರೆ.',
      hi: 'अपना नाम, फोन या ईमेल और संक्षिप्त संदेश भरें।',
      te: 'మీ పేరు, ఫోన్ లేదా ఇమెయిల్ మరియు చిన్న సందేశాన్ని పూరించండి.',
      ta: 'உங்கள் பெயர், தொலைபேசி அல்லது மின்னஞ்சல் மற்றும் குறுகிய செய்தியை நிரப்பவும்.',
      mr: 'तुमचे नाव, फोन किंवा ईमेल आणि लहान संदेश भरा.',
    },
    guide: {
      en: 'Each pictogram tells a story. Green leaf means disease help, blue droplet means irrigation change, beaker means soil chemistry, and speaker means tap to listen.',
      kn: 'ಪ್ರತಿ ಚಿತ್ರಚಿಹ್ನೆ ಒಂದು ಕಥೆ ಹೇಳುತ್ತದೆ. ಹಸಿರು ಎಲೆ = ರೋಗ ಸಹಾಯ, ನೀಲಿ ಹನಿ = ನೀರಾವರಿ ಬದಲಾವಣೆ, ಬಾಟಲಿ = ಮಣ್ಣು ರಸಾಯನ, ಸ್ಪೀಕರ್ = ಕೇಳಲು ಒತ್ತಿ.',
      hi: 'प्रत्येक चित्र एक कहानी बताता है।',
      te: 'ప్రతి చిత్రం ఒక కథను చెబుతుంది.',
      ta: 'ஒவ்வொரு படமும் ஒரு கதையைச் சொல்கிறது.',
      mr: 'प्रत्येक चित्र एक कथा सांगते.',
    },
  }
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])
  const getDiseaseAdvice = (disease: string) =>
    messageCopy.diseaseDetected.replace('{{disease}}', disease)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file.name)
      const mockClass =
        detectionClasses[Math.floor(Math.random() * detectionClasses.length)]
      const mockConfidence = Math.floor(Math.random() * 25) + 70
      setDiseaseResult({
        name: mockClass,
        confidence: mockConfidence,
        description:
          mockClass === healthyLabel
            ? messageCopy.diseaseHealthy
            : getDiseaseAdvice(mockClass),
      })
    }
  }

  const handleFertilizerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    setFertilizerForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (field: keyof FertilizerForm, value: string) => {
    setFertilizerForm((prev) => ({ ...prev, [field]: value }))
  }

  const getPhStatus = (ph: string) => {
    if (!ph) return { status: 'neutral', color: '#6d7b73', label: locale === 'en' ? 'Enter pH' : 'pH ನಮೂದಿಸಿ' }
    const phNum = parseFloat(ph)
    if (phNum < 6) return { status: 'acidic', color: '#e63946', label: locale === 'en' ? 'Acidic' : 'ಆಮ್ಲೀಯ' }
    if (phNum > 8) return { status: 'alkaline', color: '#457b9d', label: locale === 'en' ? 'Alkaline' : 'ಕ್ಷಾರೀಯ' }
    return { status: 'neutral', color: '#008f57', label: locale === 'en' ? 'Neutral' : 'ತಟಸ್ಥ' }
  }

  const getMoistureStatus = (moisture: string) => {
    if (!moisture) return { status: 'normal', color: '#6d7b73' }
    const moistNum = parseFloat(moisture)
    if (moistNum < 30) return { status: 'dry', color: '#d4a373', label: locale === 'en' ? 'Dry' : 'ಒಣ' }
    if (moistNum > 70) return { status: 'wet', color: '#457b9d', label: locale === 'en' ? 'Wet' : 'ಆರ್ದ್ರ' }
    return { status: 'normal', color: '#008f57', label: locale === 'en' ? 'Normal' : 'ಸಾಮಾನ್ಯ' }
  }

  const fertilizerFieldConfig: Record<keyof FertilizerForm, { min: number; max: number; step: number; icon: string; unit: string }> = {
    ph: { min: 4, max: 9, step: 0.1, icon: '🧪', unit: '' },
    moisture: { min: 0, max: 100, step: 1, icon: '💧', unit: '%' },
    nitrogen: { min: 0, max: 200, step: 1, icon: 'N', unit: 'ppm' },
    phosphorus: { min: 0, max: 200, step: 1, icon: 'P', unit: 'ppm' },
    potassium: { min: 0, max: 200, step: 1, icon: 'K', unit: 'ppm' },
  }

  const handleFertilizerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { ph, nitrogen, phosphorus, potassium } = fertilizerForm
    if (!ph || !nitrogen || !phosphorus || !potassium) {
      setFertilizerSuggestion(messageCopy.fertilizerMissing)
      return
    }
    const phValue = parseFloat(ph)
    const suggestion =
      phValue < 6
        ? messageCopy.fertilizerLowPh
        : messageCopy.fertilizerBalanced
    setFertilizerSuggestion(
      `${suggestion} · XGBoost consensus score 0.94`
    )
  }

  const handleForecastChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setForecastForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleForecastSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!forecastForm.crop || !forecastForm.acreage || !forecastForm.season) {
      setForecastInsight(messageCopy.forecastMissing)
      return
    }
    setForecastInsight(
      messageCopy.forecastResult(forecastForm.crop, forecastForm.season)
    )
  }

  const handleContactChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactStatus(contactCopy.missing)
      return
    }
    setContactStatus(contactCopy.success)
    setContactForm({ name: '', email: '', company: '', message: '' })
  }

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as Locale)
    setFertilizerSuggestion(null)
    setForecastInsight(null)
    setContactStatus(null)
  }



  const toggleAudio = (clip: AudioClipKey) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Voice guidance is not supported in this browser.')
      return
    }
    window.speechSynthesis.cancel()
    if (activeClip === clip) {
      setActiveClip(null)
      return
    }
    const script = audioScripts[clip][locale]
    const utterance = new SpeechSynthesisUtterance(script)
    utterance.lang = locale === 'kn' ? 'kn-IN' : 'en-IN'
    utterance.rate = 1
    utterance.onend = () => setActiveClip((current) => (current === clip ? null : current))
    utterance.onerror = () => setActiveClip((current) => (current === clip ? null : current))
    setActiveClip(clip)
    window.speechSynthesis.speak(utterance)
  }

  const renderAudioButton = (
    clip: AudioClipKey,
    labelEn: string,
    labelKn: string
  ) => (
    <button
      type="button"
      className={`audio-button ${activeClip === clip ? 'is-playing' : ''}`}
      onClick={() => toggleAudio(clip)}
    >
      🔊{' '}
      {activeClip === clip
        ? locale === 'en'
          ? 'Stop audio'
          : 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ'
        : locale === 'en'
          ? labelEn
          : labelKn}
    </button>
  )

  const downloadCheatSheet = () => {
    const sheet = locale === 'en' 
      ? `AgriSense Quick Guide - English

🌿 DISEASE DETECTION
1. Tap camera icon
2. Upload clear leaf photo
3. Listen to diagnosis
4. Follow treatment advice

🧪 FERTILIZER RECOMMENDATION
1. Enter soil pH (4-9)
2. Enter moisture % (0-100)
3. Enter NPK values (ppm)
4. Get fertilizer mix + quantity

📈 YIELD FORECAST
1. Select crop type
2. Enter acreage
3. Choose season (Kharif/Rabi/Summer)
4. Listen to forecast + risk alerts

💬 CONTACT SUPPORT
- Fill name, email, message
- Get call back in your language
- WhatsApp: Share results instantly

🔊 AUDIO HELP
- Tap 🔊 button on any section
- Works offline after first use
- Available in English & Kannada

📱 WHATSAPP SHARING
- Share disease results
- Share fertilizer plans
- Share forecast reports
- Works without internet

Need help? Call support or use audio guide buttons.`
      : `AgriSense ತ್ವರಿತ ಮಾರ್ಗದರ್ಶಿ - ಕನ್ನಡ

🌿 ರೋಗ ಪತ್ತೆ
1. ಕ್ಯಾಮೆರಾ ಐಕಾನ್ ಒತ್ತಿ
2. ಸ್ಪಷ್ಟ ಎಲೆ ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ
3. ರೋಗ ನಿರ್ಣಯ ಕೇಳಿ
4. ಚಿಕಿತ್ಸೆ ಸಲಹೆ ಅನುಸರಿಸಿ

🧪 ರಸಗೊಬ್ಬರ ಸಲಹೆ
1. ಮಣ್ಣು pH (4-9) ನಮೂದಿಸಿ
2. ತೇವ % (0-100) ನಮೂದಿಸಿ
3. NPK ಮೌಲ್ಯಗಳು (ppm) ನಮೂದಿಸಿ
4. ರಸಗೊಬ್ಬರ ಮಿಶ್ರಣ + ಪ್ರಮಾಣ ಪಡೆಯಿರಿ

📈 ಉತ್ಪಾದನೆ ಭವಿಷ್ಯ
1. ಬೆಳೆ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ
2. ಎಕರೆ ನಮೂದಿಸಿ
3. ಹಂಗಾಮು ಆಯ್ಕೆಮಾಡಿ (ಖರೀಫ್/ರಬಿ/ಬೇಸಿಗೆ)
4. ಭವಿಷ್ಯ + ಅಪಾಯ ಎಚ್ಚರಿಕೆ ಕೇಳಿ

💬 ಬೆಂಬಲ ಸಂಪರ್ಕ
- ಹೆಸರು, ಇಮೇಲ್, ಸಂದೇಶ ನಮೂದಿಸಿ
- ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕರೆಬ್ಯಾಕ್ ಪಡೆಯಿರಿ
- WhatsApp: ಫಲಿತಾಂಶಗಳನ್ನು ತಕ್ಷಣ ಹಂಚಿಕೊಳ್ಳಿ

🔊 ಧ್ವನಿ ಸಹಾಯ
- ಯಾವುದೇ ವಿಭಾಗದಲ್ಲಿ 🔊 ಬಟನ್ ಒತ್ತಿ
- ಮೊದಲ ಬಳಕೆಯ ನಂತರ ಆಫ್‌ಲೈನ್‌ಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ
- ಇಂಗ್ಲಿಷ್ & ಕನ್ನಡದಲ್ಲಿ ಲಭ್ಯವಿದೆ

📱 WhatsApp ಹಂಚಿಕೆ
- ರೋಗ ಫಲಿತಾಂಶಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ
- ರಸಗೊಬ್ಬರ ಯೋಜನೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ
- ಭವಿಷ್ಯ ವರದಿಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ
- ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ

ಸಹಾಯ ಬೇಕೇ? ಬೆಂಬಲಕ್ಕೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ ಬಟನ್‌ಗಳನ್ನು ಬಳಸಿ.`
    
    const blob = new Blob([sheet], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `agrisense-guide-${locale}.txt`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const shareToWhatsApp = (content: string, type: 'disease' | 'fertilizer' | 'forecast') => {
    const baseUrl = 'https://wa.me/?text='
    const emoji = type === 'disease' ? '🌿' : type === 'fertilizer' ? '🧪' : '📈'
    const message = encodeURIComponent(`${emoji} AgriSense ${type === 'disease' ? 'Disease' : type === 'fertilizer' ? 'Fertilizer' : 'Forecast'} Result:\n\n${content}\n\n${locale === 'en' ? 'Get your farm intelligence at AgriSense' : 'AgriSense ನಲ್ಲಿ ನಿಮ್ಮ ಕೃಷಿ ಬುದ್ಧಿಮತ್ತೆ ಪಡೆಯಿರಿ'}`)
    window.open(`${baseUrl}${message}`, '_blank')
  }

  const tutorialSteps = [
    {
      target: '#detection',
      title: locale === 'en' ? 'Step 1: Disease Detection' : 'ಹಂತ 1: ರೋಗ ಪತ್ತೆ',
      content: locale === 'en' 
        ? 'Upload a leaf photo here. The system will identify diseases and suggest treatments.'
        : 'ಇಲ್ಲಿ ಎಲೆ ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ. ವ್ಯವಸ್ಥೆ ರೋಗಗಳನ್ನು ಗುರುತಿಸಿ ಚಿಕಿತ್ಸೆ ಸಲಹೆ ನೀಡುತ್ತದೆ.',
      icon: '🌿'
    },
    {
      target: '#fertilizer',
      title: locale === 'en' ? 'Step 2: Fertilizer Guide' : 'ಹಂತ 2: ರಸಗೊಬ್ಬರ ಮಾರ್ಗದರ್ಶಿ',
      content: locale === 'en'
        ? 'Enter your soil test values. Get personalized fertilizer recommendations.'
        : 'ನಿಮ್ಮ ಮಣ್ಣು ಪರೀಕ್ಷಾ ಮೌಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿ. ವೈಯಕ್ತಿಕ ರಸಗೊಬ್ಬರ ಸಲಹೆ ಪಡೆಯಿರಿ.',
      icon: '🧪'
    },
    {
      target: '#analytics',
      title: locale === 'en' ? 'Step 3: Yield Forecast' : 'ಹಂತ 3: ಉತ್ಪಾದನೆ ಭವಿಷ್ಯ',
      content: locale === 'en'
        ? 'Predict your crop yield and weather risks. Plan ahead with confidence.'
        : 'ನಿಮ್ಮ ಬೆಳೆ ಉತ್ಪಾದನೆ ಮತ್ತು ಹವಾಮಾನ ಅಪಾಯವನ್ನು ಊಹಿಸಿ. ವಿಶ್ವಾಸದಿಂದ ಮುಂಚಿತವಾಗಿ ಯೋಜಿಸಿ.',
      icon: '📈'
    },
    {
      target: '#audio-guide',
      title: locale === 'en' ? 'Step 4: Audio Help' : 'ಹಂತ 4: ಧ್ವನಿ ಸಹಾಯ',
      content: locale === 'en'
        ? 'Tap 🔊 buttons to hear instructions in your language. Works offline too!'
        : 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಸೂಚನೆಗಳನ್ನು ಕೇಳಲು 🔊 ಬಟನ್‌ಗಳನ್ನು ಒತ್ತಿ. ಆಫ್‌ಲೈನ್‌ಲ್ಲೂ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ!',
      icon: '🔊'
    }
  ]

  const startTutorial = () => {
    setShowTutorial(true)
    setTutorialStep(0)
  }

  const nextTutorialStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1)
      const nextTarget = document.querySelector(tutorialSteps[tutorialStep + 1].target)
      nextTarget?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      setShowTutorial(false)
      setTutorialStep(0)
    }
  }

  const skipTutorial = () => {
    setShowTutorial(false)
    setTutorialStep(0)
  }

  const commonCrops = [
    { name: locale === 'en' ? 'Wheat' : 'ಗೋಧಿ', icon: '🌾', value: 'Wheat' },
    { name: locale === 'en' ? 'Rice' : 'ಭತ್ತ', icon: '🌾', value: 'Rice' },
    { name: locale === 'en' ? 'Corn' : 'ಮೆಕ್ಕೆ ಜೋಳ', icon: '🌽', value: 'Corn' },
    { name: locale === 'en' ? 'Cotton' : 'ಹತ್ತಿ', icon: '🌿', value: 'Cotton' },
    { name: locale === 'en' ? 'Sugarcane' : 'ಕಬ್ಬು', icon: '🎋', value: 'Sugarcane' },
    { name: locale === 'en' ? 'Tomato' : 'ಟೊಮಾಟೊ', icon: '🍅', value: 'Tomato' },
  ]


  return (
    <div className="app-shell">
      <header className="hero" id="home">
        <nav className="primary-nav">
          <div className="logo-mark">AgriSense</div>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="language-switcher">
            <label htmlFor="language-select">{t.languageSwitcher}</label>
            <select
              id="language-select"
              value={locale}
              onChange={handleLanguageChange}
            >
              {languageOptions.map(([code, value]) => (
                <option key={code} value={code}>
                  {value.languageName}
                </option>
              ))}
            </select>
          </div>
          <div className="nav-actions">
            <button
              type="button"
              className="tutorial-button"
              onClick={startTutorial}
              title={locale === 'en' ? 'Start tutorial' : 'ಟ್ಯುಟೋರಿಯಲ್ ಪ್ರಾರಂಭಿಸಿ'}
            >
              📖 {locale === 'en' ? 'Tutorial' : 'ಮಾರ್ಗದರ್ಶಿ'}
            </button>
            <button
              type="button"
              className="cheat-sheet-button"
              onClick={downloadCheatSheet}
              title={locale === 'en' ? 'Download guide' : 'ಮಾರ್ಗದರ್ಶಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ'}
            >
              📄 {locale === 'en' ? 'Guide' : 'ಮಾರ್ಗದರ್ಶಿ'}
            </button>
            <a className="cta" href="#login">
              Launch Console
            </a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="lead">{hero.lead}</p>
          <div className="hero-actions">
            <a href="#detection" className="primary">
              {hero.primaryCta}
            </a>
            <a href="#analytics" className="secondary">
              {hero.secondaryCta}
            </a>
            {renderAudioButton(
              'hero',
              'Listen to this intro',
              'ಈ ಪರಿಚಯ ಕೇಳಿ'
            )}
          </div>
          <div className="system-goals">
            {hero.goals.map((goal) => (
              <span key={goal}>• {goal}</span>
            ))}
          </div>
      </div>
      </header>

      <main>
        <section className="grid-cards" aria-label="System Modules">
          {moduleHighlights.map((module, index) => {
            const moduleIcons = ['🌿', '🧪', '📈', '👤']
            return (
              <article key={module.title} className="card module-card">
                <span className="module-icon">{moduleIcons[index] || '📋'}</span>
                <span className="badge">{module.badge}</span>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </article>
            )
          })}
        </section>

        <section id="detection" className="split-section">
          <div className="split-left">
            <p className="eyebrow">{detectionCopy.eyebrow}</p>
            <h2>{detectionCopy.title}</h2>
            <p>{detectionCopy.description}</p>
            <ul className="feature-list">
              {detectionCopy.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            {renderAudioButton('detection', 'Hear detection steps', 'ರೋಗ ಸೂಚನೆ ಕೇಳಿ')}
      </div>
          <div className="split-right">
            <div className="panel">
              <label className="upload-label">
                {detectionCopy.uploadLabel}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              {uploadedImage && (
                <p className="filename">File: {uploadedImage}</p>
              )}
              {diseaseResult ? (
                <div className="result-card">
                  <p className="result-title">🌿 {diseaseResult.name}</p>
                  <p className="confidence">
                    {locale === 'en' ? 'Confidence' : 'ವಿಶ್ವಾಸ'}: {diseaseResult.confidence}%
                  </p>
                  <p>{diseaseResult.description}</p>
                  <button
                    type="button"
                    className="whatsapp-share"
                    onClick={() => shareToWhatsApp(
                      `${locale === 'en' ? 'Disease' : 'ರೋಗ'}: ${diseaseResult.name}\n${locale === 'en' ? 'Confidence' : 'ವಿಶ್ವಾಸ'}: ${diseaseResult.confidence}%\n\n${diseaseResult.description}`,
                      'disease'
                    )}
                  >
                    📱 {locale === 'en' ? 'Share on WhatsApp' : 'WhatsApp ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ'}
                  </button>
                </div>
              ) : (
                <p className="placeholder">{detectionCopy.placeholder}</p>
              )}
            </div>
          </div>
        </section>

        <section id="fertilizer" className="form-section">
          <div>
            <p className="eyebrow">{fertilizerCopy.eyebrow}</p>
            <h2>{fertilizerCopy.title}</h2>
            <p>{fertilizerCopy.description}</p>
            {renderAudioButton(
              'fertilizer',
              'Listen to fertilizer guide',
              'ರಸಗೊಬ್ಬರ ಸೂಚನೆ ಕೇಳಿ'
            )}
          </div>
          <form className="panel form-grid" onSubmit={handleFertilizerSubmit}>
            {fertilizerFields.map((field) => {
              const config = fertilizerFieldConfig[field]
              const phStatus = field === 'ph' ? getPhStatus(fertilizerForm.ph) : null
              const moistureStatus = field === 'moisture' ? getMoistureStatus(fertilizerForm.moisture) : null
              return (
                <div key={field} className="slider-field">
                  <label className="slider-label">
                    <span className="field-icon">{config.icon}</span>
                    <span className="field-name">{fertilizerCopy.fields[field]}</span>
                    {phStatus && (
                      <span className="status-badge" style={{ color: phStatus.color }}>
                        {phStatus.label}
                      </span>
                    )}
                    {moistureStatus && (
                      <span className="status-badge" style={{ color: moistureStatus.color }}>
                        {moistureStatus.label}
                      </span>
                    )}
                  </label>
                  <div className="slider-container">
                    <input
                      type="range"
                      min={config.min}
                      max={config.max}
                      step={config.step}
                      value={fertilizerForm[field] || config.min}
                      onChange={(e) => handleSliderChange(field, e.target.value)}
                      className="slider-input"
                    />
                    <div className="slider-value-display">
                      <input
                        type="number"
                        min={config.min}
                        max={config.max}
                        step={config.step}
                        name={field}
                        value={fertilizerForm[field] || ''}
                        onChange={handleFertilizerChange}
                        className="number-input"
                        placeholder={`${config.min}-${config.max}`}
                      />
                      <span className="unit">{config.unit}</span>
                    </div>
                    {field === 'ph' && (
                      <div className="ph-scale">
                        <span className="scale-label" style={{ color: '#e63946' }}>4</span>
                        <span className="scale-label" style={{ color: '#008f57' }}>7</span>
                        <span className="scale-label" style={{ color: '#457b9d' }}>9</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            <button type="submit" className="primary">
              {fertilizerCopy.submit}
            </button>
            {fertilizerSuggestion && (
              <div className="result">
                <p>{fertilizerSuggestion}</p>
                <button
                  type="button"
                  className="whatsapp-share"
                  onClick={() => shareToWhatsApp(
                    `${locale === 'en' ? 'Fertilizer Recommendation' : 'ರಸಗೊಬ್ಬರ ಸಲಹೆ'}:\n\n${fertilizerSuggestion}`,
                    'fertilizer'
                  )}
                >
                  📱 {locale === 'en' ? 'Share on WhatsApp' : 'WhatsApp ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ'}
                </button>
              </div>
            )}
          </form>
        </section>

        <section id="analytics" className="analytics-section">
          <div className="analytics-headline">
            <p className="eyebrow">{analyticsCopy.eyebrow}</p>
            <h2>{analyticsCopy.title}</h2>
            <p>{analyticsCopy.description}</p>
            {renderAudioButton(
              'analytics',
              'Explain this dashboard',
              'ಈ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ವಿವರ ಕೇಳಿ'
            )}
          </div>
          <div className="analytics-body">
            <form className="panel forecast-form" onSubmit={handleForecastSubmit}>
              <div className="crop-selection">
                <label className="section-label">
                  🌾 {analyticsCopy.form.crop}
                </label>
                <div className="crop-grid">
                  {commonCrops.map((crop) => (
                    <button
                      key={crop.value}
                      type="button"
                      className={`crop-card ${forecastForm.crop === crop.value ? 'selected' : ''}`}
                      onClick={() => setForecastForm((prev) => ({ ...prev, crop: crop.value }))}
                    >
                      <span className="crop-icon">{crop.icon}</span>
                      <span className="crop-name">{crop.name}</span>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  name="crop"
                  value={forecastForm.crop}
                  onChange={handleForecastChange}
                  placeholder={locale === 'en' ? 'Or type your crop name' : 'ಅಥವಾ ನಿಮ್ಮ ಬೆಳೆ ಹೆಸರು ನಮೂದಿಸಿ'}
                  className="crop-input-fallback"
                />
              </div>
              <div className="slider-field">
                <label className="slider-label">
                  <span className="field-icon">📏</span>
                  <span className="field-name">{analyticsCopy.form.acreage}</span>
                </label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="0.5"
                    max="100"
                    step="0.5"
                    value={forecastForm.acreage || '1'}
                    onChange={(e) => setForecastForm((prev) => ({ ...prev, acreage: e.target.value }))}
                    className="slider-input"
                  />
                  <div className="slider-value-display">
                    <input
                      type="number"
                      min="0.5"
                      max="100"
                      step="0.5"
                      name="acreage"
                      value={forecastForm.acreage || ''}
                      onChange={handleForecastChange}
                      className="number-input"
                      placeholder="0.5-100"
                    />
                    <span className="unit">{locale === 'en' ? 'acres' : 'ಎಕರೆ'}</span>
                  </div>
                </div>
              </div>
              <div className="season-selection">
                <label className="section-label">
                  🌦️ {analyticsCopy.form.season}
                </label>
                <div className="season-grid">
                  {seasons.map((season) => (
                    <button
                      key={season}
                      type="button"
                      className={`season-card ${forecastForm.season === season ? 'selected' : ''}`}
                      onClick={() => setForecastForm((prev) => ({ ...prev, season }))}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="primary">
                {analyticsCopy.form.submit}
              </button>
              {forecastInsight && (
                <div className="result">
                  <p>{forecastInsight}</p>
                  <button
                    type="button"
                    className="whatsapp-share"
                    onClick={() => shareToWhatsApp(
                      `${locale === 'en' ? 'Yield Forecast' : 'ಉತ್ಪಾದನೆ ಭವಿಷ್ಯ'}:\n\n${forecastInsight}`,
                      'forecast'
                    )}
                  >
                    📱 {locale === 'en' ? 'Share on WhatsApp' : 'WhatsApp ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ'}
                  </button>
                </div>
              )}
            </form>
            <div className="panel insight-panel">
              <h3>{analyticsCopy.insightsTitle}</h3>
              <ul>
                {analyticsCopy.insights.map((insight) => (
                  <li key={insight}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="user-management" id="login">
          <div>
            <p className="eyebrow">{userCopy.eyebrow}</p>
            <h2>{userCopy.title}</h2>
            <p>{userCopy.description}</p>
          </div>
          <div className="panel auth-panel">
            <div>
              <h3>{userCopy.signup}</h3>
              <input type="text" placeholder={userCopy.placeholders.name} />
              <input type="email" placeholder={userCopy.placeholders.email} />
              <input type="password" placeholder={userCopy.placeholders.password} />
              <button className="primary" type="button">
                {userCopy.signupButton}
              </button>
            </div>
            <div>
              <h3>{userCopy.login}</h3>
              <input type="email" placeholder={userCopy.placeholders.email} />
              <input type="password" placeholder={userCopy.placeholders.password} />
              <button className="secondary" type="button">
                {userCopy.loginButton}
              </button>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div>
            <p className="eyebrow">{contactCopy.eyebrow}</p>
            <h2>{contactCopy.title}</h2>
            <p>{contactCopy.description}</p>
            {renderAudioButton(
              'contact',
              'Hear how to contact us',
              'ಸಂಪರ್ಕಿಸುವ ವಿಧಾನ ಕೇಳಿ'
            )}
          </div>
          <form className="panel contact-grid" onSubmit={handleContactSubmit}>
            <label>
              {contactCopy.fields.name}
              <input
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder={contactCopy.fields.name.replace('*', '')}
              />
            </label>
            <label>
              {contactCopy.fields.email}
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder={contactCopy.fields.email.replace('*', '')}
              />
            </label>
            <label>
              {contactCopy.fields.org}
              <input
                name="company"
                value={contactForm.company}
                onChange={handleContactChange}
                placeholder={contactCopy.fields.org}
              />
            </label>
            <label className="contact-message">
              {contactCopy.fields.message}
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                rows={4}
                placeholder={contactCopy.placeholder}
              />
            </label>
            <button type="submit" className="primary">
              {contactCopy.submit}
            </button>
            {contactStatus && <p className="contact-status">{contactStatus}</p>}
          </form>
        </section>
      </main>

      {showTutorial && (
        <div className="tutorial-overlay">
          <div className="tutorial-modal">
            <div className="tutorial-header">
              <span className="tutorial-icon">{tutorialSteps[tutorialStep].icon}</span>
              <h3>{tutorialSteps[tutorialStep].title}</h3>
              <button
                type="button"
                className="tutorial-close"
                onClick={skipTutorial}
                aria-label={locale === 'en' ? 'Close tutorial' : 'ಟ್ಯುಟೋರಿಯಲ್ ಮುಚ್ಚಿ'}
              >
                ×
              </button>
            </div>
            <p className="tutorial-content">{tutorialSteps[tutorialStep].content}</p>
            <div className="tutorial-progress">
              <span>
                {tutorialStep + 1} / {tutorialSteps.length}
              </span>
            </div>
            <div className="tutorial-actions">
              <button type="button" className="secondary" onClick={skipTutorial}>
                {locale === 'en' ? 'Skip' : 'ಬಿಟ್ಟುಬಿಡಿ'}
              </button>
              <button type="button" className="primary" onClick={nextTutorialStep}>
                {tutorialStep < tutorialSteps.length - 1
                  ? locale === 'en'
                    ? 'Next'
                    : 'ಮುಂದೆ'
                  : locale === 'en'
                    ? 'Finish'
                    : 'ಮುಗಿಸಿ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
