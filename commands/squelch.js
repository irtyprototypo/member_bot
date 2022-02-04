this.run = async (client, message, args) => {
  let deleteCount = 1;

  if (args[0]){
    deleteCount = args[0];
    deleteCount++;
  }
  const MAX = 11;
  if (!deleteCount || deleteCount < 0 || deleteCount > (MAX+1))
    return message.reply('Please provide a number between 0 and ' + (MAX-1) + ' for the number of messages to delete');

  const fetched = await message.channel.messages.fetch({
    limit: deleteCount,
  });

  message.channel.bulkDelete(fetched)
    .catch(error => console.log(`Couldn't delete messages because of: ${error}`));
};
