this.run = (client, message, args) => {
    let res = Math.floor((Math.random() * 2) + 1);
    if(res == 1)
        message.channel.send(`yes :white_check_mark:`);
    else
        message.channel.send(`no :no_entry_sign:`);
};
