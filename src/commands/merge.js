import Discord, { MessageAttachment } from 'discord.js'
import fs from 'fs'
import pkg from 'canvas'
const { createCanvas, loadImage } = pkg

// const logo = `${process.env.CONTENT_DIR}/images/image-merge/logo.png`
// const mergeWorkingDir = `${process.env.CONTENT_DIR}/images/image-merge/results`

const logo = `./content/images/image-merge/logo.png`
const mergeWorkingDir = `./content/images/image-merge/results`

const outgoingImages = []

async function mergeImages (image, logo) {
  const background = await loadImage(image)
  console.log('Image loaded')
  console.log(`Width: ${background.width}`)
  console.log(`Height: ${background.height}`)
  const canvas = createCanvas(background.width, background.height)
  console.log('Canvas created')
  const context = canvas.getContext('2d')
  context.drawImage(background, 0, 0, background.width, background.height)
  const buffer = canvas.toBuffer('image/png')
  const time = Date.now()
  console.log(time)
  const outputFilePath = `${mergeWorkingDir}/${time}.png`
  console.log(outputFilePath)
  fs.writeFileSync(outputFilePath, buffer)
  return outputFilePath
}

export const name = 'merge'
export const description = 'This is gonna get real old real fast'
export async function execute (message, args) {
  const imageCollection = message.attachments
  console.log(`Images sent: ${imageCollection.size}`)
  if (imageCollection.size == 0) {
    console.log('No image sent with message')
  } else {
    console.log(imageCollection)
    console.log(imageCollection.entries())
    for (const [key] of imageCollection) {
      console.log(imageCollection.get(key).attachment)
      const raw = imageCollection.get(key).attachment
      const complete = await mergeImages(raw, logo)
      outgoingImages.push(complete)
    }
    for (const image in outgoingImages) {
      message.channel.send({ files: [image] })
    }
  }
}
