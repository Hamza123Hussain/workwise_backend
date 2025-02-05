export const UpdatingPointsGained = (Target, Name) => {
  // Use map to iterate through the array and update each target
  const UpdatedTarget = Target.map((element) => {
    // Check the priority and assign PointsGained accordingly
    if (element.TargetName === Name) {
      element.ValueAchieved++
      element.PointsGained =
        element.TotalPoints * (element.ValueAchieved / element.TargetValue)
    }

    // Return the updated element for inclusion in the new array
    return element
  })

  // Return the updated array with modified PointsGained values
  return UpdatedTarget
}
