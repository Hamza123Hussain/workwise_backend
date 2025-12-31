export const PointsGained_BasedOnPriority = (Tasks = []) => {
  return Tasks.map((task) => {
    let total = 0
    if (task.Priority === 'High') total = 10
    else if (task.Priority === 'Medium') total = 5
    else total = 2.5

    return {
      ...task,
      PointsGained: task.PointsGained ?? 0,
      TotalPoints: total,
    }
  })
}
