import fetch from "node-fetch";
module.exports.run = (client, message, args, utils) => {
     if (args.length === 0 ) { return message.reply("Please provide a tag!") }
     console.log('has tag')
     let uri = args.toString().replace(/,/g, ' ')
     let encoded = encodeURI(uri);
     let pages = 25
     fet()
     function fet() {  // the fuckign code is so janky LOL
          let a = fetch(`https://www.pixiv.net/ajax/search/illustrations/${encoded}?word=${encoded}&order=date_d&mode=all&p=${Math.floor(Math.random() * pages)}+&s_mode=s_tag_full&type=illust_and_ugoira&lang=en`)
          .then(res => res.text())
          .then(response => {
               var obj = JSON.parse(response);
               console.log(pages)
               if (encoded.includes("R-18")) {  return message.reply("Unable to get images with the tag R-18 since I'm using a guest account for this bot.")  }
               if (pages === 0) { pages = Math.floor(Math.random() * 10); fet(); return } // restart if on 0 page
               if (obj["error"]) { return fet() } // restart if error
               if (obj["body"]["illust"]["total"] < 0 || obj["body"]["illust"]["total"] === 0) { return message.reply("Tag not found!") }
               if (pages < 0) { return message.reply("No illustrations found!") }
               if (Object.keys(obj["body"]["illust"]["data"]).length === 0 && pages > 0) { pages = pages - 2; fet(); return }
               //console.log(Object.keys(obj["body"]["illust"]["data"]).length)
               message.reply("https://www.pixiv.net/en/artworks/" + obj["body"]["illust"]["data"][Math.floor(Math.random() * 60)]["id"]).catch(console.error);
          });
     }
}

module.exports.help = {
     aliases: ["tag", "searchtag", "searchtags"],
     name: 'search',
     description: 'Gets a random illustration by tag',
     usage: 'p!search <tags> supports multiple tags seperated by spaces | it only scans the first 25 pages | supports jp and en tags', 
}
module.exports.info = {
     args: true,
     category: 'Pixiv'
}