// Discord.jsモジュールを読み込む
const Discord = require("discord.js");
//config.jsonを読み込む
const { prefix } = require("./config.json");

// 新しいDiscordクライアントを作成
//const client = new Discord.Client();

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// クライアントの準備ができた際に実行されます
// このイベントはログインした後に１度だけ実行します
client.once("ready", () => {
  console.log("準備完了！");
  client.user.setActivity('お仕事中', {
        type: 'PLAYING'
        /*
        typeの値:
            https://discord.js.org/#/docs/main/stable/class/ClientUser?scrollTo=setActivity
                'PLAYING': 〇〇 をプレイ中
                'STREAMING': 〇〇 を配信中
                'WATCHING': 〇〇 を視聴中
                'LISTENING': 〇〇 を再生中
        */
    });
});

client.on("message", message => {
  if (message.author.id == client.user.id) {
    return;
  }
  console.log(message.content);

//引数設定
  const reg = message.content.slice(prefix.length).split(" ");
  const reg_command = reg.shift().toLowerCase();
  const channelsID = message.channel.id;

//ここからコマンド判定
  if (channelsID === "811214969336496158") {
    if (reg_command === "ninnsyou") {
      message.member.roles.remove("811486461291266062");
      message.channel.send("旧認証ロールを剥奪しました");
    }
  }
    if (message.content.match(/uuid|cuuid/)) {
      if (channelsID === "827090966204121138") {
        if (reg_command === "uuid") {
          if (reg[0] === undefined) {
              message.channel.send("ユーザーネームを入力してください");
          } else {
              message.channel.send("認証しました\r<#812616466692177931>の規約に同意してください");
            message.member.roles.add("827438041400475668");
            //embed(埋め込み)の設定
            const embed = new Discord.MessageEmbed()
              .setAuthor(
                message.author.tag + "(" + message.author.id + ")",
                message.author.avatarURL()
              )
              .setTitle("新規ユーザー登録")
              .setColor(0x1bff49)
              .setTimestamp()
              .setThumbnail(message.author.avatarURL())
              .addField("UUID", reg[0]);

            client.channels.cache.get("827091403334877248").send({ embeds: [embed] });
          }
        } else {
          if (reg_command === "cuuid") {
          } else {
            message.channel.send("!uuid [プレイヤーネーム]を打って送信してください \r BEの方はBE_を忘れずに！！");
          }
        }

        if (reg_command === "cuuid") {
          if (reg[0] === undefined) {
            message.channel.send("ユーザーネームを入力してください");
          } else {
            message.channel.send("MCIDを変更しました");
            //embed(埋め込み)の設定

            const embed = new Discord.MessageEmbed()
              .setAuthor(
                message.author.tag + "(" + message.author.id + ")",
                message.author.avatarURL()
              )
              .setTitle("ユーザー名変更申請")
              .setColor(0xcc3333)
              .setTimestamp()
              .setThumbnail(message.author.avatarURL())
              .addField("変更後のUUID", reg[0]);

            client.channels.cache.get("827091403334877248").send({ embeds: [embed] });
          }
        }
      } else {
        message.channel.send("<#827090966204121138>で送信してください");
      }
    } else {
      return;
    }
  });


 const TOKEN = process.env.TOKEN

if (TOKEN == undefined) {
  console.log("DISCORD_BOT_TOKENが設定されていません。");
  process.exit(0);
}

client.login(TOKEN);

function sendReply(message, text) {
  message
    .reply(text)
    .then(console.log("リプライ送信: " + text))
    .catch(console.error);
}

function sendMsg(channelId, text, option = {}) {
  client.channels
    .get(channelId)
    .send(text, option)
    .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
    .catch(console.error);
}