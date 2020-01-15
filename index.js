const Discord = require("discord.js")
const testBot = new Discord.Client()
const message = testBot.message
const fs = require("fs")
const version = fs.readFileSync("version.txt")
const config = fs.readFileSync("config.txt").split("\n")

testBot.on('ready', () => {
  console.log('Bot Version '+version+" ONLINE!")
})

testBot.on("message", (message) => {
    var commands = message.content.split(" ")
    try{
        switch(commands[0]){

            case config[0].split("=")[1]+"test":
                message.reply("Success!")

        }
    }catch(e){
        console.log("An Error occurred:\n"+e)
    }
})

testBot.login(config[1].split("=")[1])
