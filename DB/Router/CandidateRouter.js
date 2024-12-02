import { Router } from 'express'
import { CreateCandidate } from '../Controller/Candidate/CreateACandidate.js'
import { GetCandidate } from '../Controller/Candidate/SingleCandidate.js'
import { GetCandidates } from '../Controller/Candidate/GetAllCandidates.js'
import { UpdateACandidate } from '../Controller/Candidate/UpdateCandidate.js'

export const CandidateRouter = Router()
CandidateRouter.post('/CreateNewCandidate', CreateCandidate)
CandidateRouter.get('/GetASingleCandidate', GetCandidate)
CandidateRouter.get('/GetALLCandidate', GetCandidates)
CandidateRouter.put('/UpdateACandidate', UpdateACandidate)
