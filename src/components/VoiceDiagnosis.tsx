import { useState, useEffect, useRef, useCallback } from 'react'
import './VoiceDiagnosis.css'

interface VoiceDiagnosisProps {
  locale: string
  t: any
}

export default function VoiceDiagnosis({ locale, t }: VoiceDiagnosisProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [detectedLanguage, setDetectedLanguage] = useState<string>('en')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string>('')
  const recognitionRef = useRef<any>(null)

  // Language detection patterns
  const detectLanguage = useCallback((text: string): string => {
    const lowerText = text.toLowerCase()
    
    // Kannada patterns (common words)
    const kannadaPatterns = ['ನನ್ನ', 'ಸಸ್ಯ', 'ಎಲೆ', 'ರೋಗ', 'ಹಳದಿ', 'ಬಿಳಿ', 'ಕಂದು', 'ಬಾಡುತ್ತ', 'ಮಣ್ಣು', 'ರಸಗೊಬ್ಬರ']
    if (kannadaPatterns.some(pattern => lowerText.includes(pattern))) {
      return 'kn'
    }
    
    // Hindi patterns
    const hindiPatterns = ['मेरे', 'पौधे', 'पत्तियां', 'पीली', 'सफेद', 'धब्बे', 'मुरझा', 'भूरी', 'मिट्टी', 'उर्वरक']
    if (hindiPatterns.some(pattern => lowerText.includes(pattern))) {
      return 'hi'
    }
    
    // Telugu patterns
    const teluguPatterns = ['నా', 'మొక్క', 'ఆకులు', 'పసుపు', 'తెలుపు', 'మచ్చలు', 'వాడిపోతున్న', 'నేల', 'ఎరువు']
    if (teluguPatterns.some(pattern => lowerText.includes(pattern))) {
      return 'te'
    }
    
    // Tamil patterns
    const tamilPatterns = ['என்', 'தாவரம்', 'இலைகள்', 'மஞ்சள்', 'வெள்ளை', 'புள்ளிகள்', 'வாடுகிறது', 'மண்', 'உரம்']
    if (tamilPatterns.some(pattern => lowerText.includes(pattern))) {
      return 'ta'
    }
    
    // Marathi patterns
    const marathiPatterns = ['माझे', 'झाड', 'पाने', 'पिवळा', 'पांढरा', 'ठिपके', 'कुंचत', 'माती', 'खत']
    if (marathiPatterns.some(pattern => lowerText.includes(pattern))) {
      return 'mr'
    }
    
    // Default to English
    return 'en'
  }, [])

  // Get speech recognition language code based on locale
  const getSpeechLang = useCallback((currentLocale: string): string => {
    const langMap: Record<string, string> = {
      'en': 'en-IN',
      'kn': 'kn-IN',
      'hi': 'hi-IN',
      'te': 'te-IN',
      'ta': 'ta-IN',
      'mr': 'mr-IN'
    }
    return langMap[currentLocale] || 'en-IN'
  }, [])

  // Process symptoms function - defined before useEffect that uses it
  const processSymptoms = useCallback((text: string, lang: string = 'en') => {
    setIsProcessing(true)
    
    // Simulate symptom matching
    setTimeout(() => {
      const lowerText = text.toLowerCase()
      const mockSuggestions: string[] = []

      // Check for yellow/yellowing symptoms in multiple languages
      const yellowKeywords = {
        en: ['yellow', 'yellowing', 'pale'],
        kn: ['ಹಳದಿ', 'ಹಳದಿಯಾಗುತ್ತ', 'ನಿಷ್ಪ್ರಭ'],
        hi: ['पीली', 'पीला', 'पीले', 'पीलापन'],
        te: ['పసుపు', 'పసుపురంగు'],
        ta: ['மஞ்சள்', 'மஞ்சளாகிறது'],
        mr: ['पिवळा', 'पिवळे', 'पिवळसर']
      }

      const hasYellowSymptom = Object.values(yellowKeywords).some(keywords => 
        keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))
      )

      if (hasYellowSymptom) {
        const responses = {
          en: 'Possible Nitrogen Deficiency - Apply organic compost or urea (40 kg/acre)',
          kn: 'ಸಾಧ್ಯತೆ ನೈಟ್ರೋಜನ್ ಕೊರತೆ - ಸಾವಯವ ಕಂಪೋಸ್ಟ್ ಅಥವಾ ಯುರಿಯಾ (40 ಕೆಜಿ/ಎಕರೆ) ಬಳಸಿ',
          hi: 'संभावित नाइट्रोजन की कमी - जैविक खाद या यूरिया (40 किग्रा/एकड़) लगाएं',
          te: 'సాధ్యత నైట్రోజన్ లోపం - సేంద్రియ కంపోస్ట్ లేదా యూరియా (40 కిలోలు/ఎకరా) వర్తింపజేయండి',
          ta: 'சாத்தியமான நைட்ரஜன் குறைபாடு - கரிம உரம் அல்லது யூரியா (40 கிலோ/ஏக்கர்) பயன்படுத்தவும்',
          mr: 'शक्य नायट्रोजनची कमतरता - सेंद्रिय कंपोस्ट किंवा युरिया (40 किग्रा/एकर) लावा'
        }
        mockSuggestions.push(responses[lang as keyof typeof responses] || responses.en)
      }

      // Check for white spots symptoms
      const whiteSpotKeywords = {
        en: ['white spot', 'white spots', 'powdery'],
        kn: ['ಬಿಳಿ ಚುಕ್ಕೆ', 'ಬಿಳಿ ಚುಕ್ಕೆಗಳು', 'ಪೌಡರಿ'],
        hi: ['सफेद धब्बे', 'सफेद धब्बा', 'पाउडर'],
        te: ['తెలుపు మచ్చలు', 'తెలుపు మచ్చ'],
        ta: ['வெள்ளை புள்ளிகள்', 'வெள்ளை புள்ளி'],
        mr: ['पांढरे ठिपके', 'पांढरा ठिपका']
      }

      const hasWhiteSpotSymptom = Object.values(whiteSpotKeywords).some(keywords => 
        keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))
      )

      if (hasWhiteSpotSymptom) {
        const responses = {
          en: 'Possible Powdery Mildew - Apply neem oil spray (2ml per liter of water)',
          kn: 'ಸಾಧ್ಯತೆ ಪೌಡರಿ ಮಿಲ್ಡ್ಯೂ - ನೀಂ ಎಣ್ಣೆ ಸ್ಪ್ರೇ (2ml ಪ್ರತಿ ಲೀಟರ್ ನೀರು) ಬಳಸಿ',
          hi: 'संभावित पाउडर मिल्ड्यू - नीम तेल स्प्रे (2ml प्रति लीटर पानी) लगाएं',
          te: 'సాధ్యత పౌడరీ మిల్డ్యూ - వేప నూనె స్ప్రే (2ml ప్రతి లీటరు నీరు) వర్తింపజేయండి',
          ta: 'சாத்தியமான பவுடரி மில்டியூ - வேப்ப எண்ணெய் தெளிப்பு (2ml ஒரு லிட்டர் நீருக்கு) பயன்படுத்தவும்',
          mr: 'शक्य पावडर मिल्ड्यू - कडुनिंब तेल स्प्रे (2ml प्रति लीटर पाणी) लावा'
        }
        mockSuggestions.push(responses[lang as keyof typeof responses] || responses.en)
      }

      // Check for brown/wilting symptoms
      const brownKeywords = {
        en: ['brown', 'wilting', 'wilted', 'dying'],
        kn: ['ಕಂದು', 'ಬಾಡುತ್ತ', 'ಬಾಡಿದ', 'ಸಾಯುತ್ತ'],
        hi: ['भूरी', 'मुरझा', 'सूख', 'मर'],
        te: ['గోధుమ', 'వాడిపోతున్న', 'ఎండిపోతున్న'],
        ta: ['பழுப்பு', 'வாடுகிறது', 'உலர்ந்து'],
        mr: ['तपकिरी', 'कुंचत', 'कोरडे']
      }

      const hasBrownSymptom = Object.values(brownKeywords).some(keywords => 
        keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))
      )

      if (hasBrownSymptom) {
        const responses = {
          en: 'Possible Fungal Infection - Improve drainage and apply organic fungicide like neem oil',
          kn: 'ಸಾಧ್ಯತೆ ಫಂಗಲ್ ಸೋಂಕು - ಡ್ರೈನೇಜ್ ಸುಧಾರಿಸಿ ಮತ್ತು ನೀಂ ಎಣ್ಣೆ ನಂತಹ ಸಾವಯವ ಫಂಗಿಸೈಡ್ ಬಳಸಿ',
          hi: 'संभावित फंगल संक्रमण - जल निकासी सुधारें और नीम तेल जैसे जैविक कवकनाशी लगाएं',
          te: 'సాధ్యత ఫంగల్ ఇన్ఫెక్షన్ - డ్రైనేజ్ మెరుగుపరచండి మరియు వేప నూనె వంటి సేంద్రియ ఫంగిసైడ్ వర్తింపజేయండి',
          ta: 'சாத்தியமான பூஞ்சை தொற்று - வடிகால் மேம்படுத்தி வேப்ப எண்ணெய் போன்ற கரிம பூஞ்சைக்கொல்லி பயன்படுத்தவும்',
          mr: 'शक्य फंगल संक्रमण - जलनिकासी सुधारा आणि कडुनिंब तेल सारख्या सेंद्रिय फंगिसायड लावा'
        }
        mockSuggestions.push(responses[lang as keyof typeof responses] || responses.en)
      }

      if (mockSuggestions.length === 0) {
        const responses = {
          en: 'Please describe symptoms in more detail or upload an image for better diagnosis. You can mention: leaf color, spots, wilting, or any visible changes.',
          kn: 'ದಯವಿಟ್ಟು ರೋಗಲಕ್ಷಣಗಳನ್ನು ಹೆಚ್ಚು ವಿವರವಾಗಿ ವಿವರಿಸಿ ಅಥವಾ ಉತ್ತಮ ರೋಗನಿರ್ಣಯಕ್ಕಾಗಿ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ. ನೀವು ಉಲ್ಲೇಖಿಸಬಹುದು: ಎಲೆ ಬಣ್ಣ, ಚುಕ್ಕೆಗಳು, ಬಾಡುವಿಕೆ, ಅಥವಾ ಯಾವುದೇ ಗೋಚರ ಬದಲಾವಣೆಗಳು.',
          hi: 'कृपया लक्षणों को अधिक विस्तार से वर्णन करें या बेहतर निदान के लिए एक छवि अपलोड करें। आप उल्लेख कर सकते हैं: पत्ती का रंग, धब्बे, मुरझाना, या कोई दृश्यमान परिवर्तन।',
          te: 'దయచేసి లక్షణాలను మరింత వివరంగా వివరించండి లేదా మంచి రోగనిర్ణయం కోసం చిత్రాన్ని అప్లోడ్ చేయండి. మీరు ప్రస్తావించవచ్చు: ఆకు రంగు, మచ్చలు, వాడిపోవడం, లేదా ఏదైనా కనిపించే మార్పులు.',
          ta: 'தயவுசெய்து அறிகுறிகளை மேலும் விரிவாக விவரிக்கவும் அல்லது சிறந்த நோயறிதலுக்கு ஒரு படத்தை பதிவேற்றவும். நீங்கள் குறிப்பிடலாம்: இலை நிறம், புள்ளிகள், வாடுதல், அல்லது எந்தவொரு தெரியும் மாற்றங்கள்.',
          mr: 'कृपया लक्षणांचे अधिक तपशीलवार वर्णन करा किंवा चांगल्या निदानासाठी प्रतिमा अपलोड करा. आपण उल्लेख करू शकता: पानाचा रंग, ठिपके, कुंचणे, किंवा कोणतेही दृश्यमान बदल.'
        }
        mockSuggestions.push(responses[lang as keyof typeof responses] || responses.en)
      }

      setSuggestions(mockSuggestions)
      setIsProcessing(false)
    }, 1500)
  }, [])

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in your browser. Please use Chrome or Edge.')
      return
    }

    // Clean up previous recognition if it exists
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch {
        // Ignore errors when stopping
      }
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    // Try to set language, but fallback to English if not supported
    try {
      const langCode = getSpeechLang(locale)
      recognition.lang = langCode
      console.log('Speech recognition language set to:', langCode)
    } catch (e) {
      console.warn('Failed to set language, using default:', e)
      recognition.lang = 'en-IN' // Fallback to English
    }

    recognition.onstart = () => {
      setIsListening(true)
      setError('')
      console.log('Speech recognition started')
    }

    recognition.onresult = (event: any) => {
      try {
        const transcript = event.results[0][0].transcript
        console.log('Transcript received:', transcript)
        const detectedLang = detectLanguage(transcript)
        setDetectedLanguage(detectedLang)
        setTranscript(transcript)
        processSymptoms(transcript, detectedLang)
      } catch (err) {
        console.error('Error processing result:', err)
        setError('Error processing speech. Please try again.')
      }
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
      
      if (event.error === 'no-speech') {
        setError('No speech detected. Please try again.')
      } else if (event.error === 'audio-capture') {
        setError('No microphone found. Please check your microphone settings.')
      } else if (event.error === 'not-allowed') {
        setError('Microphone permission denied. Please allow microphone access and try again.')
      } else {
        setError(`Speech recognition error: ${event.error}. Please try again.`)
      }
    }

    recognition.onend = () => {
      setIsListening(false)
      console.log('Speech recognition ended')
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch {
          // Ignore cleanup errors
        }
      }
    }
  }, [locale, detectLanguage, getSpeechLang, processSymptoms])

  const startListening = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition not initialized. Please refresh the page.')
      console.error('Recognition ref is null')
      return
    }

    try {
      // Clear previous results
      setTranscript('')
      setSuggestions([])
      setError('')
      setDetectedLanguage('en')
      setIsProcessing(false)
      
      // Stop any existing recognition first
      try {
        recognitionRef.current.stop()
      } catch {
        // Ignore if not running
      }
      
      // Small delay to ensure previous recognition is fully stopped
      setTimeout(() => {
        try {
          recognitionRef.current.start()
          console.log('Starting speech recognition...', {
            lang: recognitionRef.current.lang,
            continuous: recognitionRef.current.continuous
          })
        } catch (startErr: any) {
          console.error('Error starting recognition:', startErr)
          setError(`Failed to start recording: ${startErr.message || 'Unknown error'}. Please check microphone permissions.`)
        }
      }, 100)
    } catch (err: any) {
      console.error('Error in startListening:', err)
      setError(`Error starting speech recognition: ${err.message || 'Unknown error'}. Please try again.`)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
        console.log('Stopping speech recognition...')
      } catch (err) {
        console.error('Error stopping recognition:', err)
      }
    }
  }

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  const isSupported = !!SpeechRecognition

  return (
    <div className="voice-diagnosis-container">
      <div className="voice-diagnosis-header">
        <h1>🎤 {t.voiceDiagnosis?.title || 'Voice-Based Crop Diagnosis'}</h1>
        <p>{t.voiceDiagnosis?.description || 'Speak your crop symptoms and get instant suggestions'}</p>
      </div>

      {!isSupported && (
        <div className="error-message">
          <p>{t.voiceDiagnosis?.notSupported || 'Voice recognition is not supported in your browser. Please use Chrome or Edge.'}</p>
        </div>
      )}

      {isSupported && (
        <div className="voice-diagnosis-content">
          <div style={{ 
            marginBottom: '1.5rem', 
            padding: '1rem', 
            background: '#e3f2fd', 
            border: '1px solid #90caf9', 
            borderRadius: '0.5rem',
            fontSize: '0.9rem'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: '#1565c0' }}>
              💡 {locale === 'en' ? 'Tips:' : locale === 'kn' ? 'ಸಲಹೆಗಳು:' : locale === 'hi' ? 'सुझाव:' : 'Tips'}
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#1976d2' }}>
              <li>{locale === 'en' ? 'Allow microphone access when prompted' : locale === 'kn' ? 'ಪ್ರಾಂಪ್ಟ್ ಮಾಡಿದಾಗ ಮೈಕ್ರೋಫೋನ್ ಪ್ರವೇಶವನ್ನು ಅನುಮತಿಸಿ' : locale === 'hi' ? 'संकेत देने पर माइक्रोफोन एक्सेस की अनुमति दें' : 'Allow microphone access'}</li>
              <li>{locale === 'en' ? 'Speak clearly in any supported language (English, Kannada, Hindi, Telugu, Tamil, Marathi)' : locale === 'kn' ? 'ಯಾವುದೇ ಬೆಂಬಲಿತ ಭಾಷೆಯಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ (ಇಂಗ್ಲಿಷ್, ಕನ್ನಡ, ಹಿಂದಿ, ತೆಲುಗು, ತಮಿಳು, ಮರಾಠಿ)' : locale === 'hi' ? 'किसी भी समर्थित भाषा में स्पष्ट रूप से बोलें (अंग्रेजी, कन्नड़, हिंदी, तेलुगू, तमिल, मराठी)' : 'Speak clearly'}</li>
              <li>{locale === 'en' ? 'The system will automatically detect your language and respond accordingly' : locale === 'kn' ? 'ಸಿಸ್ಟಮ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ಅದಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತದೆ' : locale === 'hi' ? 'सिस्टम स्वचालित रूप से आपकी भाषा का पता लगाएगा और तदनुसार जवाब देगा' : 'Auto language detection'}</li>
            </ul>
          </div>

          {error && (
            <div className="error-message" style={{ marginBottom: '1rem', padding: '1rem', background: '#fee', border: '1px solid #fcc', borderRadius: '0.5rem' }}>
              <p style={{ color: '#c33', margin: 0 }}>{error}</p>
            </div>
          )}
          
          <div className="voice-controls">
            {!isListening ? (
              <button className="start-button" onClick={startListening}>
                🎤 {t.voiceDiagnosis?.startRecording || 'Start Recording'}
              </button>
            ) : (
              <button className="stop-button" onClick={stopListening}>
                ⏹️ {t.voiceDiagnosis?.stopRecording || 'Stop Recording'}
              </button>
            )}
          </div>

          {isListening && (
            <div className="listening-indicator">
              <div className="pulse"></div>
              <p>{t.voiceDiagnosis?.listening || 'Listening...'}</p>
            </div>
          )}

          {transcript && (
            <div className="transcript">
              <h3>
                {detectedLanguage === 'en' ? 'You said:' 
                : detectedLanguage === 'kn' ? 'ನೀವು ಹೇಳಿದ್ದು:' 
                : detectedLanguage === 'hi' ? 'आपने कहा:'
                : detectedLanguage === 'te' ? 'మీరు చెప్పారు:'
                : detectedLanguage === 'ta' ? 'நீங்கள் சொன்னீர்கள்:'
                : detectedLanguage === 'mr' ? 'तुम्ही म्हणालात:'
                : 'Transcript'}
                <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: '0.5rem', fontWeight: 'normal' }}>
                  ({detectedLanguage === 'en' ? 'English' : detectedLanguage === 'kn' ? 'ಕನ್ನಡ' : detectedLanguage === 'hi' ? 'हिंदी' : detectedLanguage === 'te' ? 'తెలుగు' : detectedLanguage === 'ta' ? 'தமிழ்' : detectedLanguage === 'mr' ? 'मराठी' : 'Detected'})
                </span>
              </h3>
              <p>{transcript}</p>
            </div>
          )}

          {isProcessing && (
            <div className="processing">
              <div className="spinner"></div>
              <p>{t.voiceDiagnosis?.processing || 'Processing your symptoms...'}</p>
            </div>
          )}

          {suggestions.length > 0 && !isProcessing && (
            <div className="suggestions">
              <h3>
                {detectedLanguage === 'en' ? 'Suggestions' 
                : detectedLanguage === 'kn' ? 'ಸಲಹೆಗಳು' 
                : detectedLanguage === 'hi' ? 'सुझाव'
                : detectedLanguage === 'te' ? 'సూచనలు'
                : detectedLanguage === 'ta' ? 'பரிந்துரைகள்'
                : detectedLanguage === 'mr' ? 'सुझाव'
                : 'Suggestions'}
              </h3>
              <ul>
                {suggestions.map((suggestion, idx) => (
                  <li key={idx}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="example-phrases">
            <h4>{locale === 'en' ? 'Example phrases (speak in any language):' : locale === 'kn' ? 'ಉದಾಹರಣೆ ವಾಕ್ಯಗಳು (ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ):' : locale === 'hi' ? 'उदाहरण वाक्य (किसी भी भाषा में बोलें):' : 'Examples'}</h4>
            <div className="language-examples">
              <div className="example-group">
                <strong>English:</strong>
                <ul>
                  <li>My plant leaves are turning yellow</li>
                  <li>There are white spots on tomato leaves</li>
                  <li>The leaves are wilting and turning brown</li>
                </ul>
              </div>
              <div className="example-group">
                <strong>ಕನ್ನಡ:</strong>
                <ul>
                  <li>ನನ್ನ ಸಸ್ಯದ ಎಲೆಗಳು ಹಳದಿಯಾಗುತ್ತಿವೆ</li>
                  <li>ಟೊಮಾಟೊ ಎಲೆಗಳ ಮೇಲೆ ಬಿಳಿ ಚುಕ್ಕೆಗಳಿವೆ</li>
                  <li>ಎಲೆಗಳು ಬಾಡುತ್ತಿವೆ ಮತ್ತು ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತಿವೆ</li>
                </ul>
              </div>
              <div className="example-group">
                <strong>हिंदी:</strong>
                <ul>
                  <li>मेरे पौधे की पत्तियां पीली हो रही हैं</li>
                  <li>टमाटर की पत्तियों पर सफेद धब्बे हैं</li>
                  <li>पत्तियां मुरझा रही हैं और भूरी हो रही हैं</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

