import mongoose from 'mongoose'

export const DB_CONNECTED = async () => {
  try {
    const data = await mongoose.connect(
      `mongodb+srv://hamzahussain14hh:Hamza1208@cluster0.ubbaz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    if (data) console.log('DB CONNECTED')
  } catch (error) {
    console.log('DB ERROR', error)
  }
}
