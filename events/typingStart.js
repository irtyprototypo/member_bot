const twelveHours = (1000 * 60 * 60 * 12);
var previousMemePost = Date.now() - (1000 * 60 * 60 * 13);
var currentMemePost = Date.now();

module.exports = (client, channel) => {

  const args = ["dankmemes"];
  const cmd = client.commands.get("reddit");

  if(channel.name !== "memes")
    return;

  currentMemePost = Date.now();
  // console.log(previousMemePost.toString());
  // console.log(currentMemePost.toString());

  if((currentMemePost - previousMemePost) < twelveHours)
    return;

  previousMemePost = currentMemePost;
  cmd.run(client, channel, args);
};