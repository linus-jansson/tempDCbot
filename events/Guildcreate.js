exports.run = (client) => {
  console.log(`New guild added the bot: ${client.name} (id: ${client.id}).`)
  console.log(`This servers has ${client.memberCount} members!`)
};
