const retard = require('../../models/authModel.js');
const mongoose = require('mongoose');

module.exports = {
    name: "getcode",
    description: "Get your User-Specific Code to crack to un-retardify yourself.",
    execute(interaction) {
        //Look if User exists in DB
        retard.findOne({
            userID: interaction.user.id
        }, async (err, user) => {
            if (err) console.error(err);
            //If User does not exist in DB, create new Entry
            if (!user) {
                const newUser = new retard({
                    _id: mongoose.Types.ObjectId(),
                    userID: interaction.user.id,
                    passwordToDecrypt: makeid(24), //Create Custom String to decrypt for each User
                    passwordKey: makeid(12), //Create Random Key String for the XOR Encryption
                    isVerified: false
                });
                newUser.save().catch(err => console.error(err));
                await interaction.reply({ content: "User-Specific Password generated!\nPlease use the same command again to view.", ephemeral: true })
            } else {
                if (user.isVerified) {
                    return await interaction.reply({ content: "You are already verified!", ephemeral: true })
                }
                encryptToB64(user, interaction);
            }
        });
    }
}

//Function to Encrypt into B64
async function encryptToB64(user, interaction) {
    let encrypted = encryptStringWithXORtoHex(user.passwordToDecrypt, user.passwordKey)

    let toB64 = `data: ${encrypted.toString('hex')}\nkey: ${user.passwordKey}`
    let buff = new Buffer(toB64);
    let base64data = buff.toString('base64');

    await interaction.reply({ content: base64data, ephemeral: true })
}

//Function to Encrypt using XOR to Hex
function encryptStringWithXORtoHex(input, key) {
    var c = '';
    while (key.length < input.length) {
        key += key;
    }
    for (var i = 0; i < input.length; i++) {
        var value1 = input[i].charCodeAt(0);
        var value2 = key[i].charCodeAt(0);

        var xorValue = value1 ^ value2;

        var xorValueAsHexString = xorValue.toString("16");

        if (xorValueAsHexString.length < 2) {
            xorValueAsHexString = "0" + xorValueAsHexString;
        }

        c += xorValueAsHexString;
    }
    return c;
}

//Function to Generate a random String
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}