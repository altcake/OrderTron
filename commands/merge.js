const Discord = require('discord.js')
const fs = require('fs')
const mergeImages = require('merge-images')
const { Canvas, Image } = require('canvas')

const brazzers = './content/images/image-merge/Brazzers-01.png'

const incomingImages = []
const outgoingImages = []

module.exports = {
    name: 'merge',
    description: "This is gonna get real old real fast",
    execute(message, args) {
        const imageCollection = message.attachments
        // Extract images from incoming message
        for(const image of imageCollection) {
            console.log(image[1].attachment)
            incomingImages.push(image[1].attachment)
        }

        for(const image of incomingImages) {
            mergeImages([image, brazzers], {
                Canvas: Canvas,
                Image: Image
            })
                .then(b64 => {
                    document.querySelector('img').src = b64
                })
                .then(console.log())
        }
    }
}