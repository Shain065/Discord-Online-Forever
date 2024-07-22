const Eris = require("eris");
const keep_alive = require('./keep_alive.js')
let Pass = false;
let BlockM = false;
let StaffP = false;
let Welcom = 1
const template = new Discord.EmbedBuilder()
const intents = [
  Discord.IntentsBitField.Flags.Guilds,
  Discord.IntentsBitField.Flags.GUILD_MESSAGES,
  Discord.IntentsBitField.Flags.GUILD_CHANNELS,
  Discord.IntentsBitField.Flags.GUILD_CHANNELS_TEXT,
]

// Block Mention for Member
const UserMBlockM_R = [
  //Bot
  "1261308064368431204", // Bot

  // owner
  "642611270100713474", // Shain
  "1157589304516804649", //Yoda

  // Co-Owner
  "667997928274657310", // Niswo
  "788440725552627722", //Layx

  // Moderateur
  "1122925972480610464", // Streaming
  "700657705919971399", // Tesko
  "1215246207144697908", //Tunger

  //Roles

  "1261780987533332482", // FG Bot Role
  "1160117631479713792", // Owner
  "1246493774541099008", // Co-Owner
  "1169264218642579466", // Modo
  "1261796503895408744", // Staff
]

// Anti Block Role
const UserAntiBlockR = [
  //Bot
  "1261308064368431204",

  // owner
  "642611270100713474",

  // Staff
  "1262160819324588153",

  // FG Joueur
  "1247544236275138611",
]

// Replace TOKEN with your bot account's token
const bot = new Eris(process.env.token);

bot.on("error", (err) => {
  console.error(err); // or your preferred logger
});
bot.on("ready", async () => {
  console.log(`ready`);
  const guild = bot.guilds.cache.get('1147390274771894362');
  bot.user.setStatus('visible');
  guild.channels.cache.forEach(channel => {
    if (channel.id == "1147390275271004223"){
      //channel.send('Bonjour @everyone');
    }
    if (channel.id == "1248909168232890419"){
      channel.send('Le bot est en marche');
    }
  });
  setInterval(() => {
    Change = Math.floor(Math.random() * 3);
    if (Change == 0){
        bot.user.setActivity("Flash Of Genius Esport ⭐");
    };
    if (Change == 1){
        bot.user.setActivity(" Created by Yoda, Shain. 💖");
    };

    if (Change == 2){
        bot.user.setActivity(" Bot Created by Shain 💖");
    };
}, 5000);
});

bot.on("messageCreate", async (message) => {
  console.log("ca a marche")
  // Initialisation
  const userid = message.author.id;
  Pass = false;
  BlockM = false;
  StaffP = false;
  const guild = bot.guilds.cache.get('1147390274771894362');

  // Commande
  if (message.author.bot) return;
  if (message.content == "!help") {
    message.reply("Voici la liste des commandes : \n" +
    "!help : affiche cette aide \n" +
    "!ping : renvoie le pong \n" +
    "!info : renvoie des informations sur moi \n" +
    "!welcom : Dis bonjour a tout le monde (Peut etre utilise qu'une seul fois)  \n"
    )
  }
  if (message.content == "!ping"){
    message.reply("Pong!");
  }
  if (message.content == "!info"){
    message.reply("Je suis le bot pour la FG. \n" +
      "Je suis en cours de developpement \n" +
      "Développé par Shain"
    );
  }
  if (message.content == "!welcom"){
    if (Welcom = 0){
      message.reply("@everyone")
      Welcom += 1;
    } else{
      message.reply("La commande a déjà etait utilisée");
    }
  }

  // Mute
    guild.members.cache.forEach(member => {
    if (member.id == userid){
      member.roles.cache.forEach(role => {
        if (role.name != "@everyone") {
            if (role.id == "1261796503895408744"){
                StaffP = true;
                console.log("Staff FG Detected")
            }
          if (role.id == "1262444640460869714"){
            if (StaffP  == false){
                BlockM = true;
                console.log("Muted Detected")
            }
          }
        }
      })  
    }
  })
bot.on("guildMemberAdd", async (member) => {
  guild = bot.guilds.cache.get('1147390274771894362');
  template.setTitle("Bienvenue sur le serveur!");
  template.setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL()});
  template.setColor("#0000FF");
  template.setDescription("Flash of Genius Esport");
  template.setImage('https://cdn.discordapp.com/attachments/1260905440045432888/1262767570457722991/logofg.png?ex=6697cb71&is=669679f1&hm=920c2ebf45142b7f8b5f7e7cb1870bd19ab0bad90065f3792c4284f525b3688a&');  
  template.setTimestamp();
  guild.channels.cache.forEach(channel => {
    if (channel.id === "1169273309700038716") {
      channel.send({ embeds: [template] });
      channel.send("<@" + member.id + ">")
    }
  });
bot.connect(); // Get the bot to connect to Discord
