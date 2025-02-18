import { Router } from 'express'
import { KPIMaker } from '../Controller/KPI/CreateKpi.js'
import { DeleteAKPI } from '../Controller/KPI/DeleteKpi.js'
import { GetAllKpi } from '../Controller/KPI/GetAllKpi.js'
import { GetAKPI } from '../Controller/KPI/GetASingleKpi.js'
import { UpdateKpi } from '../Controller/KPI/UpdateKPi.js'
import { GetUserDetailsOnly } from '../Controller/KPI/GettingUserDetailsOnly.js'

export const KPIROUTER = Router()
KPIROUTER.post('/CreateNewKPI', KPIMaker)
KPIROUTER.delete('/DeleteKpi', DeleteAKPI)
KPIROUTER.get('/GetAllKPIs', GetAllKpi)
KPIROUTER.get('/SingleKpi', GetAKPI)
KPIROUTER.put('/UpdateKPI', UpdateKpi)
KPIROUTER.get('/useronly', GetUserDetailsOnly)
