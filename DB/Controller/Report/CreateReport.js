import express from 'express'
import { Report } from '../../Models/Report.js'
// Function to create a new report
export const CreateReport = async (req, res) => {
  try {
    // Destructure data from the request body
    const {
      UserID,
      UserName,
      TotalTasks,
      TaskPercentage,
      AttendancePercentage,
      PerformancePercentage,
      HighPriorityTask,
      mediumPriorityTask,
      lowPriorityTask,
      HighPrioritpoints,
      MediumPrioritypoints,
      LowPriorityPoints,
      Total_HighPrioritpoints,
      Total_MediumPrioritypoints,
      Total_LowPriorityPoints,
      PointsGained,
      TotalPoints,
      TotalHours,
      HoursWorked,
      Salary,
      Month,
    } = req.body
    // Create a new report document
    const newReport = new Report({
      UserID,
      UserName,
      TotalTasks,
      TaskPercentage,
      AttendancePercentage,
      PerformancePercentage,
      HighPriorityTask,
      mediumPriorityTask,
      lowPriorityTask,
      HighPrioritpoints,
      MediumPrioritypoints,
      LowPriorityPoints,
      Total_HighPrioritpoints,
      Total_MediumPrioritypoints,
      Total_LowPriorityPoints,
      PointsGained,
      TotalPoints,
      TotalHours,
      HoursWorked,
      Salary,
      Month,
    })
    // Save the report to the database
    const savedReport = await newReport.save()
    // Respond with the saved report
    res.status(201).json({
      success: true,
      message: 'Report created successfully',
      data: savedReport,
    })
  } catch (error) {
    console.error('Error creating report:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create report',
      error: error.message,
    })
  }
}
