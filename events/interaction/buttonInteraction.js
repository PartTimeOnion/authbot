const { ButtonInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction
     */
    execute(interaction, client) {
        if (!interaction.isButton()) return;
        const Button = client.buttons.get(interaction.customId);

        if (Button.permission && !interaction.member.permissions.has(Button.permission))
            return interaction.reply({ content: "You do not have the permissions to use this!", ephemeral: true });

        if (Button.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
            return interaction.reply({ content: "Only the Server Owner can use this!", ephemeral: true });

        Button.execute(interaction, client);

    }
}