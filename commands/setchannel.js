const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
module.exports = {
    name: "setchannel",
    description: "set the channel for vouching",
    run: async (client, message, args) => {
        let channel = message.mentions.channels.first()
  if(!channel) {
      return message.channel.send(`mention channel please!`);
  }
  db.set(`vouch_${message.guild.id}`, channel.id)
  return message.channel.send(`channel has been setted to ${channel}`)
}}
