exports.run = (client) => {

  console.log(`I am ready!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers!`);
};
