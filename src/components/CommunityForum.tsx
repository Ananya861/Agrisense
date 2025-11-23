import { useState } from 'react'
import './CommunityForum.css'

interface Question {
  id: number
  title: string
  description: string
  author: string
  upvotes: number
  answers: Answer[]
  timestamp: string
}

interface Answer {
  id: number
  text: string
  author: string
  upvotes: number
  timestamp: string
}

interface CommunityForumProps {
  locale: string
  t: any
}

export default function CommunityForum({ locale, t }: CommunityForumProps) {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: locale === 'en' ? 'Tomato leaves turning yellow' : locale === 'kn' ? 'ಟೊಮಾಟೊ ಎಲೆಗಳು ಹಳದಿಯಾಗುತ್ತಿವೆ' : locale === 'hi' ? 'टमाटर की पत्तियां पीली हो रही हैं' : 'Yellow leaves',
      description: locale === 'en' ? 'My tomato plants have yellow leaves. What could be the cause?' : locale === 'kn' ? 'ನನ್ನ ಟೊಮಾಟೊ ಸಸ್ಯಗಳಿಗೆ ಹಳದಿ ಎಲೆಗಳಿವೆ. ಕಾರಣವೇನು?' : locale === 'hi' ? 'मेरे टमाटर के पौधों की पत्तियां पीली हैं। कारण क्या हो सकता है?' : 'Yellow leaves issue',
      author: 'Farmer123',
      upvotes: 12,
      answers: [
        {
          id: 1,
          text: locale === 'en' ? 'This could be nitrogen deficiency. Try applying organic compost.' : locale === 'kn' ? 'ಇದು ನೈಟ್ರೋಜನ್ ಕೊರತೆಯಾಗಿರಬಹುದು. ಸಾವಯವ ಕಂಪೋಸ್ಟ್ ಅನ್ವಯಿಸಲು ಪ್ರಯತ್ನಿಸಿ.' : locale === 'hi' ? 'यह नाइट्रोजन की कमी हो सकती है। जैविक खाद लगाने की कोशिश करें।' : 'Nitrogen deficiency',
          author: 'ExpertFarmer',
          upvotes: 8,
          timestamp: '2 days ago'
        }
      ],
      timestamp: '3 days ago'
    }
  ])
  const [newQuestion, setNewQuestion] = useState({ title: '', description: '' })
  const [newAnswer, setNewAnswer] = useState<{ [key: number]: string }>({})

  const postQuestion = () => {
    if (!newQuestion.title || !newQuestion.description) {
      alert(locale === 'en' ? 'Please fill all fields' : locale === 'kn' ? 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ' : locale === 'hi' ? 'कृपया सभी फ़ील्ड भरें' : 'Fill all fields')
      return
    }

    const question: Question = {
      id: questions.length + 1,
      title: newQuestion.title,
      description: newQuestion.description,
      author: 'You',
      upvotes: 0,
      answers: [],
      timestamp: 'Just now'
    }

    setQuestions([question, ...questions])
    setNewQuestion({ title: '', description: '' })
  }

  const postAnswer = (questionId: number) => {
    const answerText = newAnswer[questionId]
    if (!answerText) return

    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: [...q.answers, {
            id: q.answers.length + 1,
            text: answerText,
            author: 'You',
            upvotes: 0,
            timestamp: 'Just now'
          }]
        }
      }
      return q
    }))

    setNewAnswer({ ...newAnswer, [questionId]: '' })
  }

  const upvoteQuestion = (id: number) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q
    ))
  }

  const upvoteAnswer = (questionId: number, answerId: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: q.answers.map(a => 
            a.id === answerId ? { ...a, upvotes: a.upvotes + 1 } : a
          )
        }
      }
      return q
    }))
  }

  return (
    <div className="community-forum-container">
      <div className="community-forum-header">
        <h1>👥 {t.communityForum?.title || 'Farmer Community Forum'}</h1>
        <p>{t.communityForum?.description || 'Ask questions, share solutions, and help fellow farmers'}</p>
      </div>

      <div className="community-forum-content">
        <div className="post-question-section">
          <h2>{t.communityForum?.askQuestion || 'Ask a Question'}</h2>
          <div className="question-form">
            <input
              type="text"
              placeholder={locale === 'en' ? 'Question title...' : locale === 'kn' ? 'ಪ್ರಶ್ನೆ ಶೀರ್ಷಿಕೆ...' : locale === 'hi' ? 'प्रश्न शीर्षक...' : 'Question title'}
              value={newQuestion.title}
              onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
            />
            <textarea
              placeholder={locale === 'en' ? 'Describe your issue...' : locale === 'kn' ? 'ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ...' : locale === 'hi' ? 'अपनी समस्या का वर्णन करें...' : 'Describe issue'}
              value={newQuestion.description}
              onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
              rows={4}
            />
            <button onClick={postQuestion}>
              {t.communityForum?.postQuestion || 'Post Question'}
            </button>
          </div>
        </div>

        <div className="questions-section">
          <h2>{locale === 'en' ? 'Questions' : locale === 'kn' ? 'ಪ್ರಶ್ನೆಗಳು' : locale === 'hi' ? 'प्रश्न' : 'Questions'}</h2>
          {questions.length === 0 ? (
            <p className="no-questions">{t.communityForum?.noQuestions || 'No questions yet. Be the first to ask!'}</p>
          ) : (
            <div className="questions-list">
              {questions.map(question => (
                <div key={question.id} className="question-card">
                  <div className="question-header">
                    <h3>{question.title}</h3>
                    <button className="upvote-btn" onClick={() => upvoteQuestion(question.id)}>
                      👍 {question.upvotes}
                    </button>
                  </div>
                  <p className="question-description">{question.description}</p>
                  <div className="question-meta">
                    <span>👤 {question.author}</span>
                    <span>🕐 {question.timestamp}</span>
                  </div>

                  <div className="answers-section">
                    <h4>{t.communityForum?.answers || 'Answers'} ({question.answers.length})</h4>
                    {question.answers.map(answer => (
                      <div key={answer.id} className="answer-card">
                        <p>{answer.text}</p>
                        <div className="answer-meta">
                          <span>👤 {answer.author}</span>
                          <span>🕐 {answer.timestamp}</span>
                          <button className="upvote-btn small" onClick={() => upvoteAnswer(question.id, answer.id)}>
                            👍 {answer.upvotes}
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="answer-input">
                      <textarea
                        placeholder={locale === 'en' ? 'Write your answer...' : locale === 'kn' ? 'ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಬರೆಯಿರಿ...' : locale === 'hi' ? 'अपना उत्तर लिखें...' : 'Write answer'}
                        value={newAnswer[question.id] || ''}
                        onChange={(e) => setNewAnswer({ ...newAnswer, [question.id]: e.target.value })}
                        rows={3}
                      />
                      <button onClick={() => postAnswer(question.id)}>
                        {t.communityForum?.postAnswer || 'Post Answer'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



