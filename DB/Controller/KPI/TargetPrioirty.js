export const PointsGained_BasedOnPriority = (Target) => {
  // Use map to iterate through the array and update each target
  const UpdatedTarget = Target.map((element) => {
    // Check the priority and assign PointsGained accordingly
    if (element.Priority === 'High') {
      element.TotalPoints = 10 // Assign 10 points for high-priority targets
    } else if (element.Priority === 'Medium') {
      element.TotalPoints = 5 // Assign 5 points for medium-priority targets
    } else {
      element.TotalPoints = 2.5 // Assign 2.5 points for low or other priorities
    }

    // Return the updated element for inclusion in the new array
    return element
  })

  // Return the updated array with modified PointsGained values
  return UpdatedTarget
}
