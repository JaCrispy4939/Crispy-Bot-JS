//Made by Ja'Crispy
//Please dont steal code and call it yours
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    // Set bot status to: "Playing with JavaScript"
    client.user.setActivity(".help")
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith(".")) {
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
    }
    else {
        receivedMessage.channel.send("I don't understand the command, try .help")
    }
}

function helpCommand(receivedMessage) {
    receivedMessage.channel.send("**USEFUL**\n1. Add\n2. Subtract\n3. Multiply\n\n\n**MISC**\n1. Invite\n")
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
    let botornot = receivedMessage["clientuser"]["bot"]
    receivedMessage.channel.send(botornot)
    }


//const Guild = new Discord.Guild(client, data);

function serverInfoCommand(receivedMessage) {
    let servercreationdate = receivedMessage["guild"]["createdAt"]
    let serverowner = client.guilds.cache.find(guild => guild.id === receivedMessage["guild"]["id"]).members.cache.filter(member => member.id === receivedMessage["guild"]["owner"])
    let joindate = receivedMessage["guild"]["joinedAt"]
    let membercount = receivedMessage["guild"]["MemberCount"]
    receivedMessage.channel.send("Server Owner: " + serverowner +  "\nServer creation date: " + servercreationdate + "\nDate Bot Joined: " + joindate + "\nMember Count: " + membercount)
//  let creation = receivedMessage.Guild.createdTimestamp
    //receivedMessage.channel.send("Server created: " + creation)

}
client.login("//yourtokenhere")
console.log("bot started");
