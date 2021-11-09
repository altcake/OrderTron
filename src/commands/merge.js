import fs from 'fs'
import pkg from 'canvas'
const { createCanvas, loadImage } = pkg

const brLogoFile = `${process.env.CONTENT_DIR}/images/image-merge/logo.png`
const ggLogoFile = `${process.env.CONTENT_DIR}/images/image-merge/soy_eddie.png`
const mergeWorkingDir = `${process.env.CONTENT_DIR}/images/image-merge/results`

function selectMode (mode) {
  switch (mode) {
    case 'br': return brLogoFile
    case 'gg': return ggLogoFile
    default: return brLogoFile
  }
}

function calculatePosition (background, logoSize, mode) {
  switch (mode) {
    case 'br': return [(background.width / 2) - (logoSize / 2), background.height - (logoSize * (0.66))]
    case 'gg': return [(background.width / 2) - (logoSize / 2), background.height - logoSize]
    default: return [(background.width / 2) - (logoSize / 2), background.height - (logoSize * (0.66))]
  }
}

async function mergeImages (image, logoFile, mode) {
  const background = await loadImage(image)
  const logo = await loadImage(logoFile)
  console.log(`Width: ${background.width}`)
  console.log(`Height: ${background.height}`)
  const canvas = createCanvas(background.width, background.height)
  console.log('Canvas created')
  const context = canvas.getContext('2d')
  context.drawImage(background, 0, 0, background.width, background.height)
  // Ensure the logo has a 1:1 aspect ratio
  let logoSize = background.width
  if (background.width > background.height) {
    logoSize = background.height
  }
  const coordinates = calculatePosition(background, logoSize, mode)
  context.drawImage(logo, coordinates[0], coordinates[1], logoSize, logoSize)
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
export async function execute (message, args, mode) {
  const logoFile = selectMode(mode)
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
      const complete = await mergeImages(raw, logoFile, mode)
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
