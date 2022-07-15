const puppeteer = require('puppeteer')
const path = require('path')
const Discord = require("discord.js");
const fs = require('fs');

require("dotenv").config();


const imagesPath = path.join(__dirname, 'images')


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
  console.log(`Logged in as ${client.user.tag}!`);
  let channel = client.channels.cache.get('855537249155547199')


  await getScreenhot();
  const embed2 = new Discord.MessageEmbed()
    .setTitle("My Screenshot")
    .setImage(`attachment://dashboard.png`)
    
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

  if (fs.existsSync(`${imagesPath}/dashboard.png`)) {
    console.log("Screenshot saved");
  }

  await browser.close()

}





client.login(process.env.BOT_TOKEN);