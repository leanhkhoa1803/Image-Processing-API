import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import File from './file'
import routes from './routes/index'

dotenv.config()
const PORT = process.env.PORT || 4000
const app: Application = express()
app.use(morgan('dev'))
app.use(routes)

app.listen(PORT, async (): Promise<void> => {
  await File.createThumbPath()
  console.log(`Server is starting at prot:${PORT}`)
})
export default app
