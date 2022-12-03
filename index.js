const TelegramApi = require('node-telegram-bot-api')

const {gameOptions, againOptions} = require('./option')

const token = '5225226030:AAEd8nk0kzVqGVaZF5clOfoJE42hL9LQ1kw'

const  bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'я загадываю число от 1 до 10')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId,"отгадай", gameOptions);
}

const start = () =>{
    bot.setMyCommands([
        {command: '/music' ,description:'музыка' },
        {command: '/game' ,description:'игра' }
    ])
}

bot.on('message', msg =>{
    console.log(msg)
    const text = msg.text;
    const chatId = msg.chat.id
   
    if(text === '/music'){
        return bot.sendMessage(chatId, 'https://www.youtube.com/watch?v=rtphRJjUIPY ')
    }
    else if (text === '/game'){
        return startGame(chatId);
    }
    else if (text === '/start'){
        return bot.sendMessage(chatId, 'Добро пожаловать')
    }
    else{
       return bot.sendMessage(chatId, 'ты написал '+text )
    }
    
})
bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data === '/again'){
        return startGame(chatId)
    }
    if (data == chats[chatId]) {
        await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${data}`)
    } else {
        await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
    }
})
    


start()