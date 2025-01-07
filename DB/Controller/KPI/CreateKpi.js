import { KPIModel } from '../../Models/kpi.js'
import { User } from '../../Models/User.js'
import { CalculatePoints } from './Points.js'
import { PointsGained_BasedOnPriority } from './TargetPrioirty.js'

export const KPIMaker = async (req, res) => {
  const { UserId, Targets } = req.body // Extract inputs from the request body with default values for points
  try {
    // Step 1: Check if the user exists in the database
    const existingUser = await User.findById(UserId)
    if (!existingUser) {
      // If the user is not found, send a 404 error response
      return res.status(404).json({ message: 'User not found' })
    }
    const UpdatedTarget = PointsGained_BasedOnPriority(Targets)
    const Points = CalculatePoints(UpdatedTarget)
    // Step 2: Extract user details to include in the KPI document
    const UserName = existingUser.Name
    const UserEmail = existingUser.Email
    // Step 3: Create a new KPI document with the provided and derived data
    const newKPI = new KPIModel({
      UserId, // Reference to the user in the database
      UserName, // Name of the user (for convenience)
      UserEmail, // Email of the user (for convenience)
      Targets: UpdatedTarget, // List of targets (array of objects with details like TargetName, TargetValue, etc.)
      PointsGained: Points.PointsGained, // Points gained by the user (default is 0 if not provided)
      TotalPoints: Points.TotalPoints, // Total points available for this KPI (default is 0 if not provided)
    })
    // Step 4: Save the new KPI document to the database
    const savedKPI = await newKPI.save()
    // Step 5: Respond with the created KPI and success message
    return res.status(201).json({
      message: 'KPI created successfully',
      // KPI: savedKPI,
      UpdatedTarget, // Return the newly created KPI document
    })
  } catch (error) {
    // If an error occurs, log it to the console for debugging
    console.error('Error creating KPI:', error)

    // Send a 500 error response with the error message
    return res.status(500).json({
      message: 'An error occurred while creating the KPI',
      error: error.message, // Include the specific error message for better debugging
    })
  }
}
