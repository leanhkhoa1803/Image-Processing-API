import express from 'express'
import File from './../../file'

interface ImageQuery {
  fileName?: string
  width?: string
  height?: string
}

const validate = async (query: ImageQuery): Promise<null | string> => {
  if (!(await File.isImageAvailable(query.fileName))) {
    const availableImageNames: string = (
      await File.getAvailableImageNames()
    ).join(', ')
    return `Please pass a valid fileName in the 'fileName' query segment. Available filenames are: ${availableImageNames}.`
  }

  if (!query.width && !query.height) {
    return null
  }

  const width: number = parseInt(query.width || '')
  if (Number.isNaN(width) || width < 1) {
    return 'Please provide correct width'
  }

  const height: number = parseInt(query.height || '')
  if (Number.isNaN(height) || height < 1) {
    return 'Please provide correct height'
  }

  return null
}

const images: express.Router = express.Router()

images.get(
  '/',
  async (
    request: express.Request,
    response: express.Response,
  ): Promise<void> => {
    const validationMessage: null | string = await validate(request.query)
    if (validationMessage) {
      response.send(validationMessage)
      return
    }

    let error: null | string = ''

    if (!(await File.isThumbAvailable(request.query))) {
      error = await File.createThumb(request.query)
    }

    if (error) {
      response.send(error)
      return
    }

    const path: null | string = await File.getImagePath(request.query)
    if (path) {
      response.sendFile(path)
    } else {
      response.send(error)
    }
  },
)

export default images
