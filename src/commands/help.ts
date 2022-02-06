module.exports.run = async(client, message, args, utils) => {
     let final = "";
     await client.commands.forEach((f, i) => {
          const cmd = require(`./${i}.ts`);
          const msg = `
> name: ${cmd.help.name}
>    description: ${cmd.help.description} 
>    usage: ${cmd.help.usage} 
>    aliases: ${cmd.help.aliases}`
          const msgnoalias = `
> name: ${cmd.help.name} 
>    description: ${cmd.help.description} 
>    usage: ${cmd.help.usage}`
          if (cmd.help.aliases.length === 0) { final = final + msgnoalias }
          else { final = final + msg }
     });
     setTimeout(function(){
     message.reply(final);
     }, 1500);
}
module.exports.help = {
     aliases: ['h'],
     name: 'help',
     description: 'Sends help for commands',
     usage: 'p!help'
}
module.exports.info = {
     args: false,
     category: 'Utils'
}