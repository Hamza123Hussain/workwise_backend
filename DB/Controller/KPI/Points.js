export const CalculatePoints = (Target) => {
  const TotalPoints = Target.reduce((acc, element) => {
    return acc + element.TotalPoints
  }, 0)
  const PointsGained = Target.reduce((acc, element) => {
    return acc + element.PointsGained
  }, 0)

  return { TotalPoints, PointsGained }
}
