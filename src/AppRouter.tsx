import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { Suspense, useState } from 'react'
import { translations, type Locale } from './i18n'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
const PlantDoctor = React.lazy(() => import('./components/PlantDoctor'))
const VoiceDiagnosis = React.lazy(() => import('./components/VoiceDiagnosis'))
const WeatherFertilizer = React.lazy(() => import('./components/WeatherFertilizer'))
const FertilizerRecommendations = React.lazy(() => import('./components/FertilizerRecommendations'))
const CropCalendar = React.lazy(() => import('./components/CropCalendar'))
const DiseaseHeatmap = React.lazy(() => import('./components/DiseaseHeatmap'))
const OrganicRecommendations = React.lazy(() => import('./components/OrganicRecommendations'))

export default function AppRouter() {
  const [locale, setLocale] = useState<Locale>('en')
  // Ensure we always have a valid translation, fallback to English if needed
  const t = translations[locale] || translations['en']

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout locale={locale} setLocale={setLocale} t={t}>
          <Suspense fallback={<div style={{padding:20}}>Loading...</div>}>
            <Routes>
            <Route path="/" element={<Home locale={locale} t={t} />} />
            <Route path="/home" element={<Home locale={locale} t={t} />} />
            <Route path="/login" element={<Login locale={locale} t={t} />} />
            <Route path="/plant-doctor" element={<PlantDoctor locale={locale} t={t} />} />
            <Route path="/voice" element={<VoiceDiagnosis locale={locale} t={t} />} />
            <Route path="/weather-fertilizer" element={<WeatherFertilizer locale={locale} t={t} />} />
            <Route path="/fertilizer" element={<FertilizerRecommendations locale={locale} t={t} />} />
            <Route path="/calendar" element={<CropCalendar locale={locale} t={t} />} />
            <Route path="/heatmap" element={<DiseaseHeatmap locale={locale} t={t} />} />
            <Route path="/organic" element={<OrganicRecommendations locale={locale} t={t} />} />
              <Route path="*" element={<Home locale={locale} t={t} />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}

