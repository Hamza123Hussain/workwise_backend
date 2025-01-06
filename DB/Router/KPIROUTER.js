import { Router } from 'express'
import { KPIMaker } from '../Controller/KPI/CreateKpi.js'

export const KPIROUTER = Router()
KPIROUTER.post('/CreateNewKPI', KPIMaker)
KPIROUTER.delete('/DeleteKpi')
KPIROUTER.get('/GetAllKPIs')
KPIROUTER.get('/SingleKpi')
KPIROUTER.put('/UpdateKPI')
