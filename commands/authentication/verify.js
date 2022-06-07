const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "verify",
    description: "Send the Message that contains the buttons for Members to use to verify.",
    permissions: "ADMINISTRATOR",
    execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('verify')
                    .setLabel("Verify")
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('verifyHelp')
                    .setLabel('Help')
                    .setStyle('PRIMARY')
            )
        const embed = new MessageEmbed()
            .setTitle("Verification")
            .setDescription("Use /getcode to get your unique code to crack.\nClick the Button below to check your answer.")
            .setColor("#68baac")
            .setFooter({ text: "Do not ask for help. Every User has their own unique code to crack, nobody can share their code with you!" })
        interaction.reply({ components: [row], embeds: [embed] })
    }
}