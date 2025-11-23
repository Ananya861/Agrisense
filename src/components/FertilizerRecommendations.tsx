import { useState } from 'react'
import './FertilizerRecommendations.css'

interface FertilizerRecommendationsProps {
  locale: string
  t: any
}

export default function FertilizerRecommendations({ locale, t }: FertilizerRecommendationsProps) {
  const [crop, setCrop] = useState('Wheat')
  const [area, setArea] = useState<number | ''>('')
  const [ph, setPh] = useState<string>('6.5')
  const [nitrogen, setNitrogen] = useState<string>('50')
  const [phosphorus, setPhosphorus] = useState<string>('30')
  const [potassium, setPotassium] = useState<string>('40')
  const [recommendation, setRecommendation] = useState<string | null>(null)

  const parse = (v: string) => {
    const n = Number(v)
    return Number.isFinite(n) ? n : NaN
  }

  const generate = () => {
    if (!area || area <= 0) {
      alert(locale === 'en' ? 'Please enter area (in acres)' : 'ದಯವಿಟ್ಟು ಎಕರೆಗಳಲ್ಲಿ ಪ್ರದೇಶವನ್ನು ನಮೂದಿಸಿ')
      return
    }

    const pH = parse(ph)
    const N = parse(nitrogen)
    const P = parse(phosphorus)
    const K = parse(potassium)

    let rec = ''

    // Basic pH-based guidance
    if (pH < 6) {
      rec += locale === 'en' ? 'Acidic soil: apply lime before fertilizer. ' : 'ಆಮ್ಲೀಯ ಮಣ್ಣು: ರಸಗೊಬ್ಬರದ ಮೊದಲು ಸುಣ್ಣ ಅನ್ವಯಿಸಿ. '
    }

    // Simple dosage logic: recommended per acre baseline by crop
    const cropBaselines: Record<string, {N:number,P:number,K:number}> = {
      Wheat: { N: 100, P: 40, K: 40 },
      Rice: { N: 80, P: 40, K: 40 },
      Maize: { N: 120, P: 60, K: 60 },
      Tomato: { N: 90, P: 50, K: 50 },
      Sugarcane: { N: 150, P: 60, K: 80 }
    }

    const baseline = cropBaselines[crop] || { N: 100, P: 40, K: 40 }

    // Adjust baseline with soil test (if low, increase; if high, reduce)
    const adjust = (need: number, soilVal: number) => {
      if (isNaN(soilVal)) return need
      if (soilVal < 30) return Math.round(need * 1.2)
      if (soilVal > 100) return Math.round(need * 0.7)
      return need
    }

    const recN = adjust(baseline.N, N)
    const recP = adjust(baseline.P, P)
    const recK = adjust(baseline.K, K)

    const totalN = Math.round(recN * Number(area))
    const totalP = Math.round(recP * Number(area))
    const totalK = Math.round(recK * Number(area))

    rec += (locale === 'en'
      ? `Recommended total per ${area} acre(s): N ${totalN} kg, P ${totalP} kg (P2O5), K ${totalK} kg (K2O). `
      : 'ಶಿಫಾರಸು ಮಾಡಲಾದ ಒಟ್ಟು: N ' + totalN + ' ಕೆಜಿ, P ' + totalP + ' ಕೆಜಿ, K ' + totalK + ' ಕೆಜಿ. ')

    rec += (locale === 'en'
      ? 'Split N into 2-3 applications; apply P & K at planting or as basal.'
      : 'N ಅನ್ನು 2-3 ಹಂತಗಳಲ್ಲಿ ಹಂಚಿ; P ಮತ್ತು K ಅನ್ನು ನೆಡುವಾಗ ಅಥವಾ ಬೇಸಲ್ ಆಗಿ ಅನುಸ್ಥಾಪಿಸಿ.')

    setRecommendation(rec)
  }

  return (
    <div className="fertilizer-container">
      <div className="fert-header">
        <h1>🌱 {t?.fertilizer?.title || 'Fertilizer Recommendations'}</h1>
        <p>{t?.fertilizer?.description || 'Get crop-specific fertilizer dosages based on soil tests and area'}</p>
      </div>

      <div className="fert-form">
        <label>
          {locale === 'en' ? 'Crop' : 'ಬೆಳೆ'}
          <select value={crop} onChange={(e) => setCrop(e.target.value)}>
            <option>Wheat</option>
            <option>Rice</option>
            <option>Maize</option>
            <option>Tomato</option>
            <option>Sugarcane</option>
          </select>
        </label>

        <label>
          {locale === 'en' ? 'Area (acres)' : 'ಪ್ರದೇಶ (ಎಕರೆ)'}
          <input type="number" min="0.01" step="0.01" value={area as any} onChange={(e) => setArea(e.target.value === '' ? '' : Number(e.target.value))} />
        </label>

        <div className="soil-grid">
          <label>
            pH
            <input type="number" step="0.1" value={ph} onChange={(e) => setPh(e.target.value)} />
          </label>
          <label>
            N (ppm)
            <input type="number" value={nitrogen} onChange={(e) => setNitrogen(e.target.value)} />
          </label>
          <label>
            P (ppm)
            <input type="number" value={phosphorus} onChange={(e) => setPhosphorus(e.target.value)} />
          </label>
          <label>
            K (ppm)
            <input type="number" value={potassium} onChange={(e) => setPotassium(e.target.value)} />
          </label>
        </div>

        <div className="actions">
          <button className="primary" onClick={generate}>{locale === 'en' ? 'Get Recommendation' : 'ಶಿಫಾರಸು ಪಡೆಯಿರಿ'}</button>
        </div>

        {recommendation && (
          <div className="recommendation-result">
            <h3>{locale === 'en' ? 'Recommendation' : 'ಶಿಫಾರಸು'}</h3>
            <p>{recommendation}</p>
          </div>
        )}
      </div>
    </div>
  )
}
