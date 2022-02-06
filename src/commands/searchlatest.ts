import fetch from "node-fetch";
module.exports.run = (client, message, args, utils) => {
     if (!args) { return message.reply("Please provide a tag!") }
     let uri = args.toString().replace(/,/g, ' ')
     let encoded = encodeURI(uri);
     fet()
     function fet() {  // the fuckign code is so janky LOL
          let a = fetch(`https://www.pixiv.net/ajax/search/illustrations/${encoded}?word=${encoded}&order=date_d&mode=all&p=1+&s_mode=s_tag_full&type=illust_and_ugoira&lang=en`)
          .then(res => res.text())
          .then(response => {
               var obj = JSON.parse(response);
               if (encoded.includes("R-18")) {  return message.reply("Unable to get images with the tag R-18 since I'm using a guest account for this bot.")  }
               if (obj["error"]) { return fet() }
               if (obj["body"]["illust"]["total"] < 0 || obj["body"]["illust"]["total"] === 0) { return message.reply("Tag not found!") }
               message.reply("https://www.pixiv.net/en/artworks/" + obj["body"]["illust"]["data"][0]["id"]).catch(console.error);
          });
     }
}
module.exports.help = {
     aliases: ["searchnewest"],
     name: 'searchlatest',
     description: 'Gets the latest illustration from tag',
     usage: 'p!searchlatest <tags> supports multiple tags seperated by spaces',
}
module.exports.info = {
     args: true,
     category: 'Pixiv'
}