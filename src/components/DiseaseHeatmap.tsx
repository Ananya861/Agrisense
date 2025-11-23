import { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './DiseaseHeatmap.css'

// Fix for default marker icons - only run once
let iconSetupDone = false
if (typeof window !== 'undefined' && !iconSetupDone) {
  try {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })
    iconSetupDone = true
  } catch (e) {
    console.warn('Leaflet icon setup failed:', e)
  }
}

interface DiseaseData {
  id: number
  lat: number
  lng: number
  disease: string
  crop: string
  severity: 'low' | 'medium' | 'high'
  date: string
}

interface DiseaseHeatmapProps {
  locale: string
  t: any
}

export default function DiseaseHeatmap({ locale, t }: DiseaseHeatmapProps) {
  const [diseaseData, setDiseaseData] = useState<DiseaseData[]>([])
  const [selectedDisease, setSelectedDisease] = useState<string>('all')
  const [riskPrediction, setRiskPrediction] = useState<string>('')
  const [isMapReady, setIsMapReady] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const mapInitialized = useRef(false)

  useEffect(() => {
    // Only initialize once
    if (mapInitialized.current) return
    
    // Check if react-leaflet is available
    try {
      if (typeof window !== 'undefined') {
        setIsMapReady(true)
        mapInitialized.current = true
      }
    } catch (error) {
      console.error('Map initialization error:', error)
      setMapError(locale === 'en' ? 'Map component failed to load. Please refresh the page.' : locale === 'kn' ? 'ನಕ್ಷೆ ಘಟಕವನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಪುಟವನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ.' : locale === 'hi' ? 'मानचित्र घटक लोड करने में विफल। कृपया पृष्ठ को रीफ्रेश करें।' : 'Map failed to load')
    }
    
    // Mock disease data for Karnataka/India
    const mockData: DiseaseData[] = [
      { id: 1, lat: 12.9716, lng: 77.5946, disease: 'Early Blight', crop: 'Tomato', severity: 'high', date: '2025-11-20' },
      { id: 2, lat: 13.0827, lng: 80.2707, disease: 'Powdery Mildew', crop: 'Tomato', severity: 'medium', date: '2025-11-19' },
      { id: 3, lat: 15.3173, lng: 75.7139, disease: 'Rust', crop: 'Wheat', severity: 'low', date: '2025-11-18' },
      { id: 4, lat: 12.2958, lng: 76.6394, disease: 'Leaf Spot', crop: 'Rice', severity: 'high', date: '2025-11-21' },
      { id: 5, lat: 16.5062, lng: 80.6480, disease: 'Early Blight', crop: 'Tomato', severity: 'medium', date: '2025-11-20' },
    ]
    setDiseaseData(mockData)

    // Generate risk prediction
    const highRisk = mockData.filter(d => d.severity === 'high').length
    const prediction = highRisk > 2
      ? (locale === 'en' ? 'High risk of disease spread in next 7 days. Take preventive measures.' : locale === 'kn' ? 'ಮುಂದಿನ 7 ದಿನಗಳಲ್ಲಿ ರೋಗ ಹರಡುವಿಕೆಯ ಹೆಚ್ಚಿನ ಅಪಾಯ. ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.' : locale === 'hi' ? 'अगले 7 दिनों में बीमारी फैलने का उच्च जोखिम। निवारक उपाय करें।' : 'High risk')
      : (locale === 'en' ? 'Moderate risk. Monitor crops regularly.' : locale === 'kn' ? 'ಮಧ್ಯಮ ಅಪಾಯ. ನಿಯಮಿತವಾಗಿ ಬೆಳೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.' : locale === 'hi' ? 'मध्यम जोखिम। नियमित रूप से फसलों की निगरानी करें।' : 'Moderate risk')
    setRiskPrediction(prediction)
  }, [locale])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#e63946'
      case 'medium': return '#f77f00'
      case 'low': return '#fcbf49'
      default: return '#666'
    }
  }

  const getSeverityRadius = (severity: string) => {
    switch (severity) {
      case 'high': return 50000
      case 'medium': return 30000
      case 'low': return 15000
      default: return 10000
    }
  }

  const filteredData = selectedDisease === 'all' 
    ? diseaseData 
    : diseaseData.filter(d => d.disease === selectedDisease)

  const uniqueDiseases = Array.from(new Set(diseaseData.map(d => d.disease)))

  return (
    <div className="disease-heatmap-container">
      <div className="disease-heatmap-header">
        <h1>🗺️ {t.heatmap?.title || 'Disease Spread Heatmap'}</h1>
        <p>{t.heatmap?.description || 'Real-time map showing disease hotspots and affected crops across Karnataka/India'}</p>
      </div>

      <div className="heatmap-controls">
        <label>
          {locale === 'en' ? 'Filter by Disease:' : locale === 'kn' ? 'ರೋಗದಿಂದ ಫಿಲ್ಟರ್ ಮಾಡಿ:' : locale === 'hi' ? 'रोग से फ़िल्टर करें:' : 'Filter:'}
          <select value={selectedDisease} onChange={(e) => setSelectedDisease(e.target.value)}>
            <option value="all">{locale === 'en' ? 'All Diseases' : locale === 'kn' ? 'ಎಲ್ಲಾ ರೋಗಗಳು' : locale === 'hi' ? 'सभी रोग' : 'All'}</option>
            {uniqueDiseases.map(disease => (
              <option key={disease} value={disease}>{disease}</option>
            ))}
          </select>
        </label>
      </div>

      {riskPrediction && (
        <div className="risk-prediction">
          <h3>{t.heatmap?.riskPrediction || '7-Day Risk Prediction'}</h3>
          <p>{riskPrediction}</p>
        </div>
      )}

      {diseaseData.length === 0 ? (
        <div className="no-data">
          <p>{t.heatmap?.noData || 'No disease data available'}</p>
        </div>
      ) : mapError ? (
        <div className="no-data">
          <p style={{ color: '#e63946' }}>{mapError}</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
            {locale === 'en' ? 'Map view is not available. Showing data in list format:' : locale === 'kn' ? 'ನಕ್ಷೆ ವೀಕ್ಷಣೆ ಲಭ್ಯವಿಲ್ಲ. ಪಟ್ಟಿ ಸ್ವರೂಪದಲ್ಲಿ ಡೇಟಾವನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ:' : locale === 'hi' ? 'मानचित्र दृश्य उपलब्ध नहीं है। सूची प्रारूप में डेटा दिखाया जा रहा है:' : 'Map unavailable. Showing list:'}
          </p>
          <div style={{ marginTop: '1rem' }}>
            {filteredData.length > 0 ? filteredData.map(data => (
              <div key={data.id} style={{ padding: '1rem', margin: '0.5rem 0', background: '#f0f0f0', borderRadius: '0.5rem' }}>
                <strong>{data.disease}</strong> - {data.crop} ({data.severity}) - {data.date}
              </div>
            )) : <p>{locale === 'en' ? 'No data available' : locale === 'kn' ? 'ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ' : locale === 'hi' ? 'कोई डेटा उपलब्ध नहीं' : 'No data'}</p>}
          </div>
        </div>
      ) : isMapReady && typeof window !== 'undefined' && !mapError ? (
        <PlainLeafletMap
          diseaseData={filteredData}
          locale={locale}
          getSeverityColor={getSeverityColor}
          getSeverityRadius={getSeverityRadius}
        />
      ) : (
        <div className="no-data">
          <p>{locale === 'en' ? 'Loading map...' : locale === 'kn' ? 'ನಕ್ಷೆಯನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...' : locale === 'hi' ? 'मानचित्र लोड हो रहा है...' : 'Loading...'}</p>
        </div>
      )}

      <div className="heatmap-legend">
        <h4>{locale === 'en' ? 'Legend:' : locale === 'kn' ? 'ವಿವರಣೆ:' : locale === 'hi' ? 'किंवदंती:' : 'Legend'}</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color" style={{ background: '#e63946' }}></span>
            <span>{locale === 'en' ? 'High Risk' : locale === 'kn' ? 'ಉನ್ನತ ಅಪಾಯ' : locale === 'hi' ? 'उच्च जोखिम' : 'High'}</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ background: '#f77f00' }}></span>
            <span>{locale === 'en' ? 'Medium Risk' : locale === 'kn' ? 'ಮಧ್ಯಮ ಅಪಾಯ' : locale === 'hi' ? 'मध्यम जोखिम' : 'Medium'}</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ background: '#fcbf49' }}></span>
            <span>{locale === 'en' ? 'Low Risk' : locale === 'kn' ? 'ಕಡಿಮೆ ಅಪಾಯ' : locale === 'hi' ? 'कम जोखिम' : 'Low'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Plain Leaflet implementation to avoid react-leaflet initialization issues
function PlainLeafletMap({ 
  diseaseData, 
  locale, 
  getSeverityColor, 
  getSeverityRadius 
}: {
  diseaseData: DiseaseData[]
  locale: string
  getSeverityColor: (severity: string) => string
  getSeverityRadius: (severity: string) => number
}) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<L.Marker[]>([])
  const circlesRef = useRef<L.Circle[]>([])

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [13.0827, 77.5946],
      zoom: 7,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    mapRef.current = map

    return () => {
      // Cleanup
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      markersRef.current = []
      circlesRef.current = []
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    // Clear existing markers and circles
    markersRef.current.forEach(marker => marker.remove())
    circlesRef.current.forEach(circle => circle.remove())
    markersRef.current = []
    circlesRef.current = []

    // Add new markers and circles
    diseaseData.forEach(data => {
      // Add circle
      const circle = L.circle([data.lat, data.lng], {
        radius: getSeverityRadius(data.severity),
        color: getSeverityColor(data.severity),
        fillColor: getSeverityColor(data.severity),
        fillOpacity: 0.3
      }).addTo(mapRef.current!)

      // Add marker
      const marker = L.marker([data.lat, data.lng]).addTo(mapRef.current!)
      
      const popupContent = `
        <div style="padding: 0.5rem;">
          <h4 style="margin: 0 0 0.5rem 0; color: #008f57;">${data.disease}</h4>
          <p style="margin: 0.25rem 0;"><strong>${locale === 'en' ? 'Crop:' : locale === 'kn' ? 'ಬೆಳೆ:' : locale === 'hi' ? 'फसल:' : 'Crop'}</strong> ${data.crop}</p>
          <p style="margin: 0.25rem 0;"><strong>${locale === 'en' ? 'Severity:' : locale === 'kn' ? 'ತೀವ್ರತೆ:' : locale === 'hi' ? 'गंभीरता:' : 'Severity'}</strong> 
            <span style="color: ${getSeverityColor(data.severity)};"> ${data.severity}</span>
          </p>
          <p style="margin: 0.25rem 0;"><strong>${locale === 'en' ? 'Date:' : locale === 'kn' ? 'ದಿನಾಂಕ:' : locale === 'hi' ? 'तारीख:' : 'Date'}</strong> ${data.date}</p>
        </div>
      `
      marker.bindPopup(popupContent)

      markersRef.current.push(marker)
      circlesRef.current.push(circle)
    })
  }, [diseaseData, locale, getSeverityColor, getSeverityRadius])

  return (
    <div className="map-container">
      <div ref={mapContainerRef} style={{ height: '600px', width: '100%' }}></div>
    </div>
  )
}

