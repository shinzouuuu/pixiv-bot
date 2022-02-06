// https://www.pixiv.net/ajax/user/755264/profile/top?lang=en
// i might add tag filtering or smthg idk
import fetch from "node-fetch";
module.exports.run = (client, message, args, utils) => {
     if (!args) { return message.reply("Please provide an author id!") }
     let id = args[0].toString().replace(/,/g, ' ')
     let encoded = encodeURI(id);
     fet()
     function fet() {  // this code is literally copypasted from my other projects just with edited urls lol
          // holy shit github co-pilot is so hot
          let a = fetch(`https://www.pixiv.net/ajax/user/${encoded}/profile/top?lang=en`)
          .then(res => res.text())
          .then(response => {
               var obj = JSON.parse(response);
               message.reply("https://www.pixiv.net/en/artworks/" + Object.keys(obj["body"]["illusts"])[Math.floor(Math.random() * Object.keys(obj["body"]["illusts"]).length)]).catch(console.error);
          });
     }
}
module.exports.help = {
     aliases: ["author","artist","searchartist"],
     name: 'searchbyauthor',
     description: 'Gets a random illustration from author',
     usage: 'p!searchbyauthor <authorid> <tags?>',
}
module.exports.info = {
     args: true,
     category: 'Pixiv'                   
}