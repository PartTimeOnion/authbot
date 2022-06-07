# Authbot
Authbot is a small bot to help distinguish between the stupid people and slightly less stupid people.

## Installation
Make sure you have [NodeJS](https://nodejs.org/en/) installed.
You will also need to have a running MongoDB Server.
Either host one locally on your machine, or use [MongoDB Atlas](https://www.mongodb.com/atlas) or similar servies.

```bash
git clone https://github.com/PartTimeOnion/authbot
cd authbot
npm install
```

Navigate into the config folder and edit the config.json file.
It should look like this:
```json
{
    "token": "DISCORD_BOT_TOKEN_HERE",
    "mongodbConnect": "MONGODB_SERVER_URI_HERE",
    "guildID": "DISCORD_SERVER_ID_HERE"
}
```

Last, but not least:

```bash
node index.js
```

and the Bot should go online.

# Usage
Use the /verify command in a Discord Text Channel to create a Message containing a Button for all Members on the Server to use to verify their Password.
**(Note: The Command may only be used by people having Administrator Privileges**)