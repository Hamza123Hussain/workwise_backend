import { Router } from 'express'
import { KPIMaker } from '../Controller/KPI/CreateKpi.js'
import { DeleteAKPI } from '../Controller/KPI/DeleteKpi.js'
import { GetAllKpi } from '../Controller/KPI/GetAllKpi.js'
import { GetAKPI } from '../Controller/KPI/GetASingleKpi.js'
import { GetUserDetailsOnly } from '../Controller/KPI/GettingUserDetailsOnly.js'
import { GetAllUserNames } from '../Controller/KPI/GetAllUserNames.js'
import { UpdateKPI } from '../Controller/KPI/UpdateKPi.js'
import { UpdateKpiTaskboard } from '../Controller/KPI/UpdateKpiTaskboard.js'

export const KPIROUTER = Router()
KPIROUTER.post('/CreateNewKPI', KPIMaker)
KPIROUTER.delete('/DeleteKpi', DeleteAKPI)
KPIROUTER.get('/GetAllKPIs', GetAllKpi)
KPIROUTER.get('/SingleKpi', GetAKPI)
KPIROUTER.put('/UpdateKPI', UpdateKPI)
KPIROUTER.put('/UpdateKpiForTaskBoard', UpdateKpiTaskboard)
KPIROUTER.get('/useronly', GetUserDetailsOnly)
KPIROUTER.get('/GetAllUserNames', GetAllUserNames)
