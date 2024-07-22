import { promises as fs } from 'fs'
import path from 'path'
import File from './../file'

describe('Test image processing via sharp', (): void => {
  it('invalid width value', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      fileName: 'fjord',
      width: '-100',
      height: '100',
    })
    expect(error).not.toBeNull()
  })

  it('filename does not exist', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      fileName: 'test',
      width: '100',
      height: '500',
    })
    expect(error).not.toBeNull()
  })
})

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imagesThumbPath,
    'fjord-99x99.jpg',
  )

  try {
    await fs.access(resizedImagePath)
    fs.unlink(resizedImagePath)
  } catch {
    //
  }
})
