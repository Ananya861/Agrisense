import { useState, useRef, useEffect } from 'react'
import './NutrientScanner.css'

interface NutrientScannerProps {
  locale: string
  t: any
}

export default function NutrientScanner({ locale, t }: NutrientScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<{
    deficiency: string
    color: string
    recommendations: string[]
  } | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsScanning(true)
      }
    } catch (error) {
      alert(locale === 'en' ? 'Camera access denied' : locale === 'kn' ? 'ಕ್ಯಾಮೆರಾ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ' : locale === 'hi' ? 'कैमरा एक्सेस अस्वीकृत' : 'Camera denied')
    }
  }

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }

  const captureAndAnalyze = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx?.drawImage(video, 0, 0)

    // Analyze dominant color
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
    if (!imageData) return

    const pixels = imageData.data
    let r = 0, g = 0, b = 0, count = 0

    // Sample pixels (every 10th pixel for performance)
    for (let i = 0; i < pixels.length; i += 40) {
      r += pixels[i]
      g += pixels[i + 1]
      b += pixels[i + 2]
      count++
    }

    const avgR = r / count
    const avgG = g / count
    const avgB = b / count

    // Simple color-based detection
    let deficiency = ''
    let recommendations: string[] = []

    // Yellowing (low green, high red/yellow) - Nitrogen deficiency
    if (avgG < avgR && avgR > 150 && avgG < 150) {
      deficiency = locale === 'en' ? 'Nitrogen Deficiency' : locale === 'kn' ? 'ನೈಟ್ರೋಜನ್ ಕೊರತೆ' : locale === 'hi' ? 'नाइट्रोजन की कमी' : 'Nitrogen Deficiency'
      recommendations = [
        locale === 'en' ? 'Apply urea (40 kg/acre) or organic compost' : locale === 'kn' ? 'ಯುರಿಯಾ (40 ಕೆಜಿ/ಎಕರೆ) ಅಥವಾ ಸಾವಯವ ಕಂಪೋಸ್ಟ್ ಅನ್ವಯಿಸಿ' : locale === 'hi' ? 'यूरिया (40 किग्रा/एकड़) या जैविक खाद लगाएं' : 'Apply urea',
        locale === 'en' ? 'Use leguminous cover crops' : locale === 'kn' ? 'ಲೆಗ್ಯುಮಿನಸ್ ಕವರ್ ಬೆಳೆಗಳನ್ನು ಬಳಸಿ' : locale === 'hi' ? 'दलहनी कवर फसलों का उपयोग करें' : 'Use leguminous crops'
      ]
    }
    // Purple/dark leaves - Phosphorus deficiency
    else if (avgB > avgR && avgR < 100) {
      deficiency = locale === 'en' ? 'Phosphorus Deficiency' : locale === 'kn' ? 'ಫಾಸ್ಫರಸ್ ಕೊರತೆ' : locale === 'hi' ? 'फॉस्फोरस की कमी' : 'Phosphorus Deficiency'
      recommendations = [
        locale === 'en' ? 'Apply superphosphate (30 kg/acre)' : locale === 'kn' ? 'ಸೂಪರ್‌ಫಾಸ್ಫೇಟ್ (30 ಕೆಜಿ/ಎಕರೆ) ಅನ್ವಯಿಸಿ' : locale === 'hi' ? 'सुपरफॉस्फेट (30 किग्रा/एकड़) लगाएं' : 'Apply superphosphate',
        locale === 'en' ? 'Improve soil pH if too acidic' : locale === 'kn' ? 'ಬಹಳ ಆಮ್ಲೀಯವಾಗಿದ್ದರೆ ಮಣ್ಣಿನ pH ಅನ್ನು ಸುಧಾರಿಸಿ' : locale === 'hi' ? 'यदि बहुत अम्लीय है तो मिट्टी का pH सुधारें' : 'Improve pH'
      ]
    }
    // Brown edges/yellowing - Potassium deficiency
    else if (avgR > 180 && avgG < 120 && avgB < 100) {
      deficiency = locale === 'en' ? 'Potassium Deficiency' : locale === 'kn' ? 'ಪೊಟ್ಯಾಸಿಯಮ್ ಕೊರತೆ' : locale === 'hi' ? 'पोटैशियम की कमी' : 'Potassium Deficiency'
      recommendations = [
        locale === 'en' ? 'Apply potash (25 kg/acre)' : locale === 'kn' ? 'ಪೊಟ್ಯಾಸ್ (25 ಕೆಜಿ/ಎಕರೆ) ಅನ್ವಯಿಸಿ' : locale === 'hi' ? 'पोटाश (25 किग्रा/एकड़) लगाएं' : 'Apply potash',
        locale === 'en' ? 'Use wood ash as organic source' : locale === 'kn' ? 'ಸಾವಯವ ಮೂಲವಾಗಿ ಮರದ ಬೂದಿಯನ್ನು ಬಳಸಿ' : locale === 'hi' ? 'जैविक स्रोत के रूप में लकड़ी की राख का उपयोग करें' : 'Use wood ash'
      ]
    }
    // Healthy green
    else {
      deficiency = locale === 'en' ? 'Healthy - No Deficiency Detected' : locale === 'kn' ? 'ಆರೋಗ್ಯಕರ - ಯಾವುದೇ ಕೊರತೆ ಪತ್ತೆಯಾಗಿಲ್ಲ' : locale === 'hi' ? 'स्वस्थ - कोई कमी नहीं मिली' : 'Healthy'
      recommendations = [
        locale === 'en' ? 'Continue regular monitoring' : locale === 'kn' ? 'ನಿಯಮಿತ ಮೇಲ್ವಿಚಾರಣೆಯನ್ನು ಮುಂದುವರಿಸಿ' : locale === 'hi' ? 'नियमित निगरानी जारी रखें' : 'Continue monitoring'
      ]
    }

    setScanResult({
      deficiency,
      color: `rgb(${Math.round(avgR)}, ${Math.round(avgG)}, ${Math.round(avgB)})`,
      recommendations
    })

    stopScanning()
  }

  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  return (
    <div className="nutrient-scanner-container">
      <div className="nutrient-scanner-header">
        <h1>📷 {t.nutrientScanner?.title || 'Nutrient Deficiency Scanner'}</h1>
        <p>{t.nutrientScanner?.description || 'Scan plant leaves using camera to detect nutrient deficiencies'}</p>
      </div>

      <div className="nutrient-scanner-content">
        <div className="camera-section">
          {!isScanning && !scanResult && (
            <div className="camera-placeholder">
              <span className="camera-icon">📷</span>
              <p>{t.nutrientScanner?.openCamera || 'Click to open camera'}</p>
              <button onClick={startScanning}>
                {t.nutrientScanner?.openCamera || 'Open Camera'}
              </button>
            </div>
          )}

          {isScanning && (
            <div className="camera-view">
              <video ref={videoRef} autoPlay playsInline className="camera-video"></video>
              <div className="camera-controls">
                <button onClick={captureAndAnalyze} className="capture-btn">
                  {t.nutrientScanner?.scanning || 'Capture & Analyze'}
                </button>
                <button onClick={stopScanning} className="cancel-btn">
                  {locale === 'en' ? 'Cancel' : locale === 'kn' ? 'ರದ್ದುಮಾಡಿ' : locale === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>

        {scanResult && (
          <div className="scan-result">
            <h3>{locale === 'en' ? 'Scan Result' : locale === 'kn' ? 'ಸ್ಕ್ಯಾನ್ ಫಲಿತಾಂಶ' : locale === 'hi' ? 'स्कैन परिणाम' : 'Result'}</h3>
            <div className="deficiency-info">
              <h4>{scanResult.deficiency}</h4>
              <div className="detected-color" style={{ background: scanResult.color }}></div>
            </div>

            <div className="recommendations">
              <h4>{t.nutrientScanner?.recommendations || 'Recommendations'}</h4>
              <ul>
                {scanResult.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>

            <button onClick={() => setScanResult(null)} className="scan-again-btn">
              {locale === 'en' ? 'Scan Again' : locale === 'kn' ? 'ಮತ್ತೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : locale === 'hi' ? 'फिर से स्कैन करें' : 'Scan Again'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


