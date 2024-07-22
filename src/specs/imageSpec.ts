import path from 'path'
import File from './../file'
import fs from 'fs';
const imagePath = path.resolve('./assets/images');
describe('Test image processing', (): void => {
  it('the file it should generate exists', async (): Promise<void> => {
    const cacheFile = path.resolve(`${imagePath}/thumb/fjord-100x100.jpg`);
    const isExist: boolean = fs.existsSync(cacheFile);
    if (isExist) {
      fs.unlinkSync(cacheFile);
    }
    const newWidth = 300;
    const newHeight = 700;
    const resizeImage: null | string = await File.createThumb({
      fileName: 'fjord',
      width: newWidth.toString(),
      height: newHeight.toString(),
    })
    const newFilePath = path.resolve(
      `${imagePath}/thumb/fjord-${newWidth}x${newHeight}.jpg`
    );

    expect(fs.existsSync(newFilePath)).toBeTrue();
  })

})