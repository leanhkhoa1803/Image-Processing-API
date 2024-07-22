import express from 'express'
import images from './api/images'

const routes: express.Router = express.Router()

routes.use('/api/images', images)

routes.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    response.send(
      '<h1>Welcome to image-processing-api</h1><p>Listening at <code><a href="/api/images">/api/images</a></code> for queries containing at least a valid fileName. Optionally use both width and height to set the size...</p><p>Examples:<ul><li><a href="/api/images?fileName=fjord">/api/images?fileName=fjord</a></li><li><a href="/api/images?fileName=fjord&width=100&height=100">/api/images?fileName=fjord&width=100&height=100</a></li></ul></p>',
    )
  },
)

export default routes
