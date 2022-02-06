const Discord = require("discord.js");
module.exports.uCError = function(errorMessage) {
    throw `[Error] | ${errorMessage}`
}

module.exports.uCWarning = function(warningMessage) {
    console.warn(`[Warning] | ${warningMessage}. Proceeding.`)
}

module.exports.prefix = require('../config.json').prefix

module.exports.errorEmbed = function(message, errorMessage) {
    const errorEmbed = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setTitle(errorMessage)
    message.channel.send({embed: errorEmbed}).then(msg => {
        msg.delete(2000)
    })
}

module.exports.quickEmbed = function(message, content, color) { // broken
    const embed1 = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle(content)
    message.channel.send({embed1})
}

module.exports.selectRandom = function(array) {
    if(typeof array !== "object") return;
    return array[Math.floor((Math.random() * array.length) + 0)];
}
