import { useState } from 'react'
import { mockQuiz } from './data/mockQuiz'
import OverviewPage from './pages/OverviewPage'
import QuizPage from './pages/QuizPage'
import ResultPage from './pages/ResultPage'

type Screen = 'overview' | 'quiz' | 'result'

function App() {
  const [screen, setScreen] = useState<Screen>('overview')

  return (
    <main className="app-shell">
      {screen === 'overview' && (
        <OverviewPage quiz={mockQuiz} onStartQuiz={() => setScreen('quiz')} />
      )}
      {screen === 'quiz' && (
        <QuizPage
          onBackToOverview={() => setScreen('overview')}
          onShowResults={() => setScreen('result')}
        />
      )}
      {screen === 'result' && (
        <ResultPage
          onBackToOverview={() => setScreen('overview')}
          onRestartQuiz={() => setScreen('quiz')}
        />
      )}
    </main>
  )
}

export default App
