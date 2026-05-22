import type { QuizTopic } from '../types/quiz'

export type QuizRecommendation =
  | {
      type: 'review'
      topic: QuizTopic
      message: string
    }
  | {
      type: 'next-topic'
      message: string
    }

export function createFeedback(weakTopics: QuizTopic[]): string {
  const topic = weakTopics[0]

  if (topic) {
    return `Good progress. Review ${topic} to strengthen your understanding.`
  }

  return 'Great work. You are ready to keep building your OOP understanding.'
}

export function createRecommendation(
  weakTopics: QuizTopic[],
): QuizRecommendation {
  const topic = weakTopics[0]

  if (topic) {
    return {
      type: 'review',
      topic,
      message: `Review the ${topic} lesson and retry a related question.`,
    }
  }

  return {
    type: 'next-topic',
    message: 'Move to the next OOP topic when you are ready.',
  }
}
