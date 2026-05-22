# OOP Quiz Backend

This backend serves the OOP Basics Quiz, accepts quiz submissions, returns
immediate feedback, and lets clients look up a stored submission result.

## Tech stack

- Node.js
- Express
- TypeScript

## Run locally

```sh
npm install
npm run dev
```

Backend URL: `http://localhost:3001/`

## Endpoints

- `GET /health`
- `GET /api/quizzes/oop-basics`
- `POST /api/quizzes/oop-basics/submissions`
- `GET /api/submissions/:submissionId/result`

Example submission request body for
`POST /api/quizzes/oop-basics/submissions`:

```json
{
  "userId": "student001",
  "answers": [
    {
      "questionId": "q1",
      "selectedOptionId": "a"
    },
    {
      "questionId": "q2",
      "selectedOptionId": "a"
    },
    {
      "questionId": "q3",
      "selectedOptionId": "a"
    },
    {
      "questionId": "q4",
      "selectedOptionId": "b"
    },
    {
      "questionId": "q5",
      "selectedOptionId": "a"
    }
  ]
}
```

Submission results are stored in memory and reset when the server restarts.
