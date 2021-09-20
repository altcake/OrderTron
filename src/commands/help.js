const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: "help!",
    execute(message, args) {
        const print_help = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('OrderTron Directives')
            .addFields(
                { name: '~enforce', value: 'Use this to lay down the law.', inline: true },
                { name: '~enka', value: 'Recommends some classy music.', inline: true },
                { name: '~training', value: '<NOT FINISHED> Obtain a training manual.'},
                { name: '~XdX or ~dX', value: 'Roll some dice!  This command can also be chained Eg. ~d20 2d10'},
            )
        message.member.send({ embeds: [print_help] })
    }
}