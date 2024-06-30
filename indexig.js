const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

let largeImages = [
    'https://media.discordapp.net/attachments/1235263507071504475/1253992201114091561/12910.gif?ex=6681c1fe&is=6680707e&hm=1569421988f68367494507fe4bfeaabd509f941fe3ccb8e29b937b720d9922cc&=&width=625&height=413'
    // Add more large image URLs as needed
];

const stateTexts = [
    '「 𝙽𝙸𝙶𝙷𝚃 𝙸𝙽 𝚃𝙷𝙴 𝚂𝙺𝚈 」',
    '「 𝚃𝙷𝙴 𝙾𝙽𝙻𝚈 𝙻𝙸𝙵𝙴 」',
    '「 𝙹𝙾𝙸𝙽 𝙳𝙸𝚂𝙲𝙾𝚁𝙳 」',
    // Add more state texts as needed
];

let currentStateIndex = 0; // Index to track the current state text

let currentLargeImageIndex = 0;

app.get('/', (req, res) => res.send('ทำงานเรียบร้อยแล้ว'))
app.listen(port, () =>
    console.log(`Your app is listening at http://localhost:${port}`)
);

client.on("ready", async () => {
    var startedAt = Date.now();
    console.log(`${client.user.username} เม็ดม่วงทำงานเรียบร้อยแล้ว !`);

    setInterval(() => {
        const currentTime = getCurrentTime();
        const currentDate = getCurrentDate();

        const r = new Discord.RichPresence()
            .setApplicationId('1121867777867788309')
            .setType('STREAMING')
            .setURL('https://www.youtube.com/watch?v=AuI3W-H8j7Q')
            .setState(stateTexts[currentStateIndex])
            .setName('۞ 𝙰𝚂𝚃𝚁𝙾 𝙵𝙰𝙼')
            .setDetails(` ﹝ ⌚${currentTime} | 🖤 N0 - 𝓐$t๏r ﹞ `)
            .setStartTimestamp(startedAt)
            .setAssetsLargeText(`﹝ 📅 ${currentDate}  |  🛸 0 m/s ﹞`)
            .setAssetsLargeImage(largeImages[currentLargeImageIndex])
            .setAssetsSmallText('A$t๏r 🖤')
            .addButton('🆔 Ting-𝓐$t๏r 👻  🛜', 'https://wetv.vip/th')
            .addButton('🔱 👑  A$t๏r  👑 🔱', 'https://www.twitch.tv/discord')

        client.user.setActivity(r);

        currentLargeImageIndex = (currentLargeImageIndex + 1) % largeImages.length;
        currentStateIndex = (currentStateIndex + 1) % stateTexts.length;
    }, 1000); // Change large image and state text every 1 second
});

client.on("messageCreate", (message) => {
    if (message.author.id !== client.user.id) return; // Ensure only you can use the commands

    const args = message.content.split(' ');
    const command = args.shift().toLowerCase();

    if (command === '!เพิ่มรูป') {
        const imageUrl = args[0];
        if (!imageUrl) {
            message.reply('โปรดใส่ลิ้งค์รูปภาพด้วย.');
            return;
        }
        largeImages.push(imageUrl);
        message.reply(`Image added: ${imageUrl}`);
    } else if (command === '!ลบรูป') {
        const index = parseInt(args[0], 10);
        if (isNaN(index) || index < 0 || index >= largeImages.length) {
            message.reply('โปรดเลือกรูปภาพที่ต้องการลบ.');
            return;
        }
        const removedImage = largeImages.splice(index, 1);
        message.reply(`Image removed: ${removedImage}`);
    } else if (command === '!รูปทั้งหมด') {
        message.reply(`รูปทั้งหมด:\n${largeImages.map((url, i) => `${i}: ${url}`).join('\n')}`);
    }
});

function getCurrentDate() {
    const a = new Date(Date.now());
    const c = { timeZone: "Asia/Bangkok", day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = a.toLocaleDateString("en-US", c);
    const [month, day, year] = formattedDate.split('/');
    return `${day}/${month}/${year}`;
}

function getCurrentTime() {
    const a = new Date(Date.now());
    const c = { timeZone: "Asia/Bangkok", hour: "numeric", minute: "numeric", hour12: false };
    return a.toLocaleTimeString("th-TH", c);
}

client.login(process.env.token);
