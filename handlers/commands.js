const { Perms } = require('../validation/Permissions.js');
const { Client } = require('discord.js');
const { promisify } = require('util');
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { guildID } = require("../config/config.json");

/**
 * @param {Client} client
 */
module.exports = async(client) => {
    const Table = new Ascii("Command Loaded");

    CommandsArray = [];
    (await PG(`${process.cwd().replace(/\\/g, '/')}/commands/**/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name)
            return await Table.addRow(file.split('/')[7], "❌ Failed", "Missing a Name");

        if (!command.description)
            return await Table.addRow(command.name, "❌ Failed", "Missing a Description");

        if (command.permission) {
            if (Perms.includes(command.permission))
                command.defaultPermission = false;
            else
                return await Table.addRow(command.name, "❌ Failed", "Permission is invalid");
        }

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "✅ SUCCESSFUL");
    });

    console.log(Table.toString());

    //Permission Check
    client.on('ready', async () => {
        const mainGuild = await client.guilds.cache.get(guildID);
        mainGuild.commands.set(CommandsArray);
    });
}