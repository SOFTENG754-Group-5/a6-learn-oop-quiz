import type { Quiz } from '../types/quiz'

export const oopBasicsQuiz: Quiz = {
  quizId: 'oop-basics',
  title: 'OOP Basics Quiz',
  description: 'Check your understanding of core Java OOP concepts.',
  questions: [
    {
      questionId: 'q1',
      topic: 'classes and objects',
      prompt: 'What is a class in Java?',
      options: [
        {
          optionId: 'a',
          text: 'A blueprint for creating objects',
        },
        {
          optionId: 'b',
          text: 'A single object created while a program runs',
        },
        {
          optionId: 'c',
          text: 'A value that can only store a number',
        },
        {
          optionId: 'd',
          text: 'A method that must return text',
        },
      ],
      correctOptionId: 'a',
      explanation: 'A class describes the data and behavior its objects can have.',
    },
    {
      questionId: 'q2',
      topic: 'encapsulation',
      prompt: 'Which choice is a simple example of encapsulation in Java?',
      options: [
        {
          optionId: 'a',
          text: 'Making a field private and updating it through a method',
        },
        {
          optionId: 'b',
          text: 'Putting every class in the same source file',
        },
        {
          optionId: 'c',
          text: 'Removing all methods from a class',
        },
        {
          optionId: 'd',
          text: 'Changing every field to public',
        },
      ],
      correctOptionId: 'a',
      explanation:
        'Encapsulation protects state and provides controlled ways to work with it.',
    },
    {
      questionId: 'q3',
      topic: 'inheritance',
      prompt: 'What does inheritance let a Java class do?',
      options: [
        {
          optionId: 'a',
          text: 'Reuse and extend behavior from another class',
        },
        {
          optionId: 'b',
          text: 'Skip compilation before the program runs',
        },
        {
          optionId: 'c',
          text: 'Store many values inside one int variable',
        },
        {
          optionId: 'd',
          text: 'Hide all errors in a program',
        },
      ],
      correctOptionId: 'a',
      explanation:
        'A subclass can inherit members from a parent class and add its own behavior.',
    },
    {
      questionId: 'q4',
      topic: 'polymorphism',
      prompt: 'Which situation shows polymorphism?',
      options: [
        {
          optionId: 'a',
          text: 'An Animal variable can refer to a Dog object or a Cat object',
        },
        {
          optionId: 'b',
          text: 'A class has exactly one field',
        },
        {
          optionId: 'c',
          text: 'A variable name cannot be changed after it is written',
        },
        {
          optionId: 'd',
          text: 'A method is never called',
        },
      ],
      correctOptionId: 'a',
      explanation:
        'Polymorphism lets code use a shared type with objects that behave in their own ways.',
    },
    {
      questionId: 'q5',
      topic: 'abstraction',
      prompt: 'What is the main goal of abstraction in Java?',
      options: [
        {
          optionId: 'a',
          text: 'Focus on essential behavior and hide unnecessary details',
        },
        {
          optionId: 'b',
          text: 'Make every class impossible to read',
        },
        {
          optionId: 'c',
          text: 'Remove all objects from a program',
        },
        {
          optionId: 'd',
          text: 'Turn every method into a variable',
        },
      ],
      correctOptionId: 'a',
      explanation:
        'Abstraction shows what something does without requiring every detail of how it works.',
    },
  ],
}
