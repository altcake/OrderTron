import { Client, MessageAttachment } from 'discord.js'
import { TwitterApi as _TwitterApi } from 'twitter-api-v2'
import pkg from 'node-cron'
const { schedule } = pkg

const twitterClient = new _TwitterApi(process.env.TWITTER_BEARER_TOKEN)
const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })
client.login(process.env.DISCORD_API_KEY)

const contentDir = process.env.CONTENT_DIR

const twitterUserMap = new Map()
twitterUserMap.mondayDoggy = '1386691472754462725'
twitterUserMap.fridayYakuza = '1165068053786312704'
twitterUserMap.fridayKiller7 = '1213846076534341638'
twitterUserMap.fridayLynch = '1355278398571106306'
twitterUserMap.thursdayOOT = '1230723636769644544'
//twitterUserMap.wednesdayWii = '1333567603093200898'
twitterUserMap.wednesdayWhat = '1205150923934306304'
twitterUserMap.thursdayFeliz = '1304044685351059459'
twitterUserMap.fridayPacific = '1442289929808084992'
twitterUserMap.tuesdayOnly = '1544291583608201216'

const mondayPreparedWeekTweet = 'https://twitter.com/pianta_/status/1422171069306265600'
const mondayMisatoInstagram = 'https://www.instagram.com/p/CUVkg2yBJlg/'
const mondayMisatoTwitter = 'https://twitter.com/Misato_Mondays/status/1442611071022338050'

const thursdayPotato = new MessageAttachment(`${contentDir}/images/timer/thursday/20210225_103521.jpg`)

async function getLatestTweet (accountId) {
  const accountTweets = await twitterClient.get(`https://api.twitter.com/2/users/${accountId}/tweets?max_results=5`)
  console.log('Received tweet: ' + accountTweets.data[0].text)
  const latestTweetLink = accountTweets.data[0].text
  return latestTweetLink
}

function sendMessage (channel, link) {
  console.log(`${name}: Sending message to ${channel}`)
  console.log(`${name}: Message contents: ${link}`)
  client.channels.cache.get(channel).send(link)
}

async function monday (channel) {
  console.log("It's Monday!!!")
  const mondayList = []
  const TweetLink1 = await getLatestTweet(twitterUserMap.mondayDoggy)
  mondayList.push(TweetLink1)
  mondayList.push(mondayPreparedWeekTweet)
  mondayList.push(mondayMisatoInstagram)
  mondayList.push(mondayMisatoTwitter)
  for (const message of mondayList) {
    sendMessage(channel, message)
  }
}

async function tuesday (channel) {
  console.log("It's Tuesday!!!")
  const tuesdayList = []
  const TweetLink1 = await getLatestTweet(twitterUserMap.tuesdayOnly)
  tuesdayList.push(TweetLink1)
  for (const message of tuesdayList) {
    sendMessage(channel, message)
  }
}

async function wednesday (channel) {
  console.log("It's Wednesday!!!")
  const wednesdayList = []
  const TweetLink1 = await getLatestTweet(twitterUserMap.wednesdayWhat)
  wednesdayList.push(TweetLink1)
  for (const message of wednesdayList) {
    sendMessage(channel, message)
  }
}

async function thursday (channel) {
  console.log("It's Thursday!!!")
  const thursdayList = []
  const TweetLink1 = await getLatestTweet(twitterUserMap.thursdayOOT)
  const TweetLink2 = await getLatestTweet(twitterUserMap.thursdayFeliz)
  thursdayList.push(TweetLink1)
  thursdayList.push(TweetLink2)
  client.channels.cache.get(channel).send({ files: [thursdayPotato] })
  for (const message of thursdayList) {
    sendMessage(channel, message)
  }
}

async function fridayMorning (channel) {
  console.log("It's Friday (morning)!!!")
  const fridayMorningList = []
  const TweetLink1 = await getLatestTweet(twitterUserMap.fridayYakuza)
  const TweetLink2 = await getLatestTweet(twitterUserMap.fridayLynch)
  const TweetLink3 = await getLatestTweet(twitterUserMap.fridayPacific)
  fridayMorningList.push(TweetLink1)
  fridayMorningList.push(TweetLink2)
  fridayMorningList.push(TweetLink3)
  for (const message of fridayMorningList) {
    sendMessage(channel, message)
  }
}

// async function fridayAfternoon (channel) {
//   console.log("It's Friday (afternoon)!!!")
//   const TweetLink1 = await getLatestTweet(twitterUserMap.fridayKiller7)
//   sendMessage(channel, TweetLink1)
// }

function setSchedules () {
  schedule('0 9 * * 1', () => {
    monday(process.env.SERVER_OCB_GENERAL)
  }, {
    scheduled: true,
    timezone: 'America/Los_Angeles'
  })
  schedule('0 9 * * 2', () => {
    tuesday(process.env.SERVER_OCB_GENERAL)
  }, {
    scheduled: true,
    timezone: 'America/Los_Angeles'
  })
  schedule('0 9 * * 3', () => {
    wednesday(process.env.SERVER_OCB_GENERAL)
  }, {
    scheduled: true,
    timezone: 'America/Los_Angeles'
  })
  schedule('0 9 * * 4', () => {
    thursday(process.env.SERVER_OCB_GENERAL)
  }, {
    scheduled: true,
    timezone: 'America/Los_Angeles'
  })
  schedule('0 9 * * 5', () => {
    fridayMorning(process.env.SERVER_OCB_GENERAL)
  }, {
    scheduled: true,
    timezone: 'America/Los_Angeles'
  })
  // schedule('0 15 * * 5', () => {
  //   fridayAfternoon(process.env.SERVER_OCB_GENERAL)
  // }, {
  //   scheduled: true,
  //   timezone: 'America/Los_Angeles'
  // })
}

client.on('ready', async () => {
  await client.guilds.fetch(process.env.SERVER_OCB)
    .catch(error => {
      console.error(`Issue retrieving information for ${process.env.SERVER_OCB}: ${error}`)
    })
  await client.guilds.fetch(process.env.SERVER_TEST)
    .catch(error => {
      console.error(`Issue retrieving information for ${process.env.SERVER_TEST}: ${error}`)
    })
  setSchedules()
  console.log(`${name}: The clock is ticking`)
})

export const name = 'timer'
export const description = 'Timer!'
export async function execute (message, args) {
  console.log('Received args: ' + args)
  switch (args[0]) {
    case 'monday':
      monday(process.env.SERVER_TEST_GENERAL)
      break
    case 'tuesday':
      tuesday(process.env.SERVER_TEST_GENERAL)
      break
    case 'wednesday':
      wednesday(process.env.SERVER_TEST_GENERAL)
      break
    case 'thursday':
      thursday(process.env.SERVER_TEST_GENERAL)
      break
    case 'fridayMorning':
      fridayMorning(process.env.SERVER_TEST_GENERAL)
      break
    // case 'fridayAfternoon':
    //   fridayAfternoon(process.env.SERVER_TEST_GENERAL)
    //   break
    default:
      console.log('Unknown timer function!!')
  }
}
