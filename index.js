const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://media.discordapp.net/attachments/1204390908293021746/1204422686785409085/sejinming-korean_1.gif?ex=65d4ad09&is=65c23809&hm=075d95d5f07fcd690edd4886f65755b88441741cdab6b2f839487ef6a871973c&=',
    'https://media.discordapp.net/attachments/1204390908293021746/1204422687301042286/sejinming-korean_2.gif?ex=65d4ad09&is=65c23809&hm=a1f9013bb531b1745b1270ece41b59b9ee5cdb8d007079eff907c23c7d45574e&='
    // Add more large image URLs as needed
];

const stateTexts = [
    '「 𝕀 𝕛𝕦𝕤𝕥 𝕨𝕒𝕟𝕟𝕒 𝕝𝕠𝕧𝕖 𝕪𝕠𝕦 𝕝𝕚𝕜𝕖 𝕀 𝕕𝕠  」'
    // Add more state texts as needed
];

const nameTexts = [
  '꒦꒷ 𝕐𝕠𝕦"𝕣𝕖 𝕤𝕨𝕖𝕖𝕥 𝕝𝕚𝕜𝕖 𝕔𝕒𝕟𝕕𝕪~ ♡'
  // Add more state texts as needed
];


let currentStateIndex = 0; // Index to track the current state text

let currentLargeImageIndex = 0;

let currentnameTextsIndex = 0;

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
          .setURL('https://www.youtube.com/watch?si=WddbMqrjlhmF6kF8&v=sVaQQRx6-es&feature=youtu.be')
          .setState(stateTexts[currentStateIndex])
          .setName(nameTexts[currentnameTextsIndex])
          .setDetails(` ﹝ ⌚ ${currentTime} | 💬 ${client.user.username} ﹞ `)
          .setStartTimestamp(startedAt)
          .setAssetsLargeText(`﹝ 📅 ${currentDate}  | 🛸 0 m/s ﹞`)
          .setAssetsLargeImage(largeImages[currentLargeImageIndex])
          .setAssetsSmallText('🦊')
          .addButton('✧ My favorite song ~ ♡', 'https://youtu.be/MW79zgnSF40?si=tKU2OONAJNnR2c90')
          .addButton('꒰🍰 ⤾ Where you at ~ ♡', 'https://youtu.be/sE1GQ6wM9qM?si=Afyeho2F6nfJ68Sc')

      client.user.setActivity(r);

      currentLargeImageIndex = (currentLargeImageIndex + 1) % largeImages.length;
      currentStateIndex = (currentStateIndex + 1) % stateTexts.length;
      currentnameTextsIndex = (currentnameTextsIndex + 1) % nameTexts.length;
  }, 5000); // Change large image and state text every 1 second
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
