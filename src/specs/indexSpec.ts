import supertest from 'supertest'
import app from '../index'
import { promises as fs } from 'fs'
import path from 'path'
import File from './../file'

const request: supertest.SuperTest<supertest.Test> = supertest(app)

describe('Test responses from endpoints', (): void => {
  describe('endpoint: /api/images', (): void => {
    it('gets /api/images?fileName=fjord (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?fileName=fjord',
      )

      expect(response.status).toBe(200)
    })

    it('gets /api/images?fileName=fjord&width=199&height=199 (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?fileName=fjord&width=199&height=199',
      )

      expect(response.status).toBe(200)
    })

    it('gets /api/images?fileName=fjord&width=-200&height=200 (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=fjord&width=-200&height=200',
      )

      expect(response.status).toBe(200)
    })
  })
})

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imagesThumbPath,
    'fjord-199x199.jpg',
  )

  try {
    await fs.access(resizedImagePath)
    fs.unlink(resizedImagePath)
  } catch {}
})
