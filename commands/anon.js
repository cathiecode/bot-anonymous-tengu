const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("anon")
  .setDescription("匿名で投稿します")
  .addStringOption((option) =>
    option.setName("message").setDescription("投稿する文章").setRequired(true)
  )
  .addAttachmentOption((option) =>
    option.setName("file").setDescription("投稿するファイル")
  );

const run = async (interaction) => {
  await interaction.reply({
    embeds: [new MessageEmbed().setDescription("メッセージを投稿しています…")],
    ephemeral: true,
  });
  const message = interaction.options.get("message").value;
  const file = interaction.options.get("file")?.attachment?.attachment;
  if (!message) {
    await interaction.editReply({
      embeds: [
        new MessageEmbed().setDescription(
          "メッセージが空だったので投稿しませんでした"
        ),
      ],
      ephemeral: true,
    });
    return;
  }
    await interaction.channel.send({content: message, ...(file ? {files: [file]} : {})});
};

module.exports = { data, run };
