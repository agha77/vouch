const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
 const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix , token } = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
    name: "help",
    description: "help command",
    run: async (client, message, args) => {
        let prefix = await db.get(`prefix_${message.guild.id}`);
       if(prefix === null) prefix = mainprefix;

        let guild = message.guild.iconURL()
        let embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} Help 🛹`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`
        ${prefix}vouch @user (reason)
        ${prefix}profile @user 
        ${prefix}help
        `)
        .setFooter(message.guild.name, guild)
        message.channel.send(embed);
}}
