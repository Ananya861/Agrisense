export type Locale = 'en' | 'kn' | 'hi' | 'te' | 'ta' | 'mr'

type NavLink = {
  label: string
  href: string
}

type ModuleHighlight = {
  title: string
  description: string
  badge: string
}

type StackItem = {
  name: string
  role: string
}

type NonFunctionalItem = {
  title: string
  detail: string
}

export type Translation = {
  languageName: string
  languageSwitcher: string
  navLinks: NavLink[]
  hero: {
    eyebrow: string
    title: string
    lead: string
    primaryCta: string
    secondaryCta: string
    goals: string[]
  }
  modules: ModuleHighlight[]
  detection: {
    eyebrow: string
    title: string
    description: string
    bullets: string[]
    uploadLabel: string
    placeholder: string
    healthy: string
    diseaseAdvice: string
  }
  fertilizer: {
    eyebrow: string
    title: string
    description: string
    fields: Record<string, string>
    submit: string
  }
  analytics: {
    eyebrow: string
    title: string
    description: string
    form: {
      crop: string
      acreage: string
      season: string
      placeholder: string
      select: string
      submit: string
    }
    insightsTitle: string
    insights: string[]
  }
  userManagement: {
    eyebrow: string
    title: string
    description: string
    signup: string
    login: string
    signupButton: string
    loginButton: string
    placeholders: {
      name: string
      email: string
      password: string
    }
  }
  architecture: {
    eyebrow: string
    title: string
    cards: { title: string; description: string }[]
  }
  stack: {
    eyebrow: string
    title: string
    list: StackItem[]
  }
  nonFunctional: NonFunctionalItem[]
  deployment: {
    eyebrow: string
    title: string
    deploymentTitle: string
    deploymentBullets: string[]
    testingTitle: string
    testingBullets: string[]
  }
  contact: {
    eyebrow: string
    title: string
    description: string
    fields: {
      name: string
      email: string
      org: string
      message: string
    }
    placeholder: string
    submit: string
    missing: string
    success: string
  }
  messages: {
    fertilizerMissing: string
    fertilizerLowPh: string
    fertilizerBalanced: string
    forecastMissing: string
    forecastResult: (crop: string, season: string) => string
    diseaseHealthy: string
    diseaseDetected: string
  }
  detectionClasses: string[]
  seasons: string[]
  // New features
  plantDoctor?: {
    title: string
    description: string
    uploadImage: string
    analyzing: string
    prediction: string
    confidence: string
    explanation: string
    organicRemedies: string
    preventionTips: string
    chatPlaceholder: string
    sendMessage: string
  }
  voiceDiagnosis?: {
    title: string
    description: string
    startRecording: string
    stopRecording: string
    listening: string
    processing: string
    suggestions: string
    notSupported: string
  }
  weatherFertilizer?: {
    title: string
    description: string
    location: string
    getWeather: string
    temperature: string
    rainfall: string
    humidity: string
    soilInput: string
    recommendation: string
    weatherBased: string
  }
  cropCalendar?: {
    title: string
    description: string
    selectCrop: string
    sowingDate: string
    fertilizerSchedule: string
    wateringAlerts: string
    pestControl: string
    generate: string
    events: string
  }
  communityForum?: {
    title: string
    description: string
    askQuestion: string
    uploadIssue: string
    shareSolution: string
    upvote: string
    answers: string
    postQuestion: string
    postAnswer: string
    noQuestions: string
  }
  heatmap?: {
    title: string
    description: string
    diseaseHotspots: string
    affectedCrops: string
    riskPrediction: string
    next7Days: string
    viewMap: string
    noData: string
  }
  nutrientScanner?: {
    title: string
    description: string
    openCamera: string
    scanning: string
    nitrogenDeficiency: string
    phosphorusDeficiency: string
    potassiumDeficiency: string
    healthy: string
    recommendations: string
  }
  organicRecommendations?: {
    title: string
    description: string
    neemOil: string
    bakingSoda: string
    organicFertilizers: string
    ecoFriendly: string
    applyNow: string
  }
  marketplace?: {
    title: string
    description: string
    seeds: string
    fertilizers: string
    compare: string
    reviews: string
    addToCart: string
    viewDetails: string
    price: string
    rating: string
    inStock: string
    outOfStock: string
  }
  login?: {
    title: string
    description: string
    signInWithGoogle: string
    phoneNumber: string
    phonePlaceholder: string
    sendOTP: string
    enterOTP: string
    otpPlaceholder: string
    verifyOTP: string
    resendOTP: string
    otpSent: string
    otpVerified: string
    invalidOTP: string
    loginSuccess: string
    logout: string
    welcome: string
    loggedInAs: string
  }
}

export const translations: Record<Locale, Translation> = {
  en: {
    languageName: 'English',
    languageSwitcher: 'Language',
    navLinks: [
      { label: 'Home', href: '/home' },
      { label: 'Plant Doctor', href: '/plant-doctor' },
      { label: 'Voice Diagnosis', href: '/voice' },
      { label: 'Weather Fertilizer', href: '/weather-fertilizer' },
      { label: 'Crop Calendar', href: '/calendar' },
      { label: 'Heatmap', href: '/heatmap' },
      { label: 'Organic', href: '/organic' },
    ],
    hero: {
      eyebrow: 'AI for Precision Agriculture',
      title: 'Diagnose, recommend, and forecast crop health in one smart workspace.',
      lead:
        'AgriSense pairs CNN disease detection, soil-aware fertilizer recommendations, and LSTM + Prophet predictive analytics inside a responsive interface for growers and agronomists.',
      primaryCta: 'Try Disease Detection',
      secondaryCta: 'View Predictive Dashboard',
      goals: [
        'Realtime CNN inference',
        'Fertilizer ML copilots',
        'LSTM & Prophet forecasts',
        'Responsive farmer UI',
      ],
    },
    modules: [
      {
        title: 'Disease Detection',
        description:
          'Upload high-resolution leaf images. Our CNN pipeline classifies 50+ disease categories and returns contextual advice instantly.',
        badge: 'CNN + Vision Transformers',
      },
      {
        title: 'Fertilizer Lab',
        description:
          'Input soil sensor readings (pH, moisture, NPK) to get precise fertilizer and dosage suggestions powered by XGBoost & Random Forest ensembles.',
        badge: 'Soil-aware ML',
      },
      {
        title: 'Predictive Dashboard',
        description:
          'LSTM yield forecasts and Prophet-based weather trends surface early risk signals for proactive agronomic decisions.',
        badge: 'Forecasting Suite',
      },
      {
        title: 'Farmer Workspace',
        description:
          'Secure login with a timeline of past diagnoses, fertilizer plans, and forecast snapshots synced to PostgreSQL.',
        badge: 'User Vault',
      },
    ],
    detection: {
      eyebrow: 'Disease Detection Module',
      title: 'Upload a leaf image to classify crop diseases.',
      description:
        'The FastAPI inference endpoint hosts CNN and Vision Transformer ensembles trained on curated datasets. Confidence scores and remediation notes stream back instantly.',
      bullets: [
        'CNN feature extractor with attention-guided decoder.',
        'Confidence score, disease description, and treatment tips.',
        'Results saved to farmer history for season-over-season view.',
      ],
      uploadLabel: 'Upload Leaf Image',
      placeholder: 'Classification results appear here after upload.',
      healthy: 'Leaf appears healthy. Recommend routine monitoring.',
      diseaseAdvice: 'Detected {{disease}}. Apply recommended treatment within 48 hours.',
    },
    fertilizer: {
      eyebrow: 'Fertilizer Recommendation Module',
      title: 'Translate soil sensor values into actionable fertilizer plans.',
      description:
        'XGBoost and Random Forest models analyze NPK, pH, and moisture to recommend fertilizer type, quantity, and timing tailored to each plot.',
      fields: {
        ph: 'Soil pH',
        moisture: 'Moisture (%)',
        nitrogen: 'Nitrogen (ppm)',
        phosphorus: 'Phosphorus (ppm)',
        potassium: 'Potassium (ppm)',
      },
      submit: 'Generate Recommendation',
    },
    analytics: {
      eyebrow: 'Predictive Analytics',
      title: 'LSTM yield predictions + Prophet weather signals.',
      description:
        'Unified dashboard surfaces forecast curves, risk scores, and advisory insights for proactive planning.',
      form: {
        crop: 'Crop',
        acreage: 'Acreage (acres)',
        season: 'Season',
        placeholder: 'e.g., Wheat',
        select: 'Select',
        submit: 'Forecast Yield',
      },
      insightsTitle: 'Live dashboard insights',
      insights: [
        'LSTM Yield Curve: 6-week upward trend, +8% compared to last season.',
        'Prophet Weather Risk: Spike in humidity around week 3; alert triggered for fungal outbreaks.',
        'Automation: Export forecasts to PDF and sync with farm ERP via secure API.',
      ],
    },
    userManagement: {
      eyebrow: 'User Management & Data',
      title: 'Secure farmer accounts with data history.',
      description:
        'Registration, login, password recovery, and multi-device sync keep agronomic intelligence accessible and safe.',
      signup: 'Signup',
      login: 'Login',
      signupButton: 'Create Account',
      loginButton: 'Sign In',
      placeholders: {
        name: 'Full Name',
        email: 'Email Address',
        password: 'Password',
      },
    },
    architecture: {
      eyebrow: 'System Architecture',
      title: 'React frontend ↔ FastAPI backend ↔ PostgreSQL & AI models.',
      cards: [
        {
          title: 'Frontend',
          description:
            'React + TypeScript, component-driven UI, responsive layout, secure JWT auth, Axios clients for diagnostics, fertilizer, and forecast APIs.',
        },
        {
          title: 'Backend',
          description:
            'FastAPI orchestrates CNN, XGBoost, Random Forest, LSTM, and Prophet models, exposing unified REST endpoints with Swagger docs and async processing.',
        },
        {
          title: 'Database & Storage',
          description:
            'PostgreSQL stores user profiles, soil samples, predictions, and audit logs. Object storage keeps training data and model artifacts with versioning.',
        },
        {
          title: 'Workflow',
          description:
            'React calls FastAPI → models infer → results cached → UI updates via WebSocket push for realtime dashboard refresh.',
        },
      ],
    },
    stack: {
      eyebrow: 'Technology Stack',
      title: 'Modern, scalable stack for precision agriculture.',
      list: [
        { name: 'React.js', role: 'Responsive client UI & routing' },
        { name: 'FastAPI', role: 'Low-latency inference APIs' },
        { name: 'PostgreSQL', role: 'Storage for historical agronomic data' },
        { name: 'Docker', role: 'Portable containerized services' },
        { name: 'AWS / Azure / GCP', role: 'Scalable managed deployments' },
      ],
    },
    nonFunctional: [
      { title: 'Performance', detail: 'Realtime inferencing under 1.5s' },
      { title: 'Scalability', detail: 'Horizontal autoscale with containers' },
      { title: 'Security', detail: 'HTTPS + JWT-based session handling' },
      { title: 'Usability', detail: 'Mobile-first layout for on-field use' },
    ],
    deployment: {
      eyebrow: 'Deployment & Testing',
      title: 'Cloud-native delivery with end-to-end test coverage.',
      deploymentTitle: 'Deployment Requirements',
      deploymentBullets: [
        'Containerized services via Docker Compose / Kubernetes.',
        'CI/CD on GitHub Actions to AWS, Azure, or GCP.',
        'HTTPS termination, WAF, secrets vault.',
      ],
      testingTitle: 'Testing Requirements',
      testingBullets: [
        'Unit tests for ML APIs (PyTest + FastAPI test client).',
        'Integration tests across React ↔ FastAPI flows.',
        'Manual + automated UI/UX testing on multiple devices.',
      ],
    },
    contact: {
      eyebrow: 'Talk to our team',
      title: 'Schedule a live demo or request tailored specs.',
      description:
        'Share a few details and we’ll send a calendar invite plus a curated integration checklist for your farm operations.',
      fields: {
        name: 'Full Name*',
        email: 'Work Email*',
        org: 'Organization',
        message: 'Message*',
      },
      placeholder: 'Tell us about your crops, acreage, and desired go-live date.',
      submit: 'Request Demo',
      missing: 'Please complete the required fields.',
      success: 'Thanks! Our team will reach out within one business day.',
    },
    messages: {
      fertilizerMissing: 'Please fill out all soil parameters.',
      fertilizerLowPh:
        'Apply 40 kg/acre of NPK 10:26:26 with lime to balance soil acidity.',
      fertilizerBalanced:
        'Apply 25 kg/acre of urea with micronutrient mix for balanced growth.',
      forecastMissing: 'Complete all fields to generate a forecast.',
      forecastResult: (crop: string, season: string) =>
        `Projected yield for ${crop} is 32 q/acre with moderate weather risk in ${season}. LSTM confidence 87%, Prophet risk band: amber.`,
      diseaseHealthy: 'Leaf appears healthy. Recommend routine monitoring.',
      diseaseDetected: 'Detected {{disease}}. Apply recommended treatment within 48 hours.',
    },
    detectionClasses: ['Blight', 'Rust', 'Leaf Spot', 'Healthy'],
    seasons: ['Kharif', 'Rabi', 'Summer'],
    plantDoctor: {
      title: 'Plant Doctor Chatbot',
      description: 'AI Assistant for Farmers - Upload leaf image, get predictions, explanations, and organic remedies',
      uploadImage: 'Click to upload leaf image',
      analyzing: 'Analyzing image...',
      prediction: 'Prediction',
      confidence: 'Confidence',
      explanation: 'Explanation',
      organicRemedies: 'Organic Remedies',
      preventionTips: 'Prevention Tips',
      chatPlaceholder: 'Ask questions about plant diseases, treatments, or farming tips...',
      sendMessage: 'Send'
    },
    voiceDiagnosis: {
      title: 'Voice-Based Crop Diagnosis',
      description: 'Speak your crop symptoms and get instant suggestions',
      startRecording: 'Start Recording',
      stopRecording: 'Stop Recording',
      listening: 'Listening...',
      processing: 'Processing your symptoms...',
      suggestions: 'Suggestions',
      notSupported: 'Voice recognition is not supported in your browser. Please use Chrome or Edge.'
    },
    weatherFertilizer: {
      title: 'Auto Weather + Soil-Based Fertilizer',
      description: 'Get dynamic fertilizer recommendations based on real-time weather and soil data',
      location: 'Location',
      getWeather: 'Get Weather',
      temperature: 'Temperature',
      rainfall: 'Rainfall',
      humidity: 'Humidity',
      soilInput: 'Soil Input',
      recommendation: 'Recommendation',
      weatherBased: 'Weather Data'
    },
    cropCalendar: {
      title: 'Digital Crop Growth Calendar',
      description: 'Automatically generate sowing dates, fertilizer schedules, watering alerts, and pest control reminders',
      selectCrop: 'Select Crop',
      sowingDate: 'Sowing Date',
      fertilizerSchedule: 'Fertilizer Schedule',
      wateringAlerts: 'Watering Alerts',
      pestControl: 'Pest Control',
      generate: 'Generate Calendar',
      events: 'Calendar Events'
    },
    communityForum: {
      title: 'Farmer Community Forum',
      description: 'Ask questions, share solutions, and help fellow farmers',
      askQuestion: 'Ask a Question',
      uploadIssue: 'Upload Issue',
      shareSolution: 'Share Solution',
      upvote: 'Upvote',
      answers: 'Answers',
      postQuestion: 'Post Question',
      postAnswer: 'Post Answer',
      noQuestions: 'No questions yet. Be the first to ask!'
    },
    heatmap: {
      title: 'Disease Spread Heatmap',
      description: 'Real-time map showing disease hotspots and affected crops across Karnataka/India',
      diseaseHotspots: 'Disease Hotspots',
      affectedCrops: 'Affected Crops',
      riskPrediction: '7-Day Risk Prediction',
      next7Days: 'Next 7 Days',
      viewMap: 'View Map',
      noData: 'No disease data available'
    },
    nutrientScanner: {
      title: 'Nutrient Deficiency Scanner',
      description: 'Scan plant leaves using camera to detect nutrient deficiencies',
      openCamera: 'Click to open camera',
      scanning: 'Capture & Analyze',
      nitrogenDeficiency: 'Nitrogen Deficiency',
      phosphorusDeficiency: 'Phosphorus Deficiency',
      potassiumDeficiency: 'Potassium Deficiency',
      healthy: 'Healthy',
      recommendations: 'Recommendations'
    },
    organicRecommendations: {
      title: 'Organic Farming Recommendations',
      description: 'Environment-friendly organic remedies for plant diseases',
      neemOil: 'Neem Oil Spray',
      bakingSoda: 'Baking Soda Solution',
      organicFertilizers: 'Organic Fertilizers',
      ecoFriendly: '100% Organic & Environment-Friendly',
      applyNow: 'Apply Now'
    },
    marketplace: {
      title: 'Marketplace for Seeds & Fertilizers',
      description: 'Browse, compare, and order agricultural products',
      seeds: 'Seeds',
      fertilizers: 'Fertilizers',
      compare: 'Compare',
      reviews: 'Reviews',
      addToCart: 'Add to Cart',
      viewDetails: 'View Details',
      price: 'Price',
      rating: 'Rating',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock'
    },
    login: {
      title: 'Login to AgriSense',
      description: 'Enter your personal details to access all features',
      signInWithGoogle: 'Sign in with Google',
      phoneNumber: 'Phone Number',
      phonePlaceholder: 'Enter your phone number (e.g., +91 9876543210)',
      sendOTP: 'Send OTP',
      enterOTP: 'Enter OTP',
      otpPlaceholder: 'Enter 6-digit OTP',
      verifyOTP: 'Verify OTP',
      resendOTP: 'Resend OTP',
      otpSent: 'OTP sent to your phone number',
      otpVerified: 'Phone number verified successfully!',
      invalidOTP: 'Invalid OTP. Please try again.',
      loginSuccess: 'Login successful!',
      logout: 'Logout',
      welcome: 'Welcome',
      loggedInAs: 'Logged in as'
    },
  },
  kn: {
    languageName: 'ಕನ್ನಡ',
    languageSwitcher: 'ಭಾಷೆ',
    navLinks: [
      { label: 'ಮುಖಪುಟ', href: '/home' },
      { label: 'ಸಸ್ಯ ವೈದ್ಯ', href: '/plant-doctor' },
      { label: 'ಧ್ವನಿ ರೋಗನಿರ್ಣಯ', href: '/voice' },
      { label: 'ಹವಾಮಾನ ರಸಗೊಬ್ಬರ', href: '/weather-fertilizer' },
      { label: 'ಬೆಳೆ ಕ್ಯಾಲೆಂಡರ್', href: '/calendar' },
      { label: 'ಹೀಟ್‌ಮ್ಯಾಪ್', href: '/heatmap' },
      { label: 'ಸಾವಯವ', href: '/organic' },
    ],
    hero: {
      eyebrow: 'ಸೂಕ್ಷ್ಮ ಕೃಷಿಗೆ AI ಸಹಾಯ',
      title: 'ರೋಗ ಪತ್ತೆ, ಶಿಫಾರಸು ಮತ್ತು ಭವಿಷ್ಯ ವಿಶ್ಲೇಷಣೆ ಒಂದೇ ವೇದಿಕೆಯಲ್ಲಿ.',
      lead:
        'AgriSense CNN ಆಧಾರಿತ ರೋಗ ಗುರುತು, ಮಣ್ಣಿನ ಮೇಲೆೇರಿದ ರಸಗೊಬ್ಬರ ಸಲಹೆ, LSTM + Prophet ಭವಿಷ್ಯ ವಿಶ್ಲೇಷಣೆಯನ್ನು ರೈತರ ಸ್ನೇಹಿ ತಾಣದಲ್ಲಿ ಒಟ್ಟುಗೂಡಿಸುತ್ತದೆ.',
      primaryCta: 'ರೋಗ ಪತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
      secondaryCta: 'ಭವಿಷ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ನೋಡಿ',
      goals: [
        'ತಕ್ಷಣದ CNN ವಿಶ್ಲೇಷಣೆ',
        'ರಸಗೊಬ್ಬರ ML ಸಹಚರ',
        'LSTM & Prophet ಭವಿಷ್ಯ',
        'ರೈತರಿಗಾಗಿ ಪ್ರತಿಕ್ರಿಯಾಶೀಲ UI',
      ],
    },
    modules: [
      {
        title: 'ರೋಗ ಪತ್ತೆ',
        description:
          'ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ. ನಮ್ಮ CNN ಪೈಪ್‌ಲೈನ್ 50+ ರೋಗಗಳನ್ನು ಗುರುತಿಸಿ ಸುಳಿವು ಮತ್ತು ಸಲಹೆಗಳನ್ನು ತಕ್ಷಣ ನೀಡುತ್ತದೆ.',
        badge: 'CNN + Vision Transformers',
      },
      {
        title: 'ರಸಗೊಬ್ಬರ ಲ್ಯಾಬ್',
        description:
          'ಮಣ್ಣಿನ pH, ತೇವ, NPK ಮೌಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿ. XGBoost ಮತ್ತು Random Forest ಮಾದರಿಗಳು ಸೂಕ್ತ ರಸಗೊಬ್ಬರ ಮತ್ತು ಪ್ರಮಾಣ ಸೂಚಿಸುತ್ತವೆ.',
        badge: 'ಮಣ್ಣು ತಿಳಿದ ML',
      },
      {
        title: 'ಭವಿಷ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
        description:
          'LSTM ಬೆಳೆ ಉತ್ಪಾದನೆ ಮತ್ತು Prophet ಹವಾಮಾನ ಪ್ರವೃತ್ತಿಗಳು ಮುಂಚಿತ ಎಚ್ಚರಿಕೆಗಳನ್ನು ತೋರಿಸುತ್ತವೆ.',
        badge: 'ಭವಿಷ್ಯ ಪ್ಯಾಕ್',
      },
      {
        title: 'ರೈತ ವರ್ಕ್‌ಸ್ಪೇಸ್',
        description:
          'ಸುರಕ್ಷಿತ ಲಾಗಿನ್, ಹಳೆಯ ರೋಗ ವರದಿಗಳು, ರಸಗೊಬ್ಬರ ಯೋಜನೆಗಳು ಮತ್ತು ಭವಿಷ್ಯ ಪರಿಚಯಗಳನ್ನು PostgreSQL ನಲ್ಲಿ ಸಂಗ್ರಹಿಸುತ್ತದೆ.',
        badge: 'User Vault',
      },
    ],
    detection: {
      eyebrow: 'ರೋಗ ಪತ್ತೆ ಘಟಕ',
      title: 'ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ರೋಗವನ್ನು ಗುರುತಿಸಿ.',
      description:
        'FastAPI ಆಧಾರಿತ CNN + Vision Transformer ಮಾದರಿಗಳು ವಿಶೇಷ ಡೇಟಾ ಸಂಗ್ರಹದ ಮೇಲೆ ತರಬೇತಿ ಪಡೆದು ತಕ್ಷಣ ವಿಶ್ವಾಸ ಮತ್ತು ಸಲಹೆಗಳನ್ನು ಕೊಡುತ್ತವೆ.',
      bullets: [
        'ಧ್ಯಾನ ಚಾಲಿತ ಡಿಕೋಡರ್ ಹೊಂದಿದ CNN ವೈಶಿಷ್ಟ್ಯ ಚಿಮ್ಮಿಕೆ.',
        'ವಿಶ್ವಾಸ ಅಂಕ, ರೋಗ ವಿವರಣೆ, ಚಿಕಿತ್ಸೆ ಸೂಚನೆ.',
        'ಫಲಿತಾಂಶಗಳು ಇತಿಹಾಸದಲ್ಲಿ ಉಳಿದು ಹಂಗಾಮು ಹಂಗಾಮಿನ ತೊಳಲಾಗುತ್ತವೆ.',
      ],
      uploadLabel: 'ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ',
      placeholder: 'ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿದ ನಂತರ ಫಲಿತಾಂಶಗಳು ಇಲ್ಲಿ ತೋರಿಸುತ್ತವೆ.',
      healthy: 'ಎಲೆ ಆರೋಗ್ಯಕರವಾಗಿದೆ. ನಿಯಮಿತ ಪರಿಶೀಲನೆ ಮಾಡಿ.',
      diseaseAdvice: '{{disease}} ಪತ್ತೆಯಾಗಿದೆ. 48 ಗಂಟೆಯೊಳಗೆ ಚಿಕಿತ್ಸೆ ಆರಂಭಿಸಿ.',
    },
    fertilizer: {
      eyebrow: 'ರಸಗೊಬ್ಬರ ಶಿಫಾರಸು ಘಟಕ',
      title: 'ಮಣ್ಣಿನ ಅಂಶಗಳನ್ನು ಕ್ರಮಬದ್ಧ ರಸಗೊಬ್ಬರ ಯೋಜನೆಗೆ ಪರಿವರ್ತಿಸಿ.',
      description:
        'XGBoost ಮತ್ತು Random Forest ಮಾದರಿಗಳು NPK, pH, ತೇವದ ಮೇಲೆ ವಿಶ್ಲೇಷಣೆ ಮಾಡಿ ಕ್ಷೇತ್ರಕ್ಕೆ ಸರಿಹೊಂದುವ ರಸಗೊಬ್ಬರ, ಪ್ರಮಾಣ ಮತ್ತು ಸಮಯ ಸೂಚಿಸುತ್ತವೆ.',
      fields: {
        ph: 'ಮಣ್ಣು pH',
        moisture: 'ತೇವ (%)',
        nitrogen: 'ನೈಟ್ರೋಜನ್ (ppm)',
        phosphorus: 'ಫಾಸ್ಫರಸ್ (ppm)',
        potassium: 'ಪೊಟ್ಯಾಸಿಯಮ್ (ppm)',
      },
      submit: 'ಶಿಫಾರಸು ಪಡೆಯಿರಿ',
    },
    analytics: {
      eyebrow: 'ಭವಿಷ್ಯ ವಿಶ್ಲೇಷಣೆ',
      title: 'LSTM ಉತ್ಪಾದನೆ + Prophet ಹವಾಮಾನ ಸೂಚನೆಗಳು.',
      description:
        'ಒಂದು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ಗಿವ್ಸ್, ಅಪಾಯ ಅಂಕಗಳು ಮತ್ತು ಸಲಹೆಗಳನ್ನು ನೋಡಿ.',
      form: {
        crop: 'ಬೆಳೆ',
        acreage: 'ಎಕರೆ (acres)',
        season: 'ಹಂಗಾಮು',
        placeholder: 'ಉದಾ: ಗೋಧಿ',
        select: 'ಆಯ್ಕೆ ಮಾಡಿ',
        submit: 'ಉತ್ಪಾದನೆ ಭವಿಷ್ಯ',
      },
      insightsTitle: 'ಪ್ರತ್ಯಕ್ಷ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಹೈಲೈಟ್ಸ್',
      insights: [
        'LSTM ಉತ್ಪಾದನೆ: 6 ವಾರಗಳ ಏರಿಕೆ, ಹಿಂದಿನ ಹಂಗಾಮಿಗಿಂತ +8%.',
        'Prophet ಹವಾಮಾನ ಅಪಾಯ: 3ನೇ ವಾರದಲ್ಲಿ ತೇವ ಹೆಚ್ಚಳ, ಫಂಗಲ್ ಎಚ್ಚರಿಕೆ.',
        'ಸ್ವಯಂಚಾಲನೆ: PDF ರಫ್ತು ಮತ್ತು ERP ಸಮನ್ವಯ.',
      ],
    },
    userManagement: {
      eyebrow: 'ಬಳಕೆದಾರ ನಿರ್ವಹಣೆ & ಡೇಟಾ',
      title: 'ಇತಿಹಾಸದಿಂದ ಸುರಕ್ಷಿತ ರೈತ ಖಾತೆಗಳು.',
      description:
        'ನೋಂದಣಿ, ಲಾಗಿನ್, ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಕೆ ಮತ್ತು ಮಲ್ಟಿ-ಡಿವೈಸು ಸಿಂಕ್ ಮೂಲಕ ಡೇಟಾ ಸುರಕ್ಷಿತ.',
      signup: 'ಸೈನ್ ಅಪ್',
      login: 'ಲಾಗಿನ್',
      signupButton: 'ಖಾತೆ ತೆರೆಯಿರಿ',
      loginButton: 'ಪ್ರವೇಶಿಸಿ',
      placeholders: {
        name: 'ಪೂರ್ಣ ಹೆಸರು',
        email: 'ಇಮೇಲ್ ವಿಳಾಸ',
        password: 'ಪಾಸ್ವರ್ಡ್',
      },
    },
    architecture: {
      eyebrow: 'ವ್ಯಾಸ್ಥು',
      title: 'React ಮುಂಭಾಗ ↔ FastAPI ಹಿಂಭಾಗ ↔ PostgreSQL & AI ಮಾದರಿಗಳು.',
      cards: [
        {
          title: 'ಮುಂಭಾಗ',
          description:
            'React + TypeScript, ಪ್ರತಿಕ್ರಿಯಾಶೀಲ ವಿನ್ಯಾಸ, ಸುರಕ್ಷಿತ JWT, API ಕ್ಲಯಿಂಟ್‌ಗಳು.',
        },
        {
          title: 'ಹಿಂಭಾಗ',
          description:
            'FastAPI CNN, XGBoost, Random Forest, LSTM, Prophet ಮಾದರಿಗಳನ್ನು ಸಂಯೋಜಿಸುತ್ತದೆ.',
        },
        {
          title: 'ಡೇಟಾಬೇಸ್ & ಸಂಗ್ರಹ',
          description:
            'PostgreSQL ಬಳಕೆದಾರರು, ಸಲಹೆಗಳು, ದಾಖಲೆಗಳನ್ನು ಸಂಗ್ರಹಿಸುತ್ತದೆ. ಆಬ್‌ಜೆಕ್ಟ್ ಸ್ಟೋರೇಜ್ ಮಾದರಿ ಆರ್ಕೈವ್ಸ್.',
        },
        {
          title: 'ಕಾರ್ಯಪ್ರವಾಹ',
          description:
            'React → FastAPI ಕರೆಗಳು → ಫಲಿತಾಂಶ ಕ್ಯಾಚೆ → WebSocket ಮುಖಾಂತರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ನವೀಕರಣ.',
        },
      ],
    },
    stack: {
      eyebrow: 'ತಂತ್ರಜ್ಞಾನ ಪಥ',
      title: 'ಆಧುನಿಕ, ವಿಸ್ತರಣಶೀಲ ವ್ಯವಸ್ಥೆ.',
      list: [
        { name: 'React.js', role: 'ಪ್ರತಿಕ್ರಿಯಾಶೀಲ UI ಮತ್ತು ರೂಟಿಂಗ್' },
        { name: 'FastAPI', role: 'ಕಡಿಮೆ ವಿಳಂಬದ API' },
        { name: 'PostgreSQL', role: 'ಡೇಟಾ ಸಂಗ್ರಹ' },
        { name: 'Docker', role: 'ಕಂಟೇನರ್ ಸೇವೆಗಳು' },
        { name: 'AWS / Azure / GCP', role: 'ಕ್ಲೌಡ್ ಏರ್ಪಾಟು' },
      ],
    },
    nonFunctional: [
      { title: 'ಕಾರ್ಯಕ್ಷಮತೆ', detail: '1.5 ಸೆಕೆಂಡ್ ಒಳಗೆ ಪ್ರತಿಕ್ರಿಯೆ' },
      { title: 'ವಿಸ್ತರಣಶೀಲತೆ', detail: 'ಕಂಟೇನರ್ ಆಧಾರಿತ ಹೋರಿಜೋಂಟಲ್ ಸ್ಕೇಲ್' },
      { title: 'ಭದ್ರತೆ', detail: 'HTTPS + JWT ಸೆಷನ್ ಕಾಯ್ದಿರಿಕೆ' },
      { title: 'ಬಳಕೆಸುಲಭತೆ', detail: 'ಮೊಬೈಲ್ ಸ್ನೇಹಿ UI' },
    ],
    deployment: {
      eyebrow: 'ಏರ್ಪಾಟು & ಪರೀಕ್ಷೆ',
      title: 'ಕ್ಲೌಡ್ ನೆಟಿವ್ ಡೆಲಿವರಿ.',
      deploymentTitle: 'ಏರ್ಪಾಟು ಅಗತ್ಯಗಳು',
      deploymentBullets: [
        'Docker/K8s ಮೂಲಕ ಕಂಟೇನರ್ ಸೇವೆಗಳು.',
        'GitHub Actions ಮೂಲಕ AWS/Azure/GCP ಗೆ CI/CD.',
        'HTTPS, WAF, ಸೀಕ್ರೆಟ್ ವಾಲ್ಟ್.',
      ],
      testingTitle: 'ಪರೀಕ್ಷಾ ಅಗತ್ಯಗಳು',
      testingBullets: [
        'ML API ಗಳಿಗೆ ಯುನಿಟ್ ಟೆಸ್ಟ್ (PyTest + FastAPI Client).',
        'React ↔ FastAPI ಏಕೀಕರಣ ಪರೀಕ್ಷೆಗಳು.',
        'ಬಹು ಸಾಧನಗಳಲ್ಲಿ UI/UX ಪರೀಕ್ಷೆ.',
      ],
    },
    contact: {
      eyebrow: 'ನಮ್ಮ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ',
      title: 'ಲೈವ್ ಡೆಮೊ ಅಥವಾ ವಿಶೇಷ ವಿವರಗಳನ್ನು ಕೇಳಿ.',
      description:
        'ಸ್ವಲ್ಪ ಮಾಹಿತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ, ನಾವು ಕ್ಯಾಲೆಂಡರ್ ಆಹ್ವಾನ ಮತ್ತು ಎರಕಗಟ್ಟಿದ ಚೆಕ್‌ಲಿಸ್ಟ್ ಒದಗಿಸುತ್ತೇವೆ.',
      fields: {
        name: 'ಪೂರ್ಣ ಹೆಸರು*',
        email: 'ಕಾರ್ಯ ಇಮೇಲ್*',
        org: 'ಸಂಸ್ಥೆ',
        message: 'ಸಂದೇಶ*',
      },
      placeholder: 'ನಿಮ್ಮ ಬೆಳೆ, ಎಕರೆ ಮತ್ತು ಗುರಿ ದಿನಾಂಕವನ್ನು ತಿಳಿಸಿ.',
      submit: 'ಡೆಮೊ ಬೇಡಿಕೆ',
      missing: 'ಅವಶ್ಯಕವಾದ ಕ್ಷೇತ್ರಗಳನ್ನು ಪೂರೈಸಿ.',
      success: 'ಧನ್ಯವಾದಗಳು! ಒಂದು ಕಾರ್ಯದಿನದಲ್ಲೇ ನಾವು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.',
    },
    messages: {
      fertilizerMissing: 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಮಣ್ಣಿನ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.',
      fertilizerLowPh:
        'ಮಣ್ಣು ಆಸಿಡಿಟಿಗೆ 40 ಕೆಜಿ/ಎಕರೆ NPK 10:26:26 ಜೊತೆಗೆ ಲೈಮ್ ಬಳಸಿ.',
      fertilizerBalanced:
        'ಸಮತೋಲನ ಬೆಳವಣಿಗೆಗೆ 25 ಕೆಜಿ/ಎಕರೆ ಯುರಿಯಾ ಹಾಗೂ ಸೂಕ್ಷ್ಮಾಂಶ ಮಿಶ್ರಣ ಬಳಸಿ.',
      forecastMissing: 'ಭಾವಿಷ್ಯ ಪಡೆಯಲು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಪೂರೈಸಿ.',
      forecastResult: (crop: string, season: string) =>
        `${season} ಹಂಗಾಮಿನಲ್ಲಿ ${crop}ಗಾಗಿ ನಿರೀಕ್ಷಿತ ಉತ್ಪಾದನೆ 32 ಕ್ವಿಂಟಲ್/ಎಕರೆ, ಮಧ್ಯಮ ಹವಾಮಾನ ಅಪಾಯ. LSTM ವಿಶ್ವಾಸ 87%, Prophet amber.`,
      diseaseHealthy: 'ಎಲೆ ಆರೋಗ್ಯಕರವಾಗಿದೆ. ನಿಯಮಿತವಾಗಿ ಗಮನಿಸಿ.',
      diseaseDetected: '{{disease}} ಪತ್ತೆಯಾಗಿದೆ. 48 ಗಂಟೆಯೊಳಗೆ ಚಿಕಿತ್ಸೆ ಆರಂಭಿಸಿ.',
    },
    detectionClasses: ['ಬ್ಲೈಟ್', 'ರಸ್ಟ್', 'ಲೀಫ್ ಸ್ಪಾಟ್', 'ಆರೋಗ್ಯಕर'],
    seasons: ['ಕರಿಫ್', 'ರಬಿ', 'ಗ್ರೀಷ್ಮ'],
    plantDoctor: {
      title: 'ಸಸ್ಯ ವೈದ್ಯ ಚಾಟ್‌ಬಾಟ್',
      description: 'AI ಸಹಾಯಕ - ಎಲೆ ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ, ಭವಿಷ್ಯಗಳನ್ನು ಪಡೆಯಿರಿ, ವಿವರಣೆಗಳು ಮತ್ತು ಸಾವಯವ ಚಿಕಿತ್ಸೆಗಳು',
      uploadImage: 'ಎಲೆ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
      analyzing: 'ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      prediction: 'ಭವಿಷ್ಯ',
      confidence: 'ವಿಶ್ವಾಸ',
      explanation: 'ವಿವರಣೆ',
      organicRemedies: 'ಸಾವಯವ ಚಿಕಿತ್ಸೆಗಳು',
      preventionTips: 'ತಡೆಗಟ್ಟುವ ಸಲಹೆಗಳು',
      chatPlaceholder: 'ಸಸ್ಯ ರೋಗಗಳು, ಚಿಕಿತ್ಸೆಗಳು ಅಥವಾ ಕೃಷಿ ಸಲಹೆಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ...',
      sendMessage: 'ಕಳುಹಿಸಿ'
    },
    voiceDiagnosis: {
      title: 'ಧ್ವನಿ-ಆಧಾರಿತ ಬೆಳೆ ರೋಗನಿರ್ಣಯ',
      description: 'ನಿಮ್ಮ ಬೆಳೆ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಮಾತನಾಡಿ ಮತ್ತು ತಕ್ಷಣದ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ',
      startRecording: 'ರೆಕಾರ್ಡಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
      stopRecording: 'ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ',
      listening: 'ಕೇಳಲಾಗುತ್ತಿದೆ...',
      processing: 'ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...',
      suggestions: 'ಸಲಹೆಗಳು',
      notSupported: 'ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆಯು ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಬೆಂಬಲಿಸಲ್ಪಡುವುದಿಲ್ಲ. ದಯವಿಟ್ಟು Chrome ಅಥವಾ Edge ಬಳಸಿ.'
    },
    weatherFertilizer: {
      title: 'ಸ್ವಯಂಚಾಲಿತ ಹವಾಮಾನ + ಮಣ್ಣು-ಆಧಾರಿತ ರಸಗೊಬ್ಬರ',
      description: 'ನೈಜ-ಸಮಯದ ಹವಾಮಾನ ಮತ್ತು ಮಣ್ಣಿನ ಡೇಟಾದ ಆಧಾರದ ಮೇಲೆ ಚಲನಶೀಲ ರಸಗೊಬ್ಬರ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ',
      location: 'ಸ್ಥಳ',
      getWeather: 'ಹವಾಮಾನ ಪಡೆಯಿರಿ',
      temperature: 'ತಾಪಮಾನ',
      rainfall: 'ಮಳೆ',
      humidity: 'ತೇವಾಂಶ',
      soilInput: 'ಮಣ್ಣಿನ ಇನ್ಪುಟ್',
      recommendation: 'ಶಿಫಾರಸು',
      weatherBased: 'ಹವಾಮಾನ ಡೇಟಾ'
    },
    cropCalendar: {
      title: 'ಡಿಜಿಟಲ್ ಬೆಳೆ ಬೆಳವಣಿಗೆ ಕ್ಯಾಲೆಂಡರ್',
      description: 'ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಬಿತ್ತನೆ ದಿನಾಂಕಗಳು, ರಸಗೊಬ್ಬರ ವೇಳಾಪಟ್ಟಿಗಳು, ನೀರಾವರಿ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಕೀಟ ನಿಯಂತ್ರಣ ಜ್ಞಾಪಕಗಳನ್ನು ಉತ್ಪಾದಿಸಿ',
      selectCrop: 'ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      sowingDate: 'ಬಿತ್ತನೆ ದಿನಾಂಕ',
      fertilizerSchedule: 'ರಸಗೊಬ್ಬರ ವೇಳಾಪಟ್ಟಿ',
      wateringAlerts: 'ನೀರಾವರಿ ಎಚ್ಚರಿಕೆಗಳು',
      pestControl: 'ಕೀಟ ನಿಯಂತ್ರಣ',
      generate: 'ಕ್ಯಾಲೆಂಡರ್ ಉತ್ಪಾದಿಸಿ',
      events: 'ಕ್ಯಾಲೆಂಡರ್ ಘಟನೆಗಳು'
    },
    communityForum: {
      title: 'ರೈತ ಸಮುದಾಯ ಫೋರಂ',
      description: 'ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ, ಪರಿಹಾರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ ಮತ್ತು ಸಹ ರೈತರಿಗೆ ಸಹಾಯ ಮಾಡಿ',
      askQuestion: 'ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ',
      uploadIssue: 'ಸಮಸ್ಯೆಯನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ',
      shareSolution: 'ಪರಿಹಾರವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
      upvote: 'ಅಪ್ವೋಟ್',
      answers: 'ಉತ್ತರಗಳು',
      postQuestion: 'ಪ್ರಶ್ನೆಯನ್ನು ಪೋಸ್ಟ್ ಮಾಡಿ',
      postAnswer: 'ಉತ್ತರವನ್ನು ಪೋಸ್ಟ್ ಮಾಡಿ',
      noQuestions: 'ಇನ್ನೂ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿಲ್ಲ. ಮೊದಲು ಕೇಳಲು ನೀವೇ ಆಗಿರಿ!'
    },
    heatmap: {
      title: 'ರೋಗ ಹರಡುವಿಕೆ ಹೀಟ್‌ಮ್ಯಾಪ್',
      description: 'ಕರ್ನಾಟಕ/ಭಾರತದಾದ್ಯಂತ ರೋಗ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು ಮತ್ತು ಬಾಧಿತ ಬೆಳೆಗಳನ್ನು ತೋರಿಸುವ ನೈಜ-ಸಮಯದ ನಕ್ಷೆ',
      diseaseHotspots: 'ರೋಗ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು',
      affectedCrops: 'ಬಾಧಿತ ಬೆಳೆಗಳು',
      riskPrediction: '7-ದಿನದ ಅಪಾಯ ಭವಿಷ್ಯ',
      next7Days: 'ಮುಂದಿನ 7 ದಿನಗಳು',
      viewMap: 'ನಕ್ಷೆಯನ್ನು ವೀಕ್ಷಿಸಿ',
      noData: 'ರೋಗ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ'
    },
    nutrientScanner: {
      title: 'ಪೋಷಕ ಕೊರತೆ ಸ್ಕ್ಯಾನರ್',
      description: 'ಪೋಷಕ ಕೊರತೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಕ್ಯಾಮೆರಾ ಬಳಸಿ ಸಸ್ಯ ಎಲೆಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
      openCamera: 'ಕ್ಯಾಮೆರಾ ತೆರೆಯಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
      scanning: 'ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ ಮತ್ತು ವಿಶ್ಲೇಷಿಸಿ',
      nitrogenDeficiency: 'ನೈಟ್ರೋಜನ್ ಕೊರತೆ',
      phosphorusDeficiency: 'ಫಾಸ್ಫರಸ್ ಕೊರತೆ',
      potassiumDeficiency: 'ಪೊಟ್ಯಾಸಿಯಮ್ ಕೊರತೆ',
      healthy: 'ಆರೋಗ್ಯಕರ',
      recommendations: 'ಶಿಫಾರಸುಗಳು'
    },
    organicRecommendations: {
      title: 'ಸಾವಯವ ಕೃಷಿ ಶಿಫಾರಸುಗಳು',
      description: 'ಸಸ್ಯ ರೋಗಗಳಿಗೆ ಪರಿಸರ-ಸ್ನೇಹಿ ಸಾವಯವ ಚಿಕಿತ್ಸೆಗಳು',
      neemOil: 'ನೀಂ ಎಣ್ಣೆ ಸ್ಪ್ರೇ',
      bakingSoda: 'ಬೇಕಿಂಗ್ ಸೋಡಾ ದ್ರಾವಣ',
      organicFertilizers: 'ಸಾವಯವ ರಸಗೊಬ್ಬರಗಳು',
      ecoFriendly: '100% ಸಾವಯವ ಮತ್ತು ಪರಿಸರ-ಸ್ನೇಹಿ',
      applyNow: 'ಈಗ ಅನ್ವಯಿಸಿ'
    },
    marketplace: {
      title: 'ಬೀಜಗಳು ಮತ್ತು ರಸಗೊಬ್ಬರಗಳಿಗಾಗಿ ಮಾರುಕಟ್ಟೆ',
      description: 'ಕೃಷಿ ಉತ್ಪನ್ನಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ, ಹೋಲಿಸಿ ಮತ್ತು ಆರ್ಡರ್ ಮಾಡಿ',
      seeds: 'ಬೀಜಗಳು',
      fertilizers: 'ರಸಗೊಬ್ಬರಗಳು',
      compare: 'ಹೋಲಿಸಿ',
      reviews: 'ವಿಮರ್ಶೆಗಳು',
      addToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
      viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      price: 'ಧರ',
      rating: 'ರೇಟಿಂಗ್',
      inStock: 'ಸ್ಟಾಕ್‌ನಲ್ಲಿ',
      outOfStock: 'ಸ್ಟಾಕ್‌ನಲ್ಲಿ ಇಲ್ಲ'
    },
    login: {
      title: 'AgriSense ಗೆ ಲಾಗಿನ್ ಮಾಡಿ',
      description: 'ಎಲ್ಲಾ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಪ್ರವೇಶಿಸಲು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ',
      signInWithGoogle: 'Google ನೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ',
      phoneNumber: 'ಫೋನ್ ಸಂಖ್ಯೆ',
      phonePlaceholder: 'ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ (ಉದಾ., +91 9876543210)',
      sendOTP: 'OTP ಕಳುಹಿಸಿ',
      enterOTP: 'OTP ನಮೂದಿಸಿ',
      otpPlaceholder: '6-ಅಂಕಿಯ OTP ನಮೂದಿಸಿ',
      verifyOTP: 'OTP ಪರಿಶೀಲಿಸಿ',
      resendOTP: 'OTP ಮರುಕಳುಹಿಸಿ',
      otpSent: 'OTP ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಲಾಗಿದೆ',
      otpVerified: 'ಫೋನ್ ಸಂಖ್ಯೆ ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ!',
      invalidOTP: 'ಅಮಾನ್ಯ OTP. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      loginSuccess: 'ಲಾಗಿನ್ ಯಶಸ್ವಿ!',
      logout: 'ಲಾಗ್ ಔಟ್',
      welcome: 'ಸ್ವಾಗತ',
      loggedInAs: 'ಲಾಗ್ ಇನ್ ಆಗಿದ್ದೀರಿ'
    },
  },
  hi: {
    languageName: 'हिंदी',
    languageSwitcher: 'भाषा',
    navLinks: [
      { label: 'होम', href: '/home' },
      { label: 'प्लांट डॉक्टर', href: '/plant-doctor' },
      { label: 'आवाज निदान', href: '/voice' },
      { label: 'मौसम उर्वरक', href: '/weather-fertilizer' },
      { label: 'फसल कैलेंडर', href: '/calendar' },
      { label: 'हीटमैप', href: '/heatmap' },
      { label: 'जैविक', href: '/organic' },
      { label: 'संपर्क', href: '/contact' },
    ],
    hero: {
      eyebrow: 'सूक्ष्म कृषि के लिए AI',
      title: 'एक स्मार्ट वर्कस्पेस में फसल स्वास्थ्य का निदान, सिफारिश और पूर्वानुमान करें।',
      lead: 'AgriSense CNN रोग पहचान, मिट्टी-जागरूक उर्वरक सिफारिशें, और LSTM + Prophet भविष्य कथन को एक उत्तरदायी इंटरफेस में जोड़ता है।',
      primaryCta: 'रोग पहचान आज़माएं',
      secondaryCta: 'भविष्य कथन डैशबोर्ड देखें',
      goals: ['रियलटाइम CNN अनुमान', 'उर्वरक ML सहायक', 'LSTM & Prophet पूर्वानुमान', 'उत्तरदायी किसान UI'],
    },
    modules: [
      {
        title: 'रोग पहचान',
        description: 'उच्च-रिज़ॉल्यूशन पत्ती छवियां अपलोड करें। हमारा CNN पाइपलाइन 50+ रोग श्रेणियों को वर्गीकृत करता है।',
        badge: 'CNN + Vision Transformers',
      },
      {
        title: 'उर्वरक लैब',
        description: 'मिट्टी सेंसर रीडिंग (pH, नमी, NPK) दर्ज करें सटीक उर्वरक सुझाव प्राप्त करने के लिए।',
        badge: 'मिट्टी-जागरूक ML',
      },
      {
        title: 'भविष्य कथन डैशबोर्ड',
        description: 'LSTM उपज पूर्वानुमान और Prophet-आधारित मौसम प्रवृत्तियां जल्दी जोखिम संकेत दिखाती हैं।',
        badge: 'पूर्वानुमान सुइट',
      },
      {
        title: 'किसान वर्कस्पेस',
        description: 'सुरक्षित लॉगिन, पिछले निदान, उर्वरक योजनाएं और पूर्वानुमान स्नैपशॉट PostgreSQL में सिंक होते हैं।',
        badge: 'उपयोगकर्ता वॉल्ट',
      },
    ],
    detection: {
      eyebrow: 'रोग पहचान मॉड्यूल',
      title: 'फसल रोगों को वर्गीकृत करने के लिए पत्ती छवि अपलोड करें।',
      description: 'FastAPI अनुमान एंडपॉइंट CNN और Vision Transformer एन्सेम्बल होस्ट करता है।',
      bullets: ['CNN फीचर एक्सट्रैक्टर', 'विश्वास स्कोर, रोग विवरण, और उपचार सुझाव', 'परिणाम किसान इतिहास में सहेजे जाते हैं'],
      uploadLabel: 'पत्ती छवि अपलोड करें',
      placeholder: 'अपलोड के बाद वर्गीकरण परिणाम यहां दिखाई देंगे।',
      healthy: 'पत्ती स्वस्थ दिखती है। नियमित निगरानी की सिफारिश करें।',
      diseaseAdvice: '{{disease}} का पता चला। 48 घंटों के भीतर अनुशंसित उपचार लागू करें।',
    },
    fertilizer: {
      eyebrow: 'उर्वरक सिफारिश मॉड्यूल',
      title: 'मिट्टी सेंसर मानों को क्रियाशील उर्वरक योजनाओं में अनुवाद करें।',
      description: 'XGBoost और Random Forest मॉडल NPK, pH, और नमी का विश्लेषण करते हैं।',
      fields: {
        ph: 'मिट्टी pH',
        moisture: 'नमी (%)',
        nitrogen: 'नाइट्रोजन (ppm)',
        phosphorus: 'फॉस्फोरस (ppm)',
        potassium: 'पोटैशियम (ppm)',
      },
      submit: 'सिफारिश उत्पन्न करें',
    },
    analytics: {
      eyebrow: 'भविष्य कथन विश्लेषण',
      title: 'LSTM उपज पूर्वानुमान + Prophet मौसम संकेत।',
      description: 'एकीकृत डैशबोर्ड पूर्वानुमान वक्र, जोखिम स्कोर और सलाहकार अंतर्दृष्टि दिखाता है।',
      form: {
        crop: 'फसल',
        acreage: 'एकड़ (एकड़)',
        season: 'मौसम',
        placeholder: 'उदा., गेहूं',
        select: 'चुनें',
        submit: 'उपज पूर्वानुमान',
      },
      insightsTitle: 'लाइव डैशबोर्ड अंतर्दृष्टि',
      insights: [
        'LSTM उपज वक्र: 6-सप्ताह की ऊपर की प्रवृत्ति, पिछले मौसम की तुलना में +8%।',
        'Prophet मौसम जोखिम: सप्ताह 3 के आसपास आर्द्रता में वृद्धि; फंगल प्रकोप के लिए अलर्ट।',
        'स्वचालन: PDF को निर्यात करें और सुरक्षित API के माध्यम से फार्म ERP के साथ सिंक करें।',
      ],
    },
    userManagement: {
      eyebrow: 'उपयोगकर्ता प्रबंधन और डेटा',
      title: 'डेटा इतिहास के साथ सुरक्षित किसान खाते।',
      description: 'पंजीकरण, लॉगिन, पासवर्ड रिकवरी, और मल्टी-डिवाइस सिंक डेटा को सुरक्षित रखते हैं।',
      signup: 'साइन अप',
      login: 'लॉग इन',
      signupButton: 'खाता बनाएं',
      loginButton: 'साइन इन करें',
      placeholders: {
        name: 'पूरा नाम',
        email: 'ईमेल पता',
        password: 'पासवर्ड',
      },
    },
    contact: {
      eyebrow: 'हमारी टीम से बात करें',
      title: 'लाइव डेमो शेड्यूल करें या अनुकूलित विनिर्देश अनुरोध करें।',
      description: 'कुछ विवरण साझा करें और हम आपके फार्म संचालन के लिए एक कैलेंडर आमंत्रण भेजेंगे।',
      fields: {
        name: 'पूरा नाम*',
        email: 'कार्य ईमेल*',
        org: 'संगठन',
        message: 'संदेश*',
      },
      placeholder: 'अपनी फसलों, एकड़ और वांछित गो-लाइव तिथि के बारे में बताएं।',
      submit: 'डेमो अनुरोध',
      missing: 'कृपया आवश्यक फ़ील्ड पूरा करें।',
      success: 'धन्यवाद! हमारी टीम एक व्यावसायिक दिन के भीतर संपर्क करेगी।',
    },
    messages: {
      fertilizerMissing: 'कृपया सभी मिट्टी मापदंड भरें।',
      fertilizerLowPh: 'मिट्टी की अम्लता को संतुलित करने के लिए 40 किग्रा/एकड़ NPK 10:26:26 चूने के साथ लगाएं।',
      fertilizerBalanced: 'संतुलित विकास के लिए 25 किग्रा/एकड़ यूरिया सूक्ष्म पोषक तत्व मिश्रण के साथ लगाएं।',
      forecastMissing: 'पूर्वानुमान उत्पन्न करने के लिए सभी फ़ील्ड पूरा करें।',
      forecastResult: (crop: string, season: string) =>
        `${season} मौसम में ${crop} के लिए अनुमानित उपज 32 q/एकड़ है, मध्यम मौसम जोखिम के साथ।`,
      diseaseHealthy: 'पत्ती स्वस्थ दिखती है। नियमित निगरानी की सिफारिश करें।',
      diseaseDetected: '{{disease}} का पता चला। 48 घंटों के भीतर अनुशंसित उपचार लागू करें।',
    },
    detectionClasses: ['ब्लाइट', 'रस्ट', 'लीफ स्पॉट', 'स्वस्थ'],
    seasons: ['खरीफ', 'रबी', 'ग्रीष्म'],
    plantDoctor: {
      title: 'प्लांट डॉक्टर चैटबॉट',
      description: 'AI सहायक - पत्ती छवि अपलोड करें, भविष्यवाणियां प्राप्त करें, स्पष्टीकरण और जैविक उपचार',
      uploadImage: 'पत्ती छवि अपलोड करने के लिए क्लिक करें',
      analyzing: 'छवि का विश्लेषण किया जा रहा है...',
      prediction: 'भविष्यवाणी',
      confidence: 'विश्वास',
      explanation: 'स्पष्टीकरण',
      organicRemedies: 'जैविक उपचार',
      preventionTips: 'रोकथाम सुझाव',
      chatPlaceholder: 'पौधों की बीमारियों, उपचारों या खेती के सुझावों के बारे में प्रश्न पूछें...',
      sendMessage: 'भेजें'
    },
    voiceDiagnosis: {
      title: 'आवाज-आधारित फसल निदान',
      description: 'अपने फसल लक्षण बोलें और तत्काल सुझाव प्राप्त करें',
      startRecording: 'रिकॉर्डिंग शुरू करें',
      stopRecording: 'रिकॉर्डिंग रोकें',
      listening: 'सुन रहे हैं...',
      processing: 'आपके लक्षणों को संसाधित किया जा रहा है...',
      suggestions: 'सुझाव',
      notSupported: 'आवाज पहचान आपके ब्राउज़र में समर्थित नहीं है। कृपया Chrome या Edge का उपयोग करें।'
    },
    weatherFertilizer: {
      title: 'स्वचालित मौसम + मिट्टी-आधारित उर्वरक',
      description: 'वास्तविक समय मौसम और मिट्टी डेटा के आधार पर गतिशील उर्वरक सिफारिशें प्राप्त करें',
      location: 'स्थान',
      getWeather: 'मौसम प्राप्त करें',
      temperature: 'तापमान',
      rainfall: 'वर्षा',
      humidity: 'आर्द्रता',
      soilInput: 'मिट्टी इनपुट',
      recommendation: 'सिफारिश',
      weatherBased: 'मौसम डेटा'
    },
    cropCalendar: {
      title: 'डिजिटल फसल विकास कैलेंडर',
      description: 'स्वचालित रूप से बुवाई तिथियां, उर्वरक कार्यक्रम, सिंचाई अलर्ट और कीट नियंत्रण अनुस्मारक उत्पन्न करें',
      selectCrop: 'फसल चुनें',
      sowingDate: 'बुवाई तिथि',
      fertilizerSchedule: 'उर्वरक कार्यक्रम',
      wateringAlerts: 'सिंचाई अलर्ट',
      pestControl: 'कीट नियंत्रण',
      generate: 'कैलेंडर उत्पन्न करें',
      events: 'कैलेंडर घटनाएं'
    },
    communityForum: {
      title: 'किसान समुदाय फोरम',
      description: 'प्रश्न पूछें, समाधान साझा करें और साथी किसानों की मदद करें',
      askQuestion: 'एक प्रश्न पूछें',
      uploadIssue: 'समस्या अपलोड करें',
      shareSolution: 'समाधान साझा करें',
      upvote: 'अपवोट',
      answers: 'उत्तर',
      postQuestion: 'प्रश्न पोस्ट करें',
      postAnswer: 'उत्तर पोस्ट करें',
      noQuestions: 'अभी तक कोई प्रश्न नहीं। पहले पूछने वाले बनें!'
    },
    heatmap: {
      title: 'रोग फैलाव हीटमैप',
      description: 'कर्नाटक/भारत भर में रोग हॉटस्पॉट और प्रभावित फसलों को दिखाने वाला वास्तविक समय नक्शा',
      diseaseHotspots: 'रोग हॉटस्पॉट',
      affectedCrops: 'प्रभावित फसलें',
      riskPrediction: '7-दिवसीय जोखिम भविष्यवाणी',
      next7Days: 'अगले 7 दिन',
      viewMap: 'नक्शा देखें',
      noData: 'रोग डेटा उपलब्ध नहीं'
    },
    nutrientScanner: {
      title: 'पोषक कमी स्कैनर',
      description: 'पोषक कमियों का पता लगाने के लिए कैमरे का उपयोग करके पौधे की पत्तियों को स्कैन करें',
      openCamera: 'कैमरा खोलने के लिए क्लिक करें',
      scanning: 'कैप्चर और विश्लेषण',
      nitrogenDeficiency: 'नाइट्रोजन की कमी',
      phosphorusDeficiency: 'फॉस्फोरस की कमी',
      potassiumDeficiency: 'पोटैशियम की कमी',
      healthy: 'स्वस्थ',
      recommendations: 'सिफारिशें'
    },
    organicRecommendations: {
      title: 'जैविक खेती सिफारिशें',
      description: 'पौधों की बीमारियों के लिए पर्यावरण-अनुकूल जैविक उपचार',
      neemOil: 'नीम तेल स्प्रे',
      bakingSoda: 'बेकिंग सोडा घोल',
      organicFertilizers: 'जैविक उर्वरक',
      ecoFriendly: '100% जैविक और पर्यावरण-अनुकूल',
      applyNow: 'अभी लागू करें'
    },
    marketplace: {
      title: 'बीज और उर्वरक के लिए बाजार',
      description: 'कृषि उत्पादों को ब्राउज़ करें, तुलना करें और ऑर्डर करें',
      seeds: 'बीज',
      fertilizers: 'उर्वरक',
      compare: 'तुलना करें',
      reviews: 'समीक्षाएं',
      addToCart: 'कार्ट में जोड़ें',
      viewDetails: 'विवरण देखें',
      price: 'कीमत',
      rating: 'रेटिंग',
      inStock: 'स्टॉक में',
      outOfStock: 'स्टॉक में नहीं'
    },
    login: {
      title: 'AgriSense में लॉगिन करें',
      description: 'सभी सुविधाओं तक पहुंचने के लिए अपनी व्यक्तिगत जानकारी दर्ज करें',
      signInWithGoogle: 'Google के साथ साइन इन करें',
      phoneNumber: 'फोन नंबर',
      phonePlaceholder: 'अपना फोन नंबर दर्ज करें (उदा., +91 9876543210)',
      sendOTP: 'OTP भेजें',
      enterOTP: 'OTP दर्ज करें',
      otpPlaceholder: '6 अंकों का OTP दर्ज करें',
      verifyOTP: 'OTP सत्यापित करें',
      resendOTP: 'OTP पुनः भेजें',
      otpSent: 'OTP आपके फोन नंबर पर भेजा गया है',
      otpVerified: 'फोन नंबर सफलतापूर्वक सत्यापित!',
      invalidOTP: 'अमान्य OTP. कृपया पुनः प्रयास करें.',
      loginSuccess: 'लॉगिन सफल!',
      logout: 'लॉगआउट',
      welcome: 'स्वागत है',
      loggedInAs: 'लॉग इन किया गया'
    },
    architecture: {
      eyebrow: 'सिस्टम आर्किटेक्चर',
      title: 'React frontend ↔ FastAPI backend ↔ PostgreSQL & AI models.',
      cards: [
        { title: 'Frontend', description: 'React + TypeScript, component-driven UI, responsive layout.' },
        { title: 'Backend', description: 'FastAPI orchestrates CNN, XGBoost, Random Forest, LSTM, and Prophet models.' },
        { title: 'Database & Storage', description: 'PostgreSQL stores user profiles, soil samples, predictions.' },
        { title: 'Workflow', description: 'React calls FastAPI → models infer → results cached → UI updates.' },
      ],
    },
    stack: {
      eyebrow: 'Technology Stack',
      title: 'Modern, scalable stack for precision agriculture.',
      list: [
        { name: 'React.js', role: 'Responsive client UI & routing' },
        { name: 'FastAPI', role: 'Low-latency inference APIs' },
        { name: 'PostgreSQL', role: 'Storage for historical agronomic data' },
        { name: 'Docker', role: 'Portable containerized services' },
        { name: 'AWS / Azure / GCP', role: 'Scalable managed deployments' },
      ],
    },
    nonFunctional: [
      { title: 'Performance', detail: 'Realtime inferencing under 1.5s' },
      { title: 'Scalability', detail: 'Horizontal autoscale with containers' },
      { title: 'Security', detail: 'HTTPS + JWT-based session handling' },
      { title: 'Usability', detail: 'Mobile-first layout for on-field use' },
    ],
    deployment: {
      eyebrow: 'Deployment & Testing',
      title: 'Cloud-native delivery with end-to-end test coverage.',
      deploymentTitle: 'Deployment Requirements',
      deploymentBullets: [
        'Containerized services via Docker Compose / Kubernetes.',
        'CI/CD on GitHub Actions to AWS, Azure, or GCP.',
        'HTTPS termination, WAF, secrets vault.',
      ],
      testingTitle: 'Testing Requirements',
      testingBullets: [
        'Unit tests for ML APIs (PyTest + FastAPI test client).',
        'Integration tests across React ↔ FastAPI flows.',
        'Manual + automated UI/UX testing on multiple devices.',
      ],
    },
  },
  // Basic structures for other languages (can be expanded)
  te: {
    languageName: 'తెలుగు',
    languageSwitcher: 'భాష',
    navLinks: [
      { label: 'హోమ్', href: '/home' },
      { label: 'ప్లాంట్ డాక్టర్', href: '/plant-doctor' },
      { label: 'వాయిస్ డయాగ్నోసిస్', href: '/voice' },
      { label: 'వాతావరణ ఎరువు', href: '/weather-fertilizer' },
      { label: 'పంట క్యాలెండర్', href: '/calendar' },
      { label: 'హీట్‌మ్యాప్', href: '/heatmap' },
      { label: 'సేంద్రియ', href: '/organic' },
      { label: 'సంపర్కం', href: '/contact' },
    ],
    hero: { eyebrow: '', title: 'AgriSense', lead: '', primaryCta: '', secondaryCta: '', goals: [] },
    modules: [],
    detection: { eyebrow: '', title: '', description: '', bullets: [], uploadLabel: '', placeholder: '', healthy: '', diseaseAdvice: '' },
    fertilizer: { eyebrow: '', title: '', description: '', fields: {}, submit: '' },
    analytics: { eyebrow: '', title: '', description: '', form: { crop: '', acreage: '', season: '', placeholder: '', select: '', submit: '' }, insightsTitle: '', insights: [] },
    userManagement: { eyebrow: '', title: '', description: '', signup: '', login: '', signupButton: '', loginButton: '', placeholders: { name: '', email: '', password: '' } },
    contact: { eyebrow: '', title: '', description: '', fields: { name: '', email: '', org: '', message: '' }, placeholder: '', submit: '', missing: '', success: '' },
    messages: { fertilizerMissing: '', fertilizerLowPh: '', fertilizerBalanced: '', forecastMissing: '', forecastResult: () => '', diseaseHealthy: '', diseaseDetected: '' },
    detectionClasses: [],
    seasons: [],
    architecture: {
      eyebrow: '',
      title: '',
      cards: [],
    },
    stack: {
      eyebrow: '',
      title: '',
      list: [],
    },
    nonFunctional: [],
    deployment: {
      eyebrow: '',
      title: '',
      deploymentTitle: '',
      deploymentBullets: [],
      testingTitle: '',
      testingBullets: [],
    },
    login: {
      title: 'AgriSense లోకి లాగిన్ చేయండి',
      description: 'అన్ని లక్షణాలను యాక్సెస్ చేయడానికి మీ వ్యక్తిగత వివరాలను నమోదు చేయండి',
      signInWithGoogle: 'Google తో సైన్ ఇన్ చేయండి',
      phoneNumber: 'ఫోన్ నంబర్',
      phonePlaceholder: 'మీ ఫోన్ నంబర్ నమోదు చేయండి (ఉదా., +91 9876543210)',
      sendOTP: 'OTP పంపండి',
      enterOTP: 'OTP నమోదు చేయండి',
      otpPlaceholder: '6 అంకెల OTP నమోదు చేయండి',
      verifyOTP: 'OTP ధృవీకరించండి',
      resendOTP: 'OTP మళ్లీ పంపండి',
      otpSent: 'OTP మీ ఫోన్ నంబర్‌కు పంపబడింది',
      otpVerified: 'ఫోన్ నంబర్ విజయవంతంగా ధృవీకరించబడింది!',
      invalidOTP: 'చెల్లని OTP. దయచేసి మళ్లీ ప్రయత్నించండి.',
      loginSuccess: 'లాగిన్ విజయవంతం!',
      logout: 'లాగ్ అవుట్',
      welcome: 'స్వాగతం',
      loggedInAs: 'లాగ్ ఇన్ చేయబడింది'
    },
  },
  ta: {
    languageName: 'தமிழ்',
    languageSwitcher: 'மொழி',
    navLinks: [
      { label: 'வீடு', href: '/home' },
      { label: 'தாவர மருத்துவர்', href: '/plant-doctor' },
      { label: 'குரல் நோயறிதல்', href: '/voice' },
      { label: 'வானிலை உரம்', href: '/weather-fertilizer' },
      { label: 'பயிர் நாட்காட்டி', href: '/calendar' },
      { label: 'வெப்ப வரைபடம்', href: '/heatmap' },
      { label: 'கரிம', href: '/organic' },
      { label: 'தொடர்பு', href: '/contact' },
    ],
    hero: { eyebrow: '', title: 'AgriSense', lead: '', primaryCta: '', secondaryCta: '', goals: [] },
    modules: [],
    detection: { eyebrow: '', title: '', description: '', bullets: [], uploadLabel: '', placeholder: '', healthy: '', diseaseAdvice: '' },
    fertilizer: { eyebrow: '', title: '', description: '', fields: {}, submit: '' },
    analytics: { eyebrow: '', title: '', description: '', form: { crop: '', acreage: '', season: '', placeholder: '', select: '', submit: '' }, insightsTitle: '', insights: [] },
    userManagement: { eyebrow: '', title: '', description: '', signup: '', login: '', signupButton: '', loginButton: '', placeholders: { name: '', email: '', password: '' } },
    contact: { eyebrow: '', title: '', description: '', fields: { name: '', email: '', org: '', message: '' }, placeholder: '', submit: '', missing: '', success: '' },
    messages: { fertilizerMissing: '', fertilizerLowPh: '', fertilizerBalanced: '', forecastMissing: '', forecastResult: () => '', diseaseHealthy: '', diseaseDetected: '' },
    detectionClasses: [],
    seasons: [],
    architecture: {
      eyebrow: '',
      title: '',
      cards: [],
    },
    stack: {
      eyebrow: '',
      title: '',
      list: [],
    },
    nonFunctional: [],
    deployment: {
      eyebrow: '',
      title: '',
      deploymentTitle: '',
      deploymentBullets: [],
      testingTitle: '',
      testingBullets: [],
    },
    login: {
      title: 'AgriSense இல் உள்நுழையவும்',
      description: 'அனைத்து அம்சங்களையும் அணுக உங்கள் தனிப்பட்ட விவரங்களை உள்ளிடவும்',
      signInWithGoogle: 'Google உடன் உள்நுழையவும்',
      phoneNumber: 'தொலைபேசி எண்',
      phonePlaceholder: 'உங்கள் தொலைபேசி எண்ணை உள்ளிடவும் (எ.கா., +91 9876543210)',
      sendOTP: 'OTP அனுப்பவும்',
      enterOTP: 'OTP உள்ளிடவும்',
      otpPlaceholder: '6 இலக்க OTP உள்ளிடவும்',
      verifyOTP: 'OTP சரிபார்க்கவும்',
      resendOTP: 'OTP மீண்டும் அனுப்பவும்',
      otpSent: 'OTP உங்கள் தொலைபேசி எண்ணுக்கு அனுப்பப்பட்டது',
      otpVerified: 'தொலைபேசி எண் வெற்றிகரமாக சரிபார்க்கப்பட்டது!',
      invalidOTP: 'தவறான OTP. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
      loginSuccess: 'உள்நுழைவு வெற்றிகரமானது!',
      logout: 'வெளியேற',
      welcome: 'வரவேற்கிறோம்',
      loggedInAs: 'உள்நுழைந்துள்ளார்'
    },
  },
  mr: {
    languageName: 'मराठी',
    languageSwitcher: 'भाषा',
    navLinks: [
      { label: 'होम', href: '/home' },
      { label: 'प्लांट डॉक्टर', href: '/plant-doctor' },
      { label: 'आवाज निदान', href: '/voice' },
      { label: 'हवामान खत', href: '/weather-fertilizer' },
      { label: 'पीक कॅलेंडर', href: '/calendar' },
      { label: 'हीटमॅप', href: '/heatmap' },
      { label: 'सेंद्रिय', href: '/organic' },
      { label: 'संपर्क', href: '/contact' },
    ],
    hero: { eyebrow: '', title: 'AgriSense', lead: '', primaryCta: '', secondaryCta: '', goals: [] },
    modules: [],
    detection: { eyebrow: '', title: '', description: '', bullets: [], uploadLabel: '', placeholder: '', healthy: '', diseaseAdvice: '' },
    fertilizer: { eyebrow: '', title: '', description: '', fields: {}, submit: '' },
    analytics: { eyebrow: '', title: '', description: '', form: { crop: '', acreage: '', season: '', placeholder: '', select: '', submit: '' }, insightsTitle: '', insights: [] },
    userManagement: { eyebrow: '', title: '', description: '', signup: '', login: '', signupButton: '', loginButton: '', placeholders: { name: '', email: '', password: '' } },
    contact: { eyebrow: '', title: '', description: '', fields: { name: '', email: '', org: '', message: '' }, placeholder: '', submit: '', missing: '', success: '' },
    messages: { fertilizerMissing: '', fertilizerLowPh: '', fertilizerBalanced: '', forecastMissing: '', forecastResult: () => '', diseaseHealthy: '', diseaseDetected: '' },
    detectionClasses: [],
    seasons: [],
    architecture: {
      eyebrow: '',
      title: '',
      cards: [],
    },
    stack: {
      eyebrow: '',
      title: '',
      list: [],
    },
    nonFunctional: [],
    deployment: {
      eyebrow: '',
      title: '',
      deploymentTitle: '',
      deploymentBullets: [],
      testingTitle: '',
      testingBullets: [],
    },
    login: {
      title: 'AgriSense मध्ये लॉगिन करा',
      description: 'सर्व वैशिष्ट्यांमध्ये प्रवेश करण्यासाठी आपली वैयक्तिक माहिती प्रविष्ट करा',
      signInWithGoogle: 'Google सह साइन इन करा',
      phoneNumber: 'फोन नंबर',
      phonePlaceholder: 'आपला फोन नंबर प्रविष्ट करा (उदा., +91 9876543210)',
      sendOTP: 'OTP पाठवा',
      enterOTP: 'OTP प्रविष्ट करा',
      otpPlaceholder: '6 अंकी OTP प्रविष्ट करा',
      verifyOTP: 'OTP सत्यापित करा',
      resendOTP: 'OTP पुन्हा पाठवा',
      otpSent: 'OTP आपल्या फोन नंबरवर पाठवला गेला आहे',
      otpVerified: 'फोन नंबर यशस्वीरित्या सत्यापित झाला!',
      invalidOTP: 'अवैध OTP. कृपया पुन्हा प्रयत्न करा.',
      loginSuccess: 'लॉगिन यशस्वी!',
      logout: 'लॉगआउट',
      welcome: 'स्वागत आहे',
      loggedInAs: 'लॉग इन केले'
    },
  },
}

