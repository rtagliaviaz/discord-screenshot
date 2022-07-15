In the following post we will learn how to make a discord bot that will take ascreenshot of a site and pass it to a discord channel.

for this example we will use discord.js, i assume that you already know how to create and configure the bot, in case you don't know how to in this [post](https://dev.to/rtagliavia/how-to-create-a-discord-bot-with-discordjs-and-nodejs-plb) I explain it step by step 

[You can contact me by telegram if you need to hire a Full Stack developer or if you need a discord bot for your server](https://t.me/rtagliajs)

[You can also contact me by discord.](Appu#9136)

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed
- you will need a Discord account

## Creating Our Project

1. open your terminal and type the following
2. mkdir node-telegram-tut
3. cd node-telegram-tut
4. npm init --y
5. code .

## Dependencies

- dotenv
- discord.js
- puppeteer

To install dependencies go to your project folder open a terminal and type the following

```console
npm i dotenv discord.js puppeteer
```

Now go to your package.json and add this

```console
  "scripts": {
    "start": "node ./src index.js"
  },
```

## Project File Structure

discord-cryptocurrency-boy/
├── node_modules/
├── src/
│   └── index.js
├── .env
└── package.json


## Table of Contents

1. [Coding our Bot](#coding-our-discord-bot)
2. [Take Screenshot Function](#screenshot-functions)
3. [Send the screenshot to discord](#send-the-screenshot)
4. [Send the screenshot at a desired time](#send-the-screenshot-at-a-desired-time)
5. [Conclusion](#conclusion)

---

## 1. Coding our Bot <a name="coding-our-discord-bot"></a>

I will assume that you already setup the bot.

Before start coding let's we need to create a **.env** file in our project root, then lets add a BOT_TOKEN var and assign it the token we saved earlier in the previous section.


```
BOT_TOKEN = paste-the-token-here
```

Now in our **index.js**, require the following modules

```js
const puppeteer = require('puppeteer')
const path = require('path')
const Discord = require("discord.js");
const fs = require('fs');

require("dotenv").config();
```

Then create a client object from Discord Class using the Client constructor, we need to pass the intents like this.


```js
const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
  ],
});
```

Now we are going to make our bot online by using the *login* method and add a event listener, so that when the bot is ready it will pass a message through the console.

```js
client.on("ready", () => {
  console.log(`Hello my name is ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);
```

You should receive a message similar to this one.

```console
Hello my name is cryptocurrency-bot#0235!
```


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gqb4tpmdw8rp6ztwwl6n.png)


## 2. Take Screenshot Function <a name="screenshot-functionst"></a>

In order to take a screenshot of a website we will use *puppeteer*.

puppeteer it's a library which will let us control a Chrome, and with this we will be able to perform actions such as scraping, automating, etc.

if you want to know more about puppeteer, please go [here](https://pptr.dev/)

so let's create our function, it will take a screenshot and save it inside a images folder. we need to indicate our image folder path, and also if the folder doesn't exist let our code create it for us.

```js
.
.
.
const imagesPath = path.join(__dirname, 'images')

if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath);
}
.
.
.
```

Will train the explain the code below, first it will launch a browser, then open a new page, we will set the screen size with *setViewport* options (can read more about it in the official [documentation](https://pptr.dev/api/puppeteer.page.setviewport)),  then will go to our desired url, in this case my dev.to profile/dashboard page, then take a screenshot and save it in our images folder, if the images is saved pass a console message with *Screenshot saved* and finally close the browser.

```js
.
.
.
const takeScreenshot = async () => {
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
.
.
.
```

## 3. Send the screenshot to discord <a name="send-the-screenshot"></a>

Now let's send our screenshot to our discord server, so to do this we first need to copy our channel id from our discord server, right click on the channel e.g.(general) and then click *Copy Link*. 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/20yx7gwaced306taaun0.png)

Now create a channel variable that will get our channel.

Then call our function, wait for it to be executed, so to do this we will use async away, then after that we create an embed (if you want to know more about this check [my tutorial](https://dev.to/rtagliavia/how-to-create-a-discord-bot-with-discordjs-and-nodejs-plb), or the [documentation](https://discord.js.org/#/docs/discord.js/main/class/EmbedBuilder)). Finally send the embed to our channel.


```js
.
.
.
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  let channel = client.channels.cache.get('855537249155547199')

  await getScreenhot();
  const embed2 = new Discord.MessageEmbed()
    .setTitle("My Screenshot")
    .setImage(`attachment://dashboard.png`)
    
  channel.send({ embeds: [embed2], files: [`${imagesPath}/dashboard.png`] });
});
.
.
.
```


## 4. Conclusion <a name="conclusion"></a>

We learned how to make a discord bot that will take screenshots of a website and pass them to the chat using **discord.js** and **puppeteer**.

I really hope you have been able to follow the post without any trouble, otherwise i apologize, please leave me your doubts or comments.

[You can contact me by telegram if you need to hire a Full Stack developer.](https://t.me/rtagliajs)

[You can also contact me by discord.](Appu#9136)

[You can clone the repo if you want.](https://github.com/rtagliaviaz/discord-screenshot/)

Thank you for your time.
