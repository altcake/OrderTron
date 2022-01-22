import { MessageEmbed } from 'discord.js'

function rollDice (sides) {
  const destiny = Math.floor(Math.random() * (sides)) + 1
  console.log(destiny)
  return destiny
}

export const name = 'dnd'
export const description = 'Roll the destiny dice'
export function execute (message) {
  const input = message.content.split(' ')
  console.log('ROLLS REQUESTED: ' + input)

  const result = new MessageEmbed()
    .setColor('#ff0000')
    .setTitle('Roll Results for ' + message.member.displayName)

  for (const rollRequest of input) {
    let rollResult = ''
    let rollSum = 0
    let modifier = 0
    let rollNumbers = rollRequest
    console.log('NOW ROLLING: ' + rollRequest)
    if (/\+\d/.test(rollRequest)) {
      const rawModifier = rollRequest.split('+')
      modifier = rawModifier[1]
      rollNumbers = rawModifier[0]
      result.addField('Modifier', modifier)
      rollSum += parseInt(modifier)
    }
    if (/^\d+d\d+/.test(rollRequest)) {
      const rawNumbers = rollNumbers.split('d')
      console.log('Raw Numbers: ' + rawNumbers)
      if (rawNumbers[0] > 350) {
        console.log('Requested roll was too high: ' + rawNumbers[0])
        result.addField(rollRequest, "Discord doesn't like rolls this high, so try something smaller.")
      } else {
        for (let roll = 0; roll < rawNumbers[0]; roll++) {
          const rolledNumber = rollDice(rawNumbers[1])
          rollResult = rollResult + (rolledNumber + '\n')
          rollSum += rolledNumber
        }
        result.addField(rollNumbers, rollResult.toString())
        if (modifier > 0 || rawNumbers[0] > 1) {
          result.addField('Total:', rollSum.toString())
        }
      }
    } else if (/d\d+/.test(rollNumbers)) {
      const sides = rollNumbers.slice(1)
      rollResult = rollDice(sides)
      rollSum += parseInt(rollResult)
      console.log(rollResult)
      console.log(rollSum)
      result.addField(rollNumbers, rollResult.toString())
      if (rollSum > rollResult) {
        result.addField('Total: ', rollSum.toString())
      }
    } else {
      result.addField(rollRequest, 'I have no idea what you just tried to do...')
    }
  }
  // result = input + " roll result:\n" + rollResult
  message.channel.send({ embeds: [result] })
}
