import { useState } from 'react'
import './CropCalendar.css'

interface CropCalendarProps {
  locale: string
  t: any
}

interface CalendarEvent {
  date: string
  type: 'sowing' | 'fertilizer' | 'watering' | 'pest'
  title: string
  description: string
}

export default function CropCalendar({ locale, t }: CropCalendarProps) {
  const [selectedCrop, setSelectedCrop] = useState('')
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])
  const [sowingDate, setSowingDate] = useState('')

  const crops = [
    { value: 'tomato', name: locale === 'en' ? 'Tomato' : locale === 'kn' ? 'ಟೊಮಾಟೊ' : locale === 'hi' ? 'टमाटर' : 'Tomato' },
    { value: 'rice', name: locale === 'en' ? 'Rice' : locale === 'kn' ? 'ಭತ್ತ' : locale === 'hi' ? 'चावल' : 'Rice' },
    { value: 'corn', name: locale === 'en' ? 'Corn' : locale === 'kn' ? 'ಮೆಕ್ಕೆ ಜೋಳ' : locale === 'hi' ? 'मक्का' : 'Corn' },
    { value: 'wheat', name: locale === 'en' ? 'Wheat' : locale === 'kn' ? 'ಗೋಧಿ' : locale === 'hi' ? 'गेहूं' : 'Wheat' },
  ]

  const generateCalendar = () => {
    if (!selectedCrop || !sowingDate) {
      alert(locale === 'en' ? 'Please select crop and sowing date' : locale === 'kn' ? 'ದಯವಿಟ್ಟು ಬೆಳೆ ಮತ್ತು ಬಿತ್ತನೆ ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ' : locale === 'hi' ? 'कृपया फसल और बुवाई की तारीख चुनें' : 'Select crop and date')
      return
    }

    const events: CalendarEvent[] = []
    const baseDate = new Date(sowingDate)

    // Sowing date
    events.push({
      date: sowingDate,
      type: 'sowing',
      title: locale === 'en' ? 'Sowing Date' : locale === 'kn' ? 'ಬಿತ್ತನೆ ದಿನಾಂಕ' : locale === 'hi' ? 'बुवाई की तारीख' : 'Sowing',
      description: locale === 'en' ? `Sow ${selectedCrop} seeds` : locale === 'kn' ? `${selectedCrop} ಬೀಜಗಳನ್ನು ಬಿತ್ತಿ` : locale === 'hi' ? `${selectedCrop} के बीज बोएं` : 'Sow seeds'
    })

    // Fertilizer schedule (15, 30, 45 days after sowing)
    for (let days = 15; days <= 45; days += 15) {
      const date = new Date(baseDate)
      date.setDate(date.getDate() + days)
      events.push({
        date: date.toISOString().split('T')[0],
        type: 'fertilizer',
        title: locale === 'en' ? `Fertilizer Application (Day ${days})` : locale === 'kn' ? `ರಸಗೊಬ್ಬರ ಅನ್ವಯ (ದಿನ ${days})` : locale === 'hi' ? `उर्वरक आवेदन (दिन ${days})` : `Fertilizer Day ${days}`,
        description: locale === 'en' ? 'Apply NPK 10:26:26 (25 kg/acre)' : locale === 'kn' ? 'NPK 10:26:26 (25 ಕೆಜಿ/ಎಕರೆ) ಅನ್ವಯಿಸಿ' : locale === 'hi' ? 'NPK 10:26:26 (25 किग्रा/एकड़) लगाएं' : 'Apply fertilizer'
      })
    }

    // Watering alerts (every 3 days)
    for (let days = 3; days <= 60; days += 3) {
      const date = new Date(baseDate)
      date.setDate(date.getDate() + days)
      events.push({
        date: date.toISOString().split('T')[0],
        type: 'watering',
        title: locale === 'en' ? 'Watering Alert' : locale === 'kn' ? 'ನೀರಾವರಿ ಎಚ್ಚರಿಕೆ' : locale === 'hi' ? 'सिंचाई अलर्ट' : 'Watering',
        description: locale === 'en' ? 'Ensure adequate irrigation' : locale === 'kn' ? 'ಸಾಕಷ್ಟು ನೀರಾವರಿಯನ್ನು ಖಚಿತಪಡಿಸಿ' : locale === 'hi' ? 'पर्याप्त सिंचाई सुनिश्चित करें' : 'Water plants'
      })
    }

    // Pest control (20, 40 days)
    for (const days of [20, 40]) {
      const date = new Date(baseDate)
      date.setDate(date.getDate() + days)
      events.push({
        date: date.toISOString().split('T')[0],
        type: 'pest',
        title: locale === 'en' ? 'Pest Control Reminder' : locale === 'kn' ? 'ಕೀಟ ನಿಯಂತ್ರಣ ಜ್ಞಾಪಕ' : locale === 'hi' ? 'कीट नियंत्रण अनुस्मारक' : 'Pest Control',
        description: locale === 'en' ? 'Apply neem oil spray for pest prevention' : locale === 'kn' ? 'ಕೀಟ ತಡೆಗಟ್ಟಲು ನೀಂ ಎಣ್ಣೆ ಸ್ಪ್ರೇ ಅನ್ವಯಿಸಿ' : locale === 'hi' ? 'कीट रोकथाम के लिए नीम तेल स्प्रे लगाएं' : 'Apply pest control'
      })
    }

    setCalendarEvents(events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'sowing': return '🌱'
      case 'fertilizer': return '🧪'
      case 'watering': return '💧'
      case 'pest': return '🐛'
      default: return '📅'
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'sowing': return '#008f57'
      case 'fertilizer': return '#457b9d'
      case 'watering': return '#4a90e2'
      case 'pest': return '#e63946'
      default: return '#666'
    }
  }

  return (
    <div className="crop-calendar-container">
      <div className="crop-calendar-header">
        <h1>📅 {t.cropCalendar?.title || 'Digital Crop Growth Calendar'}</h1>
        <p>{t.cropCalendar?.description || 'Automatically generate sowing dates, fertilizer schedules, watering alerts, and pest control reminders'}</p>
      </div>

      <div className="crop-calendar-content">
        <div className="calendar-setup">
          <div className="setup-section">
            <label>
              <h3>{t.cropCalendar?.selectCrop || 'Select Crop'}</h3>
              <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
                <option value="">{locale === 'en' ? 'Choose a crop...' : locale === 'kn' ? 'ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ...' : locale === 'hi' ? 'एक फसल चुनें...' : 'Select crop'}</option>
                {crops.map(crop => (
                  <option key={crop.value} value={crop.value}>{crop.name}</option>
                ))}
              </select>
            </label>

            <label>
              <h3>{t.cropCalendar?.sowingDate || 'Sowing Date'}</h3>
              <input
                type="date"
                value={sowingDate}
                onChange={(e) => setSowingDate(e.target.value)}
              />
            </label>

            <button className="generate-button" onClick={generateCalendar}>
              {t.cropCalendar?.generate || 'Generate Calendar'}
            </button>
          </div>
        </div>

        {calendarEvents.length > 0 && (
          <div className="calendar-events">
            <h2>{t.cropCalendar?.events || 'Calendar Events'}</h2>
            <div className="events-list">
              {calendarEvents.map((event, idx) => (
                <div key={idx} className="calendar-event" style={{ borderLeftColor: getEventColor(event.type) }}>
                  <div className="event-icon">{getEventIcon(event.type)}</div>
                  <div className="event-content">
                    <div className="event-header">
                      <h4>{event.title}</h4>
                      <span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <p className="event-description">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


