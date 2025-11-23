import { useState } from 'react'
import './OrganicRecommendations.css'

interface OrganicRecommendationsProps {
  locale: string
  t: any
  diseaseName?: string
}

export default function OrganicRecommendations({ locale, t, diseaseName }: OrganicRecommendationsProps) {
  const [selectedRemedy, setSelectedRemedy] = useState<string | null>(null)

  const remedies = [
    {
      id: 'neem',
      name: locale === 'en' ? 'Neem Oil Spray' : locale === 'kn' ? 'ನೀಂ ಎಣ್ಣೆ ಸ್ಪ್ರೇ' : locale === 'hi' ? 'नीम तेल स्प्रे' : 'Neem Oil',
      description: locale === 'en' 
        ? 'Effective against fungal diseases, pests, and insects. Mix 2ml neem oil per liter of water with a few drops of liquid soap.'
        : locale === 'kn'
        ? 'ಫಂಗಲ್ ರೋಗಗಳು, ಕೀಟಗಳು ಮತ್ತು ಕೀಟಗಳ ವಿರುದ್ಧ ಪರಿಣಾಮಕಾರಿ. ನೀರಿನ ಪ್ರತಿ ಲೀಟರ್ಗೆ 2ml ನೀಂ ಎಣ್ಣೆಯನ್ನು ಕೆಲವು ಹನಿಗಳ ದ್ರವ ಸಾಬೂನಿನೊಂದಿಗೆ ಮಿಶ್ರಣ ಮಾಡಿ.'
        : locale === 'hi'
        ? 'फंगल रोगों, कीटों और कीड़ों के खिलाफ प्रभावी। पानी के प्रति लीटर में 2ml नीम तेल को कुछ बूंदों तरल साबुन के साथ मिलाएं।'
        : 'Effective against fungal diseases',
      ingredients: locale === 'en' 
        ? '2ml neem oil, 1 liter water, 2-3 drops liquid soap'
        : locale === 'kn'
        ? '2ml ನೀಂ ಎಣ್ಣೆ, 1 ಲೀಟರ್ ನೀರು, 2-3 ಹನಿಗಳ ದ್ರವ ಸಾಬೂನು'
        : locale === 'hi'
        ? '2ml नीम तेल, 1 लीटर पानी, 2-3 बूंदें तरल साबुन'
        : 'Neem oil, water, soap',
      application: locale === 'en'
        ? 'Spray early morning or evening. Repeat every 7-10 days.'
        : locale === 'kn'
        ? 'ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ಸ್ಪ್ರೇ ಮಾಡಿ. ಪ್ರತಿ 7-10 ದಿನಗಳಿಗೊಮ್ಮೆ ಪುನರಾವರ್ತಿಸಿ.'
        : locale === 'hi'
        ? 'सुबह या शाम को स्प्रे करें। हर 7-10 दिनों में दोहराएं।'
        : 'Spray morning/evening'
    },
    {
      id: 'baking-soda',
      name: locale === 'en' ? 'Baking Soda Solution' : locale === 'kn' ? 'ಬೇಕಿಂಗ್ ಸೋಡಾ ದ್ರಾವಣ' : locale === 'hi' ? 'बेकिंग सोडा घोल' : 'Baking Soda',
      description: locale === 'en'
        ? 'Prevents and treats powdery mildew. Mix 1 teaspoon baking soda, 1 teaspoon vegetable oil, and 1 liter water.'
        : locale === 'kn'
        ? 'ಪೌಡರಿ ಮಿಲ್ಡ್ಯೂವನ್ನು ತಡೆಗಟ್ಟುತ್ತದೆ ಮತ್ತು ಚಿಕಿತ್ಸೆ ಮಾಡುತ್ತದೆ. 1 ಟೀಸ್ಪೂನ್ ಬೇಕಿಂಗ್ ಸೋಡಾ, 1 ಟೀಸ್ಪೂನ್ ಸಸ್ಯ ಎಣ್ಣೆ ಮತ್ತು 1 ಲೀಟರ್ ನೀರನ್ನು ಮಿಶ್ರಣ ಮಾಡಿ.'
        : locale === 'hi'
        ? 'पाउडर मिल्ड्यू को रोकता है और इलाज करता है। 1 चम्मच बेकिंग सोडा, 1 चम्मच वनस्पति तेल और 1 लीटर पानी मिलाएं।'
        : 'Prevents powdery mildew',
      ingredients: locale === 'en'
        ? '1 tsp baking soda, 1 tsp vegetable oil, 1 liter water'
        : locale === 'kn'
        ? '1 tsp ಬೇಕಿಂಗ್ ಸೋಡಾ, 1 tsp ಸಸ್ಯ ಎಣ್ಣೆ, 1 ಲೀಟರ್ ನೀರು'
        : locale === 'hi'
        ? '1 चम्मच बेकिंग सोडा, 1 चम्मच वनस्पति तेल, 1 लीटर पानी'
        : 'Baking soda, oil, water',
      application: locale === 'en'
        ? 'Spray on affected leaves. Use weekly until symptoms disappear.'
        : locale === 'kn'
        ? 'ಸೋಂಕು ಹೊಂದಿದ ಎಲೆಗಳ ಮೇಲೆ ಸ್ಪ್ರೇ ಮಾಡಿ. ರೋಗಲಕ್ಷಣಗಳು ಕಣ್ಮರೆಯಾಗುವವರೆಗೆ ಸಾಪ್ತಾಹಿಕವಾಗಿ ಬಳಸಿ.'
        : locale === 'hi'
        ? 'प्रभावित पत्तियों पर स्प्रे करें। लक्षण गायब होने तक साप्ताहिक उपयोग करें।'
        : 'Spray weekly'
    },
    {
      id: 'garlic',
      name: locale === 'en' ? 'Garlic Extract Spray' : locale === 'kn' ? 'ಬೆಳ್ಳುಳ್ಳಿ ಸಾರ ಸ್ಪ್ರೇ' : locale === 'hi' ? 'लहसुन अर्क स्प्रे' : 'Garlic Extract',
      description: locale === 'en'
        ? 'Natural fungicide and insecticide. Crush 10-12 garlic cloves, soak in 1 liter water overnight, strain and spray.'
        : locale === 'kn'
        ? 'ನೈಸರ್ಗಿಕ ಫಂಗಿಸೈಡ್ ಮತ್ತು ಕೀಟನಾಶಕ. 10-12 ಬೆಳ್ಳುಳ್ಳಿ ಲವಂಗಗಳನ್ನು ಪುಡಿಮಾಡಿ, 1 ಲೀಟರ್ ನೀರಿನಲ್ಲಿ ರಾತ್ರಿ ನೆನೆಸಿ, ಸೋಸಿ ಮತ್ತು ಸ್ಪ್ರೇ ಮಾಡಿ.'
        : locale === 'hi'
        ? 'प्राकृतिक कवकनाशी और कीटनाशक। 10-12 लहसुन की कलियाँ कुचलें, 1 लीटर पानी में रात भर भिगोएँ, छानें और स्प्रे करें।'
        : 'Natural fungicide',
      ingredients: locale === 'en'
        ? '10-12 garlic cloves, 1 liter water'
        : locale === 'kn'
        ? '10-12 ಬೆಳ್ಳುಳ್ಳಿ ಲವಂಗಗಳು, 1 ಲೀಟರ್ ನೀರು'
        : locale === 'hi'
        ? '10-12 लहसुन की कलियाँ, 1 लीटर पानी'
        : 'Garlic, water',
      application: locale === 'en'
        ? 'Spray every 5-7 days. Best applied in evening.'
        : locale === 'kn'
        ? 'ಪ್ರತಿ 5-7 ದಿನಗಳಿಗೊಮ್ಮೆ ಸ್ಪ್ರೇ ಮಾಡಿ. ಸಂಜೆ ಅನ್ವಯಿಸಲು ಉತ್ತಮ.'
        : locale === 'hi'
        ? 'हर 5-7 दिनों में स्प्रे करें। शाम को लगाना सबसे अच्छा है।'
        : 'Spray every 5-7 days'
    },
    {
      id: 'compost',
      name: locale === 'en' ? 'Organic Compost Tea' : locale === 'kn' ? 'ಸಾವಯವ ಕಂಪೋಸ್ಟ್ ಟೀ' : locale === 'hi' ? 'जैविक खाद चाय' : 'Compost Tea',
      description: locale === 'en'
        ? 'Boosts plant immunity and provides nutrients. Steep well-aged compost in water (1:5 ratio) for 3-5 days, strain and apply.'
        : locale === 'kn'
        ? 'ಸಸ್ಯ ಪ್ರತಿರಕ್ಷಣೆಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ ಮತ್ತು ಪೋಷಕಾಂಶಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ. ಚೆನ್ನಾಗಿ ವಯಸ್ಸಾದ ಕಂಪೋಸ್ಟ್ ಅನ್ನು ನೀರಿನಲ್ಲಿ (1:5 ಅನುಪಾತ) 3-5 ದಿನಗಳವರೆಗೆ ನೆನೆಸಿ, ಸೋಸಿ ಮತ್ತು ಅನ್ವಯಿಸಿ.'
        : locale === 'hi'
        ? 'पौधे की प्रतिरक्षा बढ़ाता है और पोषक तत्व प्रदान करता है। अच्छी तरह से पुरानी खाद को पानी में (1:5 अनुपात) 3-5 दिनों के लिए भिगोएँ, छानें और लगाएं।'
        : 'Boosts plant immunity',
      ingredients: locale === 'en'
        ? 'Well-aged compost, water (1:5 ratio)'
        : locale === 'kn'
        ? 'ಚೆನ್ನಾಗಿ ವಯಸ್ಸಾದ ಕಂಪೋಸ್ಟ್, ನೀರು (1:5 ಅನುಪಾತ)'
        : locale === 'hi'
        ? 'अच्छी तरह से पुरानी खाद, पानी (1:5 अनुपात)'
        : 'Compost, water',
      application: locale === 'en'
        ? 'Apply to soil or as foliar spray. Use monthly.'
        : locale === 'kn'
        ? 'ಮಣ್ಣಿಗೆ ಅಥವಾ ಎಲೆ ಸ್ಪ್ರೇ ಆಗಿ ಅನ್ವಯಿಸಿ. ಮಾಸಿಕವಾಗಿ ಬಳಸಿ.'
        : locale === 'hi'
        ? 'मिट्टी में या पत्ती स्प्रे के रूप में लगाएं। मासिक उपयोग करें।'
        : 'Apply monthly'
    }
  ]

  return (
    <div className="organic-recommendations-container">
      <div className="organic-recommendations-header">
        <h1>🌿 {t.organicRecommendations?.title || 'Organic Farming Recommendations'}</h1>
        <p>{t.organicRecommendations?.description || 'Environment-friendly organic remedies for plant diseases'}</p>
        {diseaseName && (
          <p className="disease-context">
            {locale === 'en' ? `Recommended for: ${diseaseName}` : locale === 'kn' ? `ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ: ${diseaseName}` : locale === 'hi' ? `अनुशंसित: ${diseaseName}` : `For: ${diseaseName}`}
          </p>
        )}
      </div>

      <div className="remedies-grid">
        {remedies.map(remedy => (
          <div 
            key={remedy.id} 
            className={`remedy-card ${selectedRemedy === remedy.id ? 'selected' : ''}`}
            onClick={() => setSelectedRemedy(selectedRemedy === remedy.id ? null : remedy.id)}
          >
            <h3>{remedy.name}</h3>
            <p className="remedy-description">{remedy.description}</p>
            
            {selectedRemedy === remedy.id && (
              <div className="remedy-details">
                <div className="ingredients">
                  <h4>{locale === 'en' ? 'Ingredients:' : locale === 'kn' ? 'ಘಟಕಾಂಶಗಳು:' : locale === 'hi' ? 'सामग्री:' : 'Ingredients'}</h4>
                  <p>{remedy.ingredients}</p>
                </div>
                <div className="application">
                  <h4>{locale === 'en' ? 'Application:' : locale === 'kn' ? 'ಅನ್ವಯ:' : locale === 'hi' ? 'आवेदन:' : 'Application'}</h4>
                  <p>{remedy.application}</p>
                </div>
                <button className="apply-btn">
                  {t.organicRecommendations?.applyNow || 'Apply Now'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="eco-friendly-badge">
        <span>🌍</span>
        <p>{t.organicRecommendations?.ecoFriendly || '100% Organic & Environment-Friendly'}</p>
      </div>
    </div>
  )
}



