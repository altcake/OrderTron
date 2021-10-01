import fs from 'fs'
import pkg from 'canvas'
const { createCanvas, loadImage } = pkg

const logoFile = `${process.env.CONTENT_DIR}/images/image-merge/logo.png`
const mergeWorkingDir = `${process.env.CONTENT_DIR}/images/image-merge/results`

async function mergeImages (image, logoFile) {
  const background = await loadImage(image)
  const logo = await loadImage(logoFile)
  console.log('Image loaded')
  console.log(`Width: ${background.width}`)
  console.log(`Height: ${background.height}`)
  const canvas = createCanvas(background.width, background.height)
  console.log('Canvas created')
  const context = canvas.getContext('2d')
  context.drawImage(background, 0, 0, background.width, background.height)
  context.drawImage(logo, 0, (background.height / 3), (background.width), (background.height))
  const buffer = canvas.toBuffer('image/jpeg')
  const time = Date.now()
  console.log(time)
  const outputFilePath = `${mergeWorkingDir}/${time}.jpg`
  console.log(outputFilePath)
  try {
    fs.writeFileSync(outputFilePath, buffer)
  } catch (e) {
    console.error(e)
  }
  console.log(`File written: ${outputFilePath}`)
  return outputFilePath
}

export const name = 'merge'
export const description = 'This is gonna get real old real fast'
export async function execute (message, args) {
  const imageCollection = message.attachments
  console.log(`Images sent: ${imageCollection.size}`)
  if (imageCollection.size === 0) {
    console.log('No image sent with message')
  } else {
    console.log(imageCollection)
    console.log(imageCollection.entries())
    const outgoingImages = []
    for (const [key] of imageCollection) {
      console.log(imageCollection.get(key).attachment)
      const raw = imageCollection.get(key).attachment
      const complete = await mergeImages(raw, logoFile)
      console.log(`File returned: ${complete}`)
      outgoingImages.push(complete)
      console.log(`First image to send: ${outgoingImages[0]}`)
    }
    for (const image of outgoingImages) {
      console.log(`Sending image: ${image}`)
      message.channel.send({ files: [image] })
    }
  }
}
