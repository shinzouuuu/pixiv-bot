import fetch from "node-fetch";
module.exports.run = (client, message, args, utils) => {
     let encoded = encodeURI("LAS");
     let pages = 25
     fet()
     function fet() {  // the fuckign code is so janky LOL
          let a = fetch(`https://www.pixiv.net/ajax/search/illustrations/${encoded}?word=${encoded}&order=date_d&mode=all&p=${Math.floor(Math.random() * pages)}+&s_mode=s_tag_full&type=illust_and_ugoira&lang=en`)
          .then(res => res.text())
          .then(response => {
               var obj = JSON.parse(response);
               //console.log(obj["body"]["illust"]["data"][0]["tags"].contain)
               if (encoded.includes("R-18")) {  return message.reply("Unable to get images with the tag R-18 since I'm using a guest account for this bot.")  }
               if (pages === 0) { pages = Math.floor(Math.random() * 10); fet(); return } // restart if on 0 page
               if (obj["error"]) { return fet() } // restart if error
               if (obj["body"]["illust"]["total"] < 0 || obj["body"]["illust"]["total"] === 0) { return message.reply("Tag not found!") }
               if (pages < 0) { return message.reply("No illustrations found!") }
               if (Object.keys(obj["body"]["illust"]["data"]).length === 0 && pages > 0) { pages = pages - 2; fet(); return }
               //if (obj["body"]["illust"]["data"]["tags"]) { } i don't think theres other posts than isn't asushin that uses the LAS Tag so i don't need to check if it contains asuka and shinji
               //console.log(Object.keys(obj["body"]["illust"]["data"]).length)
               message.reply("https://www.pixiv.net/en/artworks/" + obj["body"]["illust"]["data"][Math.floor(Math.random() * 60)]["id"]).catch(console.error);
          });
     }
}

module.exports.help = {
     aliases: ["asushin", "shinasu", "sxa", "axs"],
     name: 'las',
     description: 'Gets a random asushin illustration',
     usage: 'p!las', 
}
module.exports.info = {
     args: false,
     category: 'Pixiv'
}