const { Client } = require('discord.js');
const mongoose = require('mongoose');
const { mongodbConnect } = require('../../config/config.json');

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log("Bot is Online!")
        client.user.setActivity("Retards", { type: "STREAMING" });

        if (!mongodbConnect) return;
        mongoose.connect(mongodbConnect, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("Connected to MongoDB Database!");
        }).catch((err) => {
            console.error(err);
        });

    }
}