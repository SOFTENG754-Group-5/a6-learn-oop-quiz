# OOP Quiz: Immediate Feedback

A beginner-friendly Java OOP learning app. Take a short multiple-choice quiz, submit your answers, and receive a score, weak-topic list, and personalised revision guidance straight away.

## Running the app

Both the backend and frontend must be running at the same time.

### Option A: start both with one command (recommended)

From the project root (`a6-learn-oop-quiz/`):

```bash
npm install          # installs concurrently
npm run install:all  # installs backend and frontend dependencies
npm run dev          # starts both servers together
```

Backend starts at **http://localhost:3001** and frontend at **http://localhost:5173**. Logs from each are colour-coded in the same terminal.

### Option B: start each server separately

**Backend** (terminal 1):

```bash
cd backend
npm install
npm run dev
```

**Frontend** (terminal 2):

```bash
cd frontend
npm install
npm run dev
```

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/quizzes/oop-basics` | Returns quiz questions (no correct answers exposed) |
| `POST` | `/api/quizzes/oop-basics/submissions` | Submits answers, returns score and `submissionId` |
| `GET` | `/api/submissions/:submissionId/result` | Returns full result for a submission |

## User flow

1. **Overview page**: read the quiz description and click *Start Quiz*
2. **Quiz page**: answer each question and click *Next Question*, then *Submit Quiz* on the last one
3. **Results page**: view your score, feedback, topics to review, and recommended next step

## Configuration

To point the frontend at a different backend URL, create `frontend/.env` and set:

```
VITE_API_BASE_URL=http://localhost:3001
```
