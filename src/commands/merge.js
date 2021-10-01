import Discord, { MessageAttachment } from 'discord.js'
import fs from 'fs'
import { Canvas } from 'canvas'

const logo = './content/images/image-merge/logo.png'

const incomingImages = []
const outgoingImages = []

async function mergeImages (image, logo) {
  const background = await Canvas.loadImage(image)
  const canvas = Canvas.createCanvas(background.width, background.height)
  const context = canvas.getContext('2d')
  context.drawImage(background, 0, 0, background.width, background.height)
  return new MessageAttachment(canvas.toBuffer(), 'result.png')
}

export const name = 'merge'
export const description = 'This is gonna get real old real fast'
export function execute (message, args) {
  const imageCollection = message.attachments
  console.log(imageCollection)
  // Extract images from incoming message
  // for (const image of imageCollection) {
  //   console.log(image[1].attachment)
  //   incomingImages.push(image[1].attachment)
  // }

  // for (const image of incomingImages) {
  //   const complete = mergeImages(image, logo)
  //   outgoingImages.push(complete)
  // }

  // incomingImages.push(image[1].attachment)

  const raw = imageCollection.attachment
  const complete = mergeImages(raw, logo)
  outgoingImages.push(complete)
  for (const image in outgoingImages) {
    message.channel.send({ files: [image] })
  }
}
