const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 3 });
const config = require('./config/config.json');
const discordModals = require('discord-modals');
discordModals(client);

client.commands = new Collection();
client.buttons = new Collection();

require("./handlers/events.js")(client);
require("./handlers/commands.js")(client);
require("./handlers/buttons.js")(client);

client.login(config.token)