const { Modal } = require("discord-modals");
const { Roles } = require('../../config/rolesToAdd.js');
const retard = require('../../models/authModel.js');

module.exports = {
    name: "modalSubmit",
    /**
     * 
     * @param {Modal} modal 
     */
    async execute(modal) {
        if (modal.customId !== "getAuth") return;

        await modal.deferReply({ ephemeral: true });

        const response = modal.getTextInputValue('decryptionKeyInput');

        retard.findOne({
            userID: modal.user.id
        }, async (err, user) => {
            if (err) console.error(err);
            if (!user) {
                await modal.editReply({ content: "Please use /getkey to get your User-Specific verification key.", ephemeral: true })
            } else {
                if (user.isVerified) {
                    for (let i = 0; i < Roles.length; i++) {
                        modal.member.roles.add(Roles[i])
                    }
                    return await modal.editReply({ content: "You are already verified!", ephemeral: true })
                }
                if (response === user.passwordToDecrypt) {
                    user.isVerified = true;
                    user.save().catch(err => console.error(err));

                    for (let i = 0; i < Roles.length; i++) {
                        modal.member.roles.add(Roles[i])
                    }
                    return await modal.editReply({ content: "Congratulations, you successfully un-retardified yourself!", ephemeral: true })
                } else {
                    return await modal.editReply({ content: "Wrong. Try Again.", ephemeral: true })
                }
            }
        });

    }
}