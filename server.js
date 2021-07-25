// Discord.jsモジュールを読み込む
const Discord = require("discord.js");
//config.jsonを読み込む
const { prefix } = require("./config.json");

// 新しいDiscordクライアントを作成
const client = new Discord.Client();

const ytdl = require('ytdl-core')
const http = require("http");
const querystring = require("querystring");
const discord = require("discord.js");

http
  .createServer(function(req, res) {
    if (req.method == "POST") {
      var data = "";
      req.on("data", function(chunk) {
        data += chunk;
      });
      req.on("end", function() {
        if (!data) {
          console.log("No post data");
          res.end();
          return;
        }
        var dataObject = querystring.parse(data);
        console.log("post:" + dataObject.type);
        if (dataObject.type == "wake") {
          console.log("Woke up in post");
          res.end();
          return;
        }
        res.end();
      });
    } else if (req.method == "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Discord Bot is active now\n");
    }
  })
  .listen(3000);
// クライアントの準備ができた際に実行されます
// このイベントはログインした後に１度だけ実行します
client.once("ready", () => {
  console.log("準備完了！");
  client.user.setActivity('喫茶ステラと死神の蝶', {
        type: 'WATCHING'
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

// トークンを使ってDiscordにログイン
client.login(process.env.DISCORD_BOT_TOKEN);

client.on("message", message => {
  if (message.author.id == client.user.id) {
    return;
  }
  console.log(message.content);

  const reg = message.content.slice(prefix.length).split(" ");
  const reg_command = reg.shift().toLowerCase();
  const channelsID = message.channel.id;

if (reg_command === "ninnsyou") {
  
}

  if (channelsID === "811214969336496158") {
    if (reg_command === "ninnsyou") {
      message.member.roles.remove("811486461291266062");
      client.channels.cache
        .get(message.channel.id)
        .send("旧認証ロールを剥奪しました");
    }
  }
  if (message.channel.parent.id === "811211229212704769") {
    console.log("検知範囲外のため反応しません");
    return;
  } else {
    if (message.content.match(/uuid|cuuid/)) {
      if (channelsID === "827090966204121138") {
        if (reg_command === "uuid") {
          if (reg[0] === undefined) {
            client.channels.cache
              .get(message.channel.id)
              .send("ユーザーネームを入力してください");
          } else {
            client.channels.cache
              .get(message.channel.id)
              .send(
                "認証しました\r<#812616466692177931>の規約に同意してください"
              );
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

            client.channels.cache.get("827091403334877248").send(embed);
          }
        } else {
          if (reg_command === "cuuid") {
          } else {
            client.channels.cache
              .get(message.channel.id)
              .send(
                "!uuid [プレイヤーネーム]を打って送信してください \r BEの方はBE_を忘れずに！！"
              );
          }
        }

        if (reg_command === "cuuid") {
          if (reg[0] === undefined) {
            client.channels.cache
              .get(message.channel.id)
              .send("ユーザーネームを入力してください");
          } else {
            client.channels.cache
              .get(message.channel.id)
              .send("MCIDを変更しました");
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

            client.channels.cache.get("827091403334877248").send(embed);
          }
        }
      } else {
        client.channels.cache
          .get(message.channel.id)
          .send("<#827090966204121138>で送信してください");
      }
    } else {
      return;
    }
  }
});


 
 client.on('message', async message => {
   // メッセージが "!yt" からはじまっていてサーバー内だったら実行する
   if (message.content.startsWith('!play') && message.guild) {
     // メッセージから動画URLだけを取り出す
     const url = message.content.split(' ')[1]
     // まず動画が見つからなければ処理を止める
     if (!ytdl.validateURL(url)) return message.reply('動画が存在しません！')
     // コマンドを実行したメンバーがいるボイスチャンネルを取得
     const channel = message.member.voice.channel
     // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
     if (!channel) return message.reply('先にボイスチャンネルに参加してください！')
     // チャンネルに参加
     const connection = await channel.join()
     // 動画の音源を取得
     const stream = ytdl(ytdl.getURLVideoID(url), { filter: 'audioonly' })
     // 再生
     const dispatcher = connection.play(stream)
     
     // 再生が終了したら抜ける
     dispatcher.once('finish', () => {
       channel.leave()
     })
   }
 })

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("DISCORD_BOT_TOKENが設定されていません。");
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);

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