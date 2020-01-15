const Discord = require("discord.js")
const testBot = new Discord.Client()
const message = testBot.message
const fs = require("fs")
const version = fs.readFileSync("version.txt")
const config_raw = fs.readFileSync("config.txt")
const config = config_raw.toString().split("\n")

testBot.on('ready', () => {
  console.log('Bot Version '+version+" ONLINE!\nPREFIX: "+config[0].split("=")[1])
})

testBot.on("message", (message) => {
    var commands = message.content.split(" ")
    var cmd_main=config[0].split("=")[1]+commands[0]
    try{
        console.log(message.author+": "+message.content)
        if(message.content=="WMtest")
            message.reply("Success!")
    }catch(e){
        console.log("An Error occurred:\n"+e)
    }
})

testBot.login(config[1].split("=")[1])
