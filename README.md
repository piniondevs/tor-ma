# Tor Ma
The repository for the Tor Ma bot made specifically for the [VANTORA](https://discord.gg/Q6q78thv) server.

## Contributing
If you want to add a command to the bot you can do it by adding a file in the `./commands` directory. The name of the file will be what the bot will register as a command.
If the file is called `hello.js` then the bot will be able to invoke the command like `~hello`. 

The file needs to export an object containing some metadata and a handler for the command. The schema of the object has to be like this.
```js
{
  name: // This name will be shown in the help
  helpInfo: // This will be shown as the command info in help command,
  handler: // The actual function that will be called when the command is invoked
}
```

**Example:**
```js
module.exports = {
  name: 'hello', 
  helpInfo: 'Just replies with hello there.', 
  handler: (message) => { 
    message.reply('Hello There 👋');
  }
}
```
