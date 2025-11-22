import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { translations, type Locale } from './i18n'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import PlantDoctor from './components/PlantDoctor'
import VoiceDiagnosis from './components/VoiceDiagnosis'
import WeatherFertilizer from './components/WeatherFertilizer'
import CropCalendar from './components/CropCalendar'
import DiseaseHeatmap from './components/DiseaseHeatmap'
import OrganicRecommendations from './components/OrganicRecommendations'

export default function AppRouter() {
  const [locale, setLocale] = useState<Locale>('en')
  // Ensure we always have a valid translation, fallback to English if needed
  const t = translations[locale] || translations['en']

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout locale={locale} setLocale={setLocale} t={t}>
          <Routes>
            <Route path="/" element={<Home locale={locale} t={t} />} />
            <Route path="/home" element={<Home locale={locale} t={t} />} />
            <Route path="/login" element={<Login locale={locale} t={t} />} />
            <Route path="/plant-doctor" element={<PlantDoctor locale={locale} t={t} />} />
            <Route path="/voice" element={<VoiceDiagnosis locale={locale} t={t} />} />
            <Route path="/weather-fertilizer" element={<WeatherFertilizer locale={locale} t={t} />} />
            <Route path="/calendar" element={<CropCalendar locale={locale} t={t} />} />
            <Route path="/heatmap" element={<DiseaseHeatmap locale={locale} t={t} />} />
            <Route path="/organic" element={<OrganicRecommendations locale={locale} t={t} />} />
            <Route path="*" element={<Home locale={locale} t={t} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}

