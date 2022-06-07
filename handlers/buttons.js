const { glob } = require("glob");
const { promisify } = require('util');
const PG = promisify(glob);
const Ascii = require("ascii-table");

module.exports = async (client) => {
    const Table = new Ascii("Buttons Handler");
    const buttonsFolder = await PG(`${process.cwd().replace(/\\/g, '/')}/buttons/**/*.js`);

    buttonsFolder.map(async (file) => {
        const buttonFile = require(file);
        if (!buttonFile.id) return;

        client.buttons.set(buttonFile.id, buttonFile);
        Table.addRow(buttonFile.id, "✅ LOADED")
    });
    console.log(Table.toString());
}