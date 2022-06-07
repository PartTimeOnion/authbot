const { Modal, TextInputComponent, showModal } = require("discord-modals")

module.exports = {
    id: "verify",
    async execute(interaction, client) {
        const modal = new Modal()
            .setCustomId('getAuth')
            .setTitle('Enter Decryption Key')
            .addComponents(
                new TextInputComponent()
                    .setCustomId('decryptionKeyInput')
                    .setLabel('Please Enter the Decryption Key')
                    .setStyle('SHORT')
                    .setPlaceholder('Decryption Key')
                    .setRequired(true)
            );

        showModal(modal, {
            client: client,
            interaction: interaction
        });
    }
}