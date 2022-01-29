//Made by Ja'Crispy
//Please dont steal code and call it yours

const Discord = require('discord.js')
const ytdl = require('ytdl-core');
//const Wallet = require('D:/Coding/Javascript/crispybot/wallet.js');
const queue = new Map();
//const wallet = require('D:/Coding/Javascript/crispybot/wallet.js');
const { Client, Intents } = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


client.on('ready', () => {
  console.log("Ready");
})

client.on('ready', () => {

    client.user.setActivity("!help")
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    } else if (primaryCommand == "add") {
        addCommand(arguments,receivedMessage)
    } else if (primaryCommand == "subtract") {
        subtractCommand(arguments, receivedMessage)
    } else if (primaryCommand == "invite") {
        inviteCommand(receivedMessage)
    } else if (primaryCommand == "kick") {
        kickCommand(receivedMessage)
    } else if (primaryCommand == "userinfo") {
        userInfoCommand(receivedMessage)
    } else if (primaryCommand == "serverinfo") {
        serverInfoCommand(receivedMessage)
    } else if (primaryCommand == "uptime") {
        uptimeCommand(receivedMessage)
    } else if (primaryCommand == "timer") {
        timerCommand(receivedMessage)
    } else if (primaryCommand == "join") {
        joinCommand(receivedMessage)
    } else if (primaryCommand == "leave") {
        leaveCommand(receivedMessage)
    } else if (primaryCommand == "play") {
        playCommand(receivedMessage)
    } else if (primaryCommand == "upcoming") {
        upcomingCommand(receivedMessage)
    } else if (primaryCommand == "bal") {
        balanceCommand(receivedMessage)
    } else if (primaryCommand == "d bump") {
        bumpignore(receivedMessage)
    }
}

function helpCommand(receivedMessage) {
    receivedMessage.channel.send("**USEFUL**\n1. Add\n2. Subtract\n3. Multiply\n\n\n**MISC**\n1. Invite\n2. Uptime\n3. Upcoming")
    }

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough numbers to multiply")
        return
    }
    let product = 1 
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The answer of " + arguments + " multiplied together is: " + product.toString())
}
function addCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough numbers to add")
        return
    }
    let product = 0
    arguments.forEach((value) => {
        product = product + parseFloat(value)
    })
    receivedMessage.channel.send("the answer of " + arguments + " added together is: " + product.toString())
}

function subtractCommand(arguments, receivedMessage) {
    receivedMessage.channel.send("Work in progress") 
    return
    }
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough numbers to subtract")
        return
    }
    for (i=0; i<arguments.length; i++){
        product = arguments[i] = parseInt(arguments[i])
       }
    product = arguments[0] + arguments[0]
    //receivedMessage.channel.send("the answer of " + arguments + " subtracted together is: " + product.toString()) 
       

function inviteCommand(receivedMessage) {
    receivedMessage.channel.send("**Invite the bot:** https://top.gg/bot/650122164669906947\n\n**Support Server:** https://discord.gg/8hsJqAqBfR")
}

function kickCommand(arguments, receivedMessage) {
    console.log(receivedMessage)
    if (receivedMessage === undefined) return;
        if (receivedMessage.mentions.users.size) {
          const taggedUser = receivedMessage.mentions.users.first();
          receivedMessage.channel.send(`You wanted to kick: ${taggedUser.username}`);
        } else {
          receivedMessage.channe.send('Please tag a valid user!');
        }
      }

function userInfoCommand(receivedMessage) {

    let status = Discord.visibility;
    receivedMessage.channel.send(status);
    }


//const Guild = new Discord.Guild(client, data);

function serverInfoCommand(receivedMessage) {
    let servercreationdate = receivedMessage["guild"]["createdAt"]
    let serverowner = client.guilds.cache.find(guild => guild.id === receivedMessage["guild"]["id"]).members.cache.filter(member => member.id === receivedMessage["guild"]["owner"])
    let joindate = receivedMessage["guild"]["joinedAt"]
    let membercount = client.guilds.cache.find(guild => guild.id === receivedMessage["guild"]["id"]).members.cache.filter(member => !member.user.client).size;
    receivedMessage.channel.send("Server Owner: " + serverowner +  "\nServer creation date: " + servercreationdate + "\nDate Bot Joined: " + joindate + "\nMember Count: " + membercount)
//  let creation = receivedMessage.Guild.createdTimestamp
    //receivedMessage.channel.send("Server created: " + creation)

}
function uptimeCommand(receivedMessage) {
    var milliseconds = parseInt((client.uptime % 1000) / 100),
      seconds = parseInt((client.uptime / 1000) % 60),
      minutes = parseInt((client.uptime / (1000 * 60)) % 60),
      hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
      days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);

      days = (days < 10) ? "0" + days : days;
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      receivedMessage.channel.send("Bot has been online for : ** " + days + " **days, **" + hours + " **hours, **" + minutes + "** minutes and **" + seconds + "." + milliseconds + "** seconds");
}
async function joinCommand(receivedMessage, serverQueue) {
    const args = receivedMessage.content.split(" ");
  
    const voiceChannel = receivedMessage.member.voice.channel;
    if (!voiceChannel)
      return receivedMessage.channel.send(
        "You need to be in a voice channel to play music"
      );
    const permissions = voiceChannel.permissionsFor(receivedMessage.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return receivedMessage.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    
    } else {
        var connection = await voiceChannel.join();
        client.connection
        receivedMessage.channel.send("I joined the voice channel")
    }
}
async function songinfo(receivedMessage) {
const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url
  }
}


async function leaveCommand(receivedMessage) {
    //const voiceChannel = receivedMessage.member.voice.channel;
    //var connection = await voiceChannel.leave();
    //client.connection
   // receivedMessage.channel.send("I left the voice channel")
}
async function playCommand(guild, song, receivedMessage) {
    const serverQueue = queue.get(guild.id);
    
    if (!song) {
        serverQueue.voiceChannel.leave();
          queue.delete(guild.id);
          return;
        }
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
    }
function upcomingCommand(receivedMessage) {
    receivedMessage.channel.send("**WORKING ON**\n1. Music\n2. Economy Game");
}

//const Wallet = require("../../Classes/Wallet")
//const Wallet = ("D:\Coding\Javascript\crispybot\wallet.js");
async function balanceCommand(receivedMessage) {
        const Wallet = Wallet
        const user = receivedMessage.args;
        const bal = await user.Wallet.balance();

        //const embed = client.embed
        //embed.setTitle(user.tag)
        //embed.nitroColor()
        //embed.setDescription("**" + receivedMessage.guild.formatBal(bal) + "**");
        receivedMessage.channel.send(receivedMessage.guild.formatBal(bal));
            }

function bumpignore(received) {
    return
}

}
client.login("//yourtokenhere")
console.log("bot started");
