const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://media.discordapp.net/attachments/1203955104097501254/1238734988552441907/8606d0464293d795e7846c1519bef96d.gif?ex=664ae95b&is=664997db&hm=1f3d3c6ae4482dc09a2401896cd0107ae3c69249846c87a09eed0f4b57af550d&='
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
            .setDetails(` ﹝ ⌚${currentTime} | 🖤 Ka  Ting - 𝓐$t๏r ﹞ `)
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
