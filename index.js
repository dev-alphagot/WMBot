const Discord = require("discord.js")
const testBot = new Discord.Client()
const message = testBot.message
const fs = require("fs")
const version = fs.readFileSync("version.txt")
const config_raw = fs.readFileSync("config.txt")
const config = config_raw.toString().split("\n")
var chosung_quest
var chosung_answer

testBot.on('ready', () => {
  console.log('Bot Version '+version+" ONLINE!\nPREFIX: "+config[0].split("=")[1])
})

testBot.on("message", (message) => {
    var commands = message.content.replace(config[0].split("=")[1],"").split(" ")
    var cmd_main=commands[0]
    try{
        console.log(message.author+": "+message.content)
        if(cmd_main=="WMtest"){
            message.reply("Success!")
        }

        if(cmd_main=="WM초성퀴즈"){
            if(commands[1]=="출제"){
                message.delete()
                if(commands[2].replace(/[가-힣]/g,"")!=""){
                    message.reply("한글이 아닌 다른 문자가 포함되어있습니다!")
                }else{
                    if(chosung_quest == undefined){
                        chosung_answer = commands[2]
                        chosung_quest = commands[2].replace(/[가-깋]/g,"ㄱ").replace(/[나-닣]/g,"ㄴ").replace(/[다-딯]/g,"ㄷ").replace(/[라-맇]/g,"ㄹ").replace(/[마-밓]/g,"ㅁ").replace(/[바-빟]/g,"ㅂ").replace(/[사-싷]/g,"ㅅ").replace(/[아-잏]/g,"ㅇ").replace(/[자-짛]/g,"ㅈ").replace(/[차-칳]/g,"ㅊ").replace(/[카-킿]/g,"ㅋ").replace(/[타-팋]/g,"ㅌ").replace(/[파-핗]/g,"ㅍ").replace(/[하-힣]/g,"ㅎ").replace(/[까-낗]/g,"ㄲ").replace(/[따-띻]/g,"ㄸ").replace(/[빠-삫]/g,"ㅃ").replace(/[싸-앃]/g,"ㅆ").replace(/[짜-찧]/g,"ㅉ")
                        message.reply("초성 문제: "+chosung_quest+"\n정답은 '"+config[0].split("=")[1]+"초성퀴즈 정답 (답)' 으로 입력하세요!")
                    }else{
                        message.reply("문제가 이미 출제되었습니다!")
                    }
                }
            }else if(commands[1]=="정답"){
                if(chosung_quest==undefined){
                    message.reply("아직 문제가 출제되지 않았습니다!")
                }else{
                    if(commands[2]==chosung_answer){
                        message.reply("정답!")
                        chosung_answer = undefined
                        chosung_quest = undefined
                    }else{
                        message.reply("틀렸습니다!")
                    }
                }
            }else{
                message.reply(config[0].split("=")[1]+"초성퀴즈 출제 명령어를 입력해서 문제를 출제하거나 "+config[0].split("=")[1]+"초성퀴즈 정답 명령어로 초성문제의 정답을 입력하세요!")
            }
        }
        
    }catch(e){
        console.log("An Error occurred:\n"+e)
    }
})

testBot.login(config[1].split("=")[1])
