const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
module.exports = {
    name: "vouch",
    description: "Vouch Users",
    run: async (client, message, args) => {
             let room = db.get(`vouch_${message.guild.id}`)
        if(room === null) {
            return message.channel.send(`You cant use vouch command on this guild because theres no vouch room to set it use \n-setchannel #room`)
        }
        if (message.channel.id === room) {

        let reason = args.slice(1).join(' ');
        let user = message.mentions.members.first()
        if(!user) {
            return message.channel.send(`Please Mention Person vouch @user <reason>`);
        }
        let timeout = 86400000;

        let vouch = await db.fetch(`vouch_${message.author.id}_${user.id}`);
if (user.id === message.author.id) {
    return message.channel.send(`You Cant Vouch Your Self!`);
}
        if (vouch !== null && timeout - (Date.now() - vouch) > 0) {
          let time = ms(timeout - (Date.now() - vouch));
           let timeEmbed = new Discord.MessageEmbed()
          .setColor("#FFFFFF")
          .setDescription(`You Already Vouched That User Try again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
          message.channel.send(timeEmbed)
        } else {
       
            if(!reason) {
                return message.channel.send(`Please write a reason, of vouch!`)
            }
            let vouchdata = {
            author: message.author.tag,
            reason: reason
            }
            console.log(user.id)
            console.log(reason)
            db.push(`uservouchs_${user.id}`, vouchdata)
            message.channel.send(`You Have Vouched <@${user.id}>!`)
            db.set(`vouch_${message.author.id}_${user.id}`, Date.now())
        }
         return message.channel.send(`You Can use vouch command only on <#${room}>`);
        }
        }}
