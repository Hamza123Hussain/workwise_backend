import { KPIModel } from '../../Models/kpi.js'
import { User } from '../../Models/User.js'
import { CalculatePoints } from './Points.js'
import { PointsGained_BasedOnPriority } from './TargetPrioirty.js'

export const KPIMaker = async (req, res) => {
  const { UserId, Targets, HoursWorked = 0, Salary = 0 } = req.body

  try {
    if (!Targets || !Array.isArray(Targets) || Targets.length === 0) {
      return res
        .status(400)
        .json({ message: 'Targets must be a non-empty array' })
    }

    const existingUser = await User.findById(UserId)
    if (!existingUser)
      return res.status(404).json({ message: 'User not found' })

    const UpdatedTarget = Targets.map((t) => {
      // validate
      if (!t.TargetName || t.TargetValue < 0) throw new Error('Invalid target')
      // points based on priority
      let multiplier = 2.5
      if (t.Priority === 'High') multiplier = 10
      else if (t.Priority === 'Medium') multiplier = 5
      t.TotalPoints = multiplier * t.TargetValue
      // optional: calculate points gained proportionally if ValueAchieved provided
      t.PointsGained = t.ValueAchieved
        ? (Math.min(t.ValueAchieved, t.TargetValue) / t.TargetValue) *
          t.TotalPoints
        : 0
      return t
    })

    const { TotalPoints, PointsGained } = CalculatePoints(UpdatedTarget)

    const newKPI = new KPIModel({
      UserId,
      UserName: existingUser.Name,
      UserEmail: existingUser.Email,
      Targets: UpdatedTarget,
      PointsGained,
      TotalPoints,
      HoursWorked,
      Salary,
      TotalSalary: Salary,
    })

    const savedKPI = await newKPI.save()

    return res.status(201).json({
      message: 'KPI created successfully',
      KPI: savedKPI,
    })
  } catch (error) {
    console.error('Error creating KPI:', error)
    return res.status(500).json({
      message: 'An error occurred while creating the KPI',
      error: error.message,
    })
  }
}
