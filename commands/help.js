const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
 const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix , token } = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
    name: "profile",
    description: "Vouch Users",
    run: async (client, message, args) => {
        let prefix = await db.get(`prefix_${message.guild.id}`);
       if(prefix === null) prefix = mainprefix;

        let guild = message.guild.iconURL()
        let embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} Help 🛹`)
        .setThumbnail(message.guild.displayAvatarURL())
        .setDescription(`
        ${prefix}vouch @user (reason)
        ${prefix}profile @user 
        `)
        .setFooter(message.guild.name, guild)
        message.channel.send(embed);
}}
