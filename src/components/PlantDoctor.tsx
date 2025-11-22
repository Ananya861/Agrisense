import { useState, useRef } from 'react'
import './PlantDoctor.css'

interface PlantDoctorProps {
  locale: string
  t: any
}

export default function PlantDoctor({ locale, t }: PlantDoctorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [prediction, setPrediction] = useState<{
    name: string
    confidence: number
    explanation: string
    organicRemedies: string[]
    preventionTips: string[]
  } | null>(null)
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'bot', text: string }>>([])
  const [inputMessage, setInputMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setUploadedImage(imageUrl)
        analyzeImage(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async (_file: File) => {
    setIsAnalyzing(true)
    // Simulate API call
    setTimeout(() => {
      const mockDiseases = [
        {
          name: locale === 'en' ? 'Early Blight' : locale === 'kn' ? 'ಮುಂಚಿನ ಬ್ಲೈಟ್' : locale === 'hi' ? 'अर्ली ब्लाइट' : 'Early Blight',
          confidence: 92,
          explanation: locale === 'en' 
            ? 'Early blight is a fungal disease that causes dark spots on leaves. It spreads in warm, humid conditions.'
            : locale === 'kn'
            ? 'ಮುಂಚಿನ ಬ್ಲೈಟ್ ಒಂದು ಫಂಗಲ್ ರೋಗವಾಗಿದೆ. ಇದು ಎಲೆಗಳ ಮೇಲೆ ಕತ್ತಲೆ ಚುಕ್ಕೆಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.'
            : locale === 'hi'
            ? 'अर्ली ब्लाइट एक फंगल रोग है जो पत्तियों पर काले धब्बे पैदा करता है।'
            : 'Early blight is a fungal disease.',
          organicRemedies: [
            locale === 'en' ? 'Neem oil spray (2ml per liter)' : locale === 'kn' ? 'ನೀಂ ಎಣ್ಣೆ ಸ್ಪ್ರೇ (2ml ಪ್ರತಿ ಲೀಟರ್)' : locale === 'hi' ? 'नीम तेल स्प्रे (2ml प्रति लीटर)' : 'Neem oil spray',
            locale === 'en' ? 'Baking soda solution (1 tsp per liter)' : locale === 'kn' ? 'ಬೇಕಿಂಗ್ ಸೋಡಾ ದ್ರಾವಣ (1 tsp ಪ್ರತಿ ಲೀಟರ್)' : locale === 'hi' ? 'बेकिंग सोडा घोल (1 tsp प्रति लीटर)' : 'Baking soda solution',
            locale === 'en' ? 'Garlic extract spray' : locale === 'kn' ? 'ಬೆಳ್ಳುಳ್ಳಿ ಸಾರ ಸ್ಪ್ರೇ' : locale === 'hi' ? 'लहसुन अर्क स्प्रे' : 'Garlic extract'
          ],
          preventionTips: [
            locale === 'en' ? 'Water plants at the base, not on leaves' : locale === 'kn' ? 'ಎಲೆಗಳ ಮೇಲೆ ಅಲ್ಲ, ಬೇರಿನ ಬುಡದಲ್ಲಿ ನೀರು ಹಾಕಿ' : locale === 'hi' ? 'पत्तियों पर नहीं, जड़ के पास पानी दें' : 'Water at base',
            locale === 'en' ? 'Ensure proper spacing between plants' : locale === 'kn' ? 'ಸಸ್ಯಗಳ ನಡುವೆ ಸರಿಯಾದ ಅಂತರವನ್ನು ಖಚಿತಪಡಿಸಿ' : locale === 'hi' ? 'पौधों के बीच उचित दूरी रखें' : 'Proper spacing',
            locale === 'en' ? 'Remove infected leaves immediately' : locale === 'kn' ? 'ಸೋಂಕು ಹೊಂದಿದ ಎಲೆಗಳನ್ನು ತಕ್ಷಣ ತೆಗೆದುಹಾಕಿ' : locale === 'hi' ? 'संक्रमित पत्तियों को तुरंत हटाएं' : 'Remove infected leaves'
          ]
        }
      ]
      setPrediction(mockDiseases[0])
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return
    
    const userMessage = { role: 'user' as const, text: inputMessage }
    setChatMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = locale === 'en'
        ? `I understand you're asking about "${inputMessage}". Based on the image analysis, I recommend following the organic remedies and prevention tips shown above.`
        : locale === 'kn'
        ? `ನೀವು "${inputMessage}" ಬಗ್ಗೆ ಕೇಳುತ್ತಿದ್ದೀರಿ. ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆಯ ಆಧಾರದ ಮೇಲೆ, ಮೇಲೆ ತೋರಿಸಲಾದ ಸಾವಯವ ಚಿಕಿತ್ಸೆಗಳನ್ನು ಅನುಸರಿಸಲು ನಾನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ.`
        : locale === 'hi'
        ? `मैं समझ गया कि आप "${inputMessage}" के बारे में पूछ रहे हैं। छवि विश्लेषण के आधार पर, मैं ऊपर दिखाए गए जैविक उपचारों का पालन करने की सलाह देता हूं।`
        : 'I understand your question.'
      
      setChatMessages(prev => [...prev, { role: 'bot', text: botResponse }])
    }, 1000)
  }

  return (
    <div className="plant-doctor-container">
      <div className="plant-doctor-header">
        <h1>🌿 {t.plantDoctor?.title || 'Plant Doctor Chatbot'}</h1>
        <p>{t.plantDoctor?.description || 'AI Assistant for Farmers - Upload leaf image, get predictions, explanations, and organic remedies'}</p>
      </div>

      <div className="plant-doctor-content">
        <div className="image-upload-section">
          <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded leaf" className="uploaded-image" />
            ) : (
              <div className="upload-placeholder">
                <span className="upload-icon">📷</span>
                <p>{t.plantDoctor?.uploadImage || 'Click to upload leaf image'}</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />

          {isAnalyzing && (
            <div className="analyzing">
              <div className="spinner"></div>
              <p>{t.plantDoctor?.analyzing || 'Analyzing image...'}</p>
            </div>
          )}

          {prediction && !isAnalyzing && (
            <div className="prediction-result">
              <h3>{t.plantDoctor?.prediction || 'Prediction'}: {prediction.name}</h3>
              <p className="confidence">
                {t.plantDoctor?.confidence || 'Confidence'}: {prediction.confidence}%
              </p>
              
              <div className="explanation">
                <h4>{t.plantDoctor?.explanation || 'Explanation'}</h4>
                <p>{prediction.explanation}</p>
              </div>

              <div className="organic-remedies">
                <h4>{t.plantDoctor?.organicRemedies || 'Organic Remedies'}</h4>
                <ul>
                  {prediction.organicRemedies.map((remedy, idx) => (
                    <li key={idx}>{remedy}</li>
                  ))}
                </ul>
              </div>

              <div className="prevention-tips">
                <h4>{t.plantDoctor?.preventionTips || 'Prevention Tips'}</h4>
                <ol>
                  {prediction.preventionTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>

        <div className="chat-section">
          <div className="chat-messages">
            {chatMessages.length === 0 && (
              <div className="chat-placeholder">
                <p>{t.plantDoctor?.chatPlaceholder || 'Ask questions about plant diseases, treatments, or farming tips...'}</p>
              </div>
            )}
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.role}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t.plantDoctor?.chatPlaceholder || 'Type your question...'}
            />
            <button onClick={handleSendMessage}>
              {t.plantDoctor?.sendMessage || 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

