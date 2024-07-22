import { promises as fs } from 'fs'
import path from 'path'
import processImage from './image-processing'
interface ImageQuery {
  fileName?: string
  width?: string
  height?: string
}

export default class File {
  static imagesFullPath = path.resolve(__dirname, '../assets/images/full')
  static imagesThumbPath = path.resolve(__dirname, '../assets/images/thumb')

  static async getImagePath(params: ImageQuery): Promise<null | string> {
    if (!params.fileName) {
      return null
    }

    const filePath: string =
      params.width && params.height
        ? path.resolve(
            File.imagesThumbPath,
            `${params.fileName}-${params.width}x${params.height}.jpg`,
          )
        : path.resolve(File.imagesFullPath, `${params.fileName}.jpg`)

    try {
      await fs.access(filePath)
      return filePath
    } catch {
      return null
    }
  }

  static async isImageAvailable(filename: string = ''): Promise<boolean> {
    if (!filename) {
      return false
    }

    return (await File.getAvailableImageNames()).includes(filename)
  }

  static async getAvailableImageNames(): Promise<string[]> {
    try {
      return (await fs.readdir(File.imagesFullPath)).map(
        (filename: string): string => filename.split('.')[0],
      ) 
    } catch {
      return []
    }
  }

  static async isThumbAvailable(params: ImageQuery): Promise<boolean> {
    if (!params.fileName || !params.width || !params.height) {
      return false
    }

    const filePath: string = path.resolve(
      File.imagesThumbPath,
      `${params.fileName}-${params.width}x${params.height}.jpg`,
    )

    try {
      await fs.access(filePath)
      return true
    } catch {
      return false
    }
  }

  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(File.imagesThumbPath)
    } catch {
      fs.mkdir(File.imagesThumbPath)
    }
  }

  static async createThumb(params: ImageQuery): Promise<null | string> {
    if (!params.fileName || !params.width || !params.height) {
      return null
    }

    const filePathFull: string = path.resolve(
      File.imagesFullPath,
      `${params.fileName}.jpg`,
    )
    const filePathThumb: string = path.resolve(
      File.imagesThumbPath,
      `${params.fileName}-${params.width}x${params.height}.jpg`,
    )

    console.log(`Creating thumb ${filePathThumb}`)

    return await processImage({
      source: filePathFull,
      target: filePathThumb,
      width: parseInt(params.width),
      height: parseInt(params.height),
    })
  }
}
