const { MessageEmbed, MessageAttachment, Message } = require("discord.js")

function rollDice(sides) {
    let destiny = Math.floor(Math.random() * (sides)) + 1
    console.log(destiny)
    return destiny
}

module.exports = {
    name: 'dnd',
    description: "Roll the destiny dice",
    execute(message) {
        const input = message.content.split(" ")
        console.log('ROLLS REQUESTED: ' + input)

        let result = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Roll Results for ' + message.member.displayName)
        
        for(const rollRequest of input) {
            let rollResult = ""
            let rollSum = 0
            console.log('NOW ROLLING: ' + rollRequest)
            if(/^\d+d\d+/.test(rollRequest)) {
                let rawNumbers = rollRequest.split("d")
                console.log("Raw Numbers: " + rawNumbers)
                if(rawNumbers[0] > 350) {
                    console.log("Requested roll was too high: " + rawNumbers[0])
                    result.addField(rollRequest, "Discord doesn't like rolls this high, so try something smaller.")
                } else {
                    for(let roll = 0; roll < rawNumbers[0]; roll++) {
                        rolledNumber = rollDice(rawNumbers[1])
                        rollResult = rollResult + (rolledNumber + "\n")
                        if(rawNumbers[0] > 1) {
                            rollSum += rolledNumber
                        }
                        //console.log(rollResult)
                    }
                    result.addField(rollRequest, rollResult.toString())
                    if(rollSum != 0) {
                        result.addField("Total:", rollSum.toString())
                    }
                }
            } else if(/d\d+/.test(rollRequest)) {
                let sides = rollRequest.slice(1)
                //console.log(sides)
                rollResult = rollDice(sides)
                //console.log(rollResult)
                result.addField(rollRequest, rollResult.toString())
            } else {
                result.addField(rollRequest, "I have no idea what you just tried to do...")
            }
        }
        //result = input + " roll result:\n" + rollResult
        message.channel.send({ embeds: [result] })
    }
}