import { useState } from 'react'
import './WeatherFertilizer.css'

interface WeatherFertilizerProps {
  locale: string
  t: any
}

export default function WeatherFertilizer({ locale, t }: WeatherFertilizerProps) {
  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState<{
    temperature: number
    rainfall: number
    humidity: number
  } | null>(null)
  const [soilData, setSoilData] = useState({
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
  })
  const [recommendation, setRecommendation] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getWeatherData = async () => {
    if (!location.trim()) {
      alert(locale === 'en' ? 'Please enter a location' : locale === 'kn' ? 'ದಯವಿಟ್ಟು ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ' : locale === 'hi' ? 'कृपया एक स्थान दर्ज करें' : 'Enter location')
      return
    }

    setLoading(true)
    // Simulate weather API call
    setTimeout(() => {
      setWeather({
        temperature: Math.floor(Math.random() * 15) + 25, // 25-40°C
        rainfall: Math.floor(Math.random() * 100), // 0-100mm
        humidity: Math.floor(Math.random() * 40) + 50, // 50-90%
      })
      setLoading(false)
    }, 1500)
  }

  const generateRecommendation = () => {
    if (!weather || !soilData.ph || !soilData.nitrogen) {
      alert(locale === 'en' ? 'Please get weather data and enter soil parameters' : locale === 'kn' ? 'ದಯವಿಟ್ಟು ಹವಾಮಾನ ಡೇಟಾ ಪಡೆಯಿರಿ ಮತ್ತು ಮಣ್ಣಿನ ನಿಯತಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ' : locale === 'hi' ? 'कृपया मौसम डेटा प्राप्त करें और मिट्टी के मापदंड दर्ज करें' : 'Enter all data')
      return
    }

    let rec = ''

    // Weather-based recommendations
    if (weather.rainfall > 70) {
      rec += (locale === 'en' 
        ? 'High rainfall detected. Recommend low-leaching fertilizers like slow-release NPK. '
        : locale === 'kn'
        ? 'ಹೆಚ್ಚಿನ ಮಳೆ ಪತ್ತೆಯಾಗಿದೆ. ನಿಧಾನ-ಬಿಡುಗಡೆ NPK ನಂತಹ ಕಡಿಮೆ-ಲೀಚಿಂಗ್ ರಸಗೊಬ್ಬರಗಳನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. '
        : locale === 'hi'
        ? 'उच्च वर्षा का पता चला। धीमी-रिलीज NPK जैसे कम-लीचिंग उर्वरकों की सिफारिश करें। '
        : 'High rainfall - use slow-release fertilizers. ')
    }

    if (weather.temperature > 35) {
      rec += (locale === 'en'
        ? 'High temperature. Apply fertilizers early morning or evening. '
        : locale === 'kn'
        ? 'ಉನ್ನತ ತಾಪಮಾನ. ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ರಸಗೊಬ್ಬರಗಳನ್ನು ಅನ್ವಯಿಸಿ. '
        : locale === 'hi'
        ? 'उच्च तापमान। सुबह या शाम को उर्वरक लगाएं। '
        : 'High temperature - apply in morning/evening. ')
    }

    if (weather.humidity > 75) {
      rec += (locale === 'en'
        ? 'High humidity increases fungal risk. Use organic fungicides. '
        : locale === 'kn'
        ? 'ಹೆಚ್ಚಿನ ತೇವಾಂಶ ಫಂಗಲ್ ಅಪಾಯವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ. ಸಾವಯವ ಫಂಗಿಸೈಡ್‌ಗಳನ್ನು ಬಳಸಿ. '
        : locale === 'hi'
        ? 'उच्च आर्द्रता फंगल जोखिम बढ़ाती है। जैविक कवकनाशी का उपयोग करें। '
        : 'High humidity - use organic fungicides. ')
    }

    // Soil-based recommendations
    const ph = parseFloat(soilData.ph)
    if (ph < 6) {
      rec += (locale === 'en'
        ? 'Acidic soil detected. Apply lime (2-3 kg per acre) before fertilizer. '
        : locale === 'kn'
        ? 'ಆಮ್ಲೀಯ ಮಣ್ಣು ಪತ್ತೆಯಾಗಿದೆ. ರಸಗೊಬ್ಬರದ ಮೊದಲು ಸುಣ್ಣ (2-3 ಕೆಜಿ ಪ್ರತಿ ಎಕರೆ) ಅನ್ವಯಿಸಿ. '
        : locale === 'hi'
        ? 'अम्लीय मिट्टी का पता चला। उर्वरक से पहले चूना (2-3 किग्रा प्रति एकड़) लगाएं। '
        : 'Acidic soil - apply lime first. ')
    }

    const nitrogen = parseFloat(soilData.nitrogen)
    if (nitrogen < 50) {
      rec += (locale === 'en'
        ? 'Low nitrogen. Apply 40 kg/acre of urea or organic compost. '
        : locale === 'kn'
        ? 'ಕಡಿಮೆ ನೈಟ್ರೋಜನ್. 40 ಕೆಜಿ/ಎಕರೆ ಯುರಿಯಾ ಅಥವಾ ಸಾವಯವ ಕಂಪೋಸ್ಟ್ ಅನ್ವಯಿಸಿ. '
        : locale === 'hi'
        ? 'कम नाइट्रोजन। 40 किग्रा/एकड़ यूरिया या जैविक खाद लगाएं। '
        : 'Low nitrogen - apply urea. ')
    }

    setRecommendation(rec || (locale === 'en' ? 'Soil conditions are optimal. Maintain current fertilizer schedule.' : locale === 'kn' ? 'ಮಣ್ಣಿನ ಪರಿಸ್ಥಿತಿಗಳು ಸೂಕ್ತವಾಗಿವೆ. ಪ್ರಸ್ತುತ ರಸಗೊಬ್ಬರ ವೇಳಾಪಟ್ಟಿಯನ್ನು ನಿರ್ವಹಿಸಿ.' : locale === 'hi' ? 'मिट्टी की स्थिति इष्टतम है। वर्तमान उर्वरक कार्यक्रम बनाए रखें।' : 'Optimal conditions'))
  }

  return (
    <div className="weather-fertilizer-container">
      <div className="weather-fertilizer-header">
        <h1>🌦️ {t.weatherFertilizer?.title || 'Auto Weather + Soil-Based Fertilizer'}</h1>
        <p>{t.weatherFertilizer?.description || 'Get dynamic fertilizer recommendations based on real-time weather and soil data'}</p>
      </div>

      <div className="weather-fertilizer-content">
        <div className="weather-section">
          <h2>{t.weatherFertilizer?.weatherBased || 'Weather Data'}</h2>
          <div className="location-input">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={t.weatherFertilizer?.location || 'Enter location (e.g., Bangalore, Karnataka)'}
            />
            <button onClick={getWeatherData} disabled={loading}>
              {loading ? 'Loading...' : t.weatherFertilizer?.getWeather || 'Get Weather'}
            </button>
          </div>

          {weather && (
            <div className="weather-display">
              <div className="weather-item">
                <span className="weather-icon">🌡️</span>
                <div>
                  <p className="weather-label">{t.weatherFertilizer?.temperature || 'Temperature'}</p>
                  <p className="weather-value">{weather.temperature}°C</p>
                </div>
              </div>
              <div className="weather-item">
                <span className="weather-icon">🌧️</span>
                <div>
                  <p className="weather-label">{t.weatherFertilizer?.rainfall || 'Rainfall'}</p>
                  <p className="weather-value">{weather.rainfall} mm</p>
                </div>
              </div>
              <div className="weather-item">
                <span className="weather-icon">💧</span>
                <div>
                  <p className="weather-label">{t.weatherFertilizer?.humidity || 'Humidity'}</p>
                  <p className="weather-value">{weather.humidity}%</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="soil-section">
          <h2>{t.weatherFertilizer?.soilInput || 'Soil Input'}</h2>
          <div className="soil-inputs">
            <label>
              pH
              <input
                type="number"
                min="4"
                max="9"
                step="0.1"
                value={soilData.ph}
                onChange={(e) => setSoilData({ ...soilData, ph: e.target.value })}
                placeholder="6.5"
              />
            </label>
            <label>
              {locale === 'en' ? 'Nitrogen (ppm)' : locale === 'kn' ? 'ನೈಟ್ರೋಜನ್ (ppm)' : locale === 'hi' ? 'नाइट्रोजन (ppm)' : 'N (ppm)'}
              <input
                type="number"
                min="0"
                max="200"
                value={soilData.nitrogen}
                onChange={(e) => setSoilData({ ...soilData, nitrogen: e.target.value })}
                placeholder="50"
              />
            </label>
            <label>
              {locale === 'en' ? 'Phosphorus (ppm)' : locale === 'kn' ? 'ಫಾಸ್ಫರಸ್ (ppm)' : locale === 'hi' ? 'फॉस्फोरस (ppm)' : 'P (ppm)'}
              <input
                type="number"
                min="0"
                max="200"
                value={soilData.phosphorus}
                onChange={(e) => setSoilData({ ...soilData, phosphorus: e.target.value })}
                placeholder="30"
              />
            </label>
            <label>
              {locale === 'en' ? 'Potassium (ppm)' : locale === 'kn' ? 'ಪೊಟ್ಯಾಸಿಯಮ್ (ppm)' : locale === 'hi' ? 'पोटैशियम (ppm)' : 'K (ppm)'}
              <input
                type="number"
                min="0"
                max="200"
                value={soilData.potassium}
                onChange={(e) => setSoilData({ ...soilData, potassium: e.target.value })}
                placeholder="40"
              />
            </label>
          </div>
        </div>

        <div className="recommendation-section">
          <button className="generate-button" onClick={generateRecommendation}>
            {t.weatherFertilizer?.recommendation || 'Get Recommendation'}
          </button>

          {recommendation && (
            <div className="recommendation-result">
              <h3>{t.weatherFertilizer?.recommendation || 'Recommendation'}</h3>
              <p>{recommendation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


