const puppeteer = require('puppeteer')
const path = require('path')
const axios = require("axios");
const Discord = require("discord.js");
const express = require('express');
const fs = require('fs');

require("dotenv").config();


//set path to public

// app.use('/public', express.static(path.join(__dirname, 'public')));

const publicPath = path.join(__dirname, 'public');

const imagesPath = path.join(__dirname, 'images')

//if imagees doesn't exist then create it
if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath);
}
    

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
  ],
});





client.on("ready", async () => {
  // console.log(msg)
  console.log(`Logged in as ${client.user.tag}!`);
  let channel = client.channels.cache.get('855537249155547199')
// console.log(channel)

// channel.send("Hello World")
  await getScreenhot();
  const embed2 = new Discord.MessageEmbed()
    .setTitle("My Screenshot")
    .setImage(`attachment://dashboard.png`)
    
  // channel.send({ embeds: [embed2] });
  channel.send({ embeds: [embed2], files: [`${imagesPath}/dashboard.png`] });

  
});



const getScreenhot = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1
  })
  
  await page.goto('https://dev.to/rtagliavia')
  await page.screenshot({ path: `${imagesPath}/dashboard.png` })

  //if saved to imagesPath/google.png
  if (fs.existsSync(`${imagesPath}/dashboard.png`)) {
    console.log("Screenshot saved");
  }

  
  
  await browser.close()

  //wait until the image is saved and send it
  

  
}


//send the screenshot to discord channel every day at 8:00 pm






client.login(process.env.BOT_TOKEN);