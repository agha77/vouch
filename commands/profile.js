const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
module.exports = {
    name: "profile",
    description: "Vouch Users",
    run: async (client, message, args) => {
        let guild = message.guild.iconURL()
         let user = message.mentions.members.first() || message.author;
         let database2 = db.get(`uservouchs_${user.id}`)
         if(database2 === null) database2 = "0"
  
         let vouchs = db.get(`uservouchs_${user.id}`)
         let profile = new Discord.MessageEmbed()
         .setTitle(`${user.username || user.user.username} Profile`)
         .addField(`User ID:`, user.id, true)
         .addField(`User Vouchs Total`, database2.length, true)
         .setThumbnail(guild)
         .setFooter(message.author.username, message.author.displayAvatarURL)
         let database = db.get(`uservouchs_${user.id}`)
         
         if(database && database.length) {
            let array =[]
            database.forEach(m => {
              array.push(`Voucher: ${m.author} | **Reason**: ${m.reason}`)

            })
         if(database === null) database = `${user.username} He doesn't Have Any Vouchs.`
            profile.addField("User Vouchs", array.join(" \n "))
        }
        return message.channel.send(profile);

}}
