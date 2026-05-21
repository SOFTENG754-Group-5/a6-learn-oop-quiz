import type { Quiz, Recommendation } from '../types/quiz'

export const mockQuiz: Quiz = {
  id: 'java-oop-basics',
  title: 'Java OOP Basics Quiz',
  description:
    'A beginner-friendly quiz covering the core ideas behind object-oriented programming in Java.',
  questions: [
    {
      id: 'classes-and-objects',
      topic: 'classes-and-objects',
      prompt: 'In Java, what is the relationship between a class and an object?',
      options: [
        {
          id: 'a',
          label: 'A class is a blueprint, and an object is an instance created from it.',
        },
        {
          id: 'b',
          label: 'A class stores only numbers, and an object stores only text.',
        },
        {
          id: 'c',
          label: 'A class is created by an object after the program runs.',
        },
        {
          id: 'd',
          label: 'A class and an object are two names for the same thing.',
        },
      ],
    },
    {
      id: 'encapsulation',
      topic: 'encapsulation',
      prompt: 'Which Java example best shows encapsulation?',
      options: [
        {
          id: 'a',
          label: 'Making fields private and providing public methods to access or update them.',
        },
        {
          id: 'b',
          label: 'Putting every class in one file so it is easier to find.',
        },
        {
          id: 'c',
          label: 'Using only static variables in every class.',
        },
        {
          id: 'd',
          label: 'Writing code without methods.',
        },
      ],
    },
    {
      id: 'inheritance',
      topic: 'inheritance',
      prompt: 'What does inheritance allow one Java class to do?',
      options: [
        {
          id: 'a',
          label: 'Reuse and extend fields or methods from another class.',
        },
        {
          id: 'b',
          label: 'Run without being compiled.',
        },
        {
          id: 'c',
          label: 'Hide all errors from the programmer.',
        },
        {
          id: 'd',
          label: 'Store multiple values in a single int variable.',
        },
      ],
    },
    {
      id: 'polymorphism',
      topic: 'polymorphism',
      prompt: 'Which situation is an example of polymorphism?',
      options: [
        {
          id: 'a',
          label: 'A Vehicle variable can refer to a Car object or a Bike object.',
        },
        {
          id: 'b',
          label: 'A class has only one constructor.',
        },
        {
          id: 'c',
          label: 'A method cannot be called more than once.',
        },
        {
          id: 'd',
          label: 'A variable changes from private to public automatically.',
        },
      ],
    },
    {
      id: 'abstraction',
      topic: 'abstraction',
      prompt: 'What is the main goal of abstraction in Java?',
      options: [
        {
          id: 'a',
          label: 'Show essential behavior while hiding unnecessary implementation details.',
        },
        {
          id: 'b',
          label: 'Make every method public.',
        },
        {
          id: 'c',
          label: 'Remove all classes from a program.',
        },
        {
          id: 'd',
          label: 'Prevent objects from being created.',
        },
      ],
    },
  ],
}

export const mockAnswerKey: Record<string, string> = {
  'classes-and-objects': 'a',
  encapsulation: 'a',
  inheritance: 'a',
  polymorphism: 'a',
  abstraction: 'a',
}

export const mockRecommendations: Recommendation[] = [
  {
    topic: 'classes-and-objects',
    title: 'Review classes and objects',
    guidance: 'Focus on how a class defines state and behavior, then how objects are created from that class.',
  },
  {
    topic: 'encapsulation',
    title: 'Practice encapsulation',
    guidance: 'Review private fields, constructors, getters, and setters in a simple Java class.',
  },
  {
    topic: 'inheritance',
    title: 'Revisit inheritance',
    guidance: 'Look at how a subclass uses extends to reuse and specialize behavior from a superclass.',
  },
  {
    topic: 'polymorphism',
    title: 'Explore polymorphism',
    guidance: 'Practice reading code where a parent type variable refers to different child class objects.',
  },
  {
    topic: 'abstraction',
    title: 'Study abstraction',
    guidance: 'Compare interfaces or abstract classes with concrete classes that implement their behavior.',
  },
]
