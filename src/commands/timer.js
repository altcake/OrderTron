const { Client, Message } = require("discord.js")
const TwitterApi = require('twitter-api-v2')
const cron = require('node-cron')
require('dotenv').config()

const twitterClient = new TwitterApi.TwitterApi(process.env.TWITTER_BEARER_TOKEN)
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
client.login(process.env.DISCORD_API_KEY)

let twitterUserMap = new Map()
twitterUserMap['mondayDoggy'] = "1386691472754462725"
twitterUserMap['fridayYakuza'] = "1165068053786312704"
twitterUserMap['fridayKiller7'] = "1213846076534341638"
twitterUserMap['fridayLynch'] = "1355278398571106306"
twitterUserMap['thursdayOOT'] = "1230723636769644544"
twitterUserMap['wednesdayWii'] = "1333567603093200898"
twitterUserMap['thursdayFeliz'] = "1304044685351059459"

const mondayPreparedWeekTweet = "https://twitter.com/pianta_/status/1422171069306265600"
const mondayMisatoInstagram = "https://www.instagram.com/p/CUVkg2yBJlg/"
const mondayMisatoTwitter = "https://twitter.com/Misato_Mondays/status/1442611071022338050"

async function getLatestTweet(accountId) {
    const accountTweets = await twitterClient.get(`https://api.twitter.com/2/users/${accountId}/tweets?max_results=5`)
    console.log('Received tweet: ' + accountTweets.data[0].text)
    const latestTweetLink = accountTweets.data[0].text
    return latestTweetLink
}

async function monday() {
    console.log("It's Monday!!!")
    const TweetLink1 = await getLatestTweet(twitterUserMap['mondayDoggy'])
    client.channels.cache.get(process.env.SERVER_OCB_GENERAL).send(TweetLink1)
    client.channels.cache.get(process.env.SERVER_OCB_GENERAL).send(mondayPreparedWeekTweet)
    client.channels.cache.get(process.env.SERVER_OCB_GENERAL).send(mondayMisatoInstagram)
    client.channels.cache.get(process.env.SERVER_OCB_GENERAL).send(mondayMisatoTwitter)
}

async function wednesday() {
    console.log("It's Wednesday!!!")
    const TweetLink1 = await getLatestTweet(twitterUserMap['wednesdayWii'])
    client.channels.cache.get(process.env.SERVER_OCB_GENERAL).send(TweetLink1)
}

async function thursday() {
    console.log("It's Thursday!!!")
    const TweetLink1 = await getLatestTweet(twitterUserMap['thursdayOOT'])
    const TweetLink2 = await getLatestTweet(twitterUserMap['thursdayFeliz'])
    client.channels.cache.get(process.env.SERVER_OCB_GENERAL).send(TweetLink1)
    client.channels.cache.get(process.env.SERVER_OCB_GENERAL).send(TweetLink2)
}

async function fridayMorning() {
    console.log("It's Friday (morning)!!!")
    const TweetLink1 = await getLatestTweet(twitterUserMap['fridayYakuza'])
    const TweetLink2 = await getLatestTweet(twitterUserMap['fridayLynch'])
    client.channels.cache.get(process.env.SERVER_OCB_GENERAL).send(TweetLink1)
    client.channels.cache.get(process.env.SERVER_OCB_GENERAL).send(TweetLink2)
}

async function fridayAfternoon() {
    console.log("It's Friday (afternoon)!!!")
    const TweetLink1 = await getLatestTweet(twitterUserMap['fridayKiller7'])
    client.channels.cache.get(process.env.SERVER_OCB_GENERAL).send(TweetLink1)
}

cron.schedule('0 9 * * 1', () => {
    monday()
}, {
    scheduled: true,
    timezone: "America/Los_Angeles"
})

cron.schedule('0 9 * * 3', () => {
    wednesday()
}, {
    scheduled: true,
    timezone: "America/Los_Angeles"
})

cron.schedule('0 9 * * 4', () => {
    thursday()
}, {
    scheduled: true,
    timezone: "America/Los_Angeles"
})

cron.schedule('0 9 * * 5', () => {
    fridayMorning()
}, {
    scheduled: true,
    timezone: "America/Los_Angeles"
})

cron.schedule('0 15 * * 5', () => {
    fridayAfternoon()
}, {
    scheduled: true,
    timezone: "America/Los_Angeles"
})

client.on('ready', async() => {
    await client.guilds.fetch(process.env.SERVER_OCB)
    await client.guilds.fetch(process.env.SERVER_TEST)
    console.log('Timer.js: The clock is ticking')
})

module.exports = {
    name: 'timer',
    description: "Timer!",
    async execute(message, args) {
        console.log("Received args: " + args)
        switch(args[0]) {
            case 'monday':
                monday()
                break
            case 'wednesday':
                wednesday()
                break
            case 'thursday':
                thursday()
                break
            case 'fridayMorning':
                fridayMorning()
                break
            case 'fridayAfternoon':
                fridayAfternoon()
                break
            default:
                console.log("Unknown timer function!!")
        }
    }
}