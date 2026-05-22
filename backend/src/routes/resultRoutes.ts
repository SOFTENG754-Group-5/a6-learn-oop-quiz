import { Router } from 'express'

import { findSubmission } from '../stores/submissionStore'

export const resultRoutes = Router()

resultRoutes.get('/:submissionId/result', (request, response) => {
  const submission = findSubmission(request.params.submissionId)

  if (!submission) {
    response.status(404).json({ error: 'Submission result not found' })
    return
  }

  response.json(submission)
})
