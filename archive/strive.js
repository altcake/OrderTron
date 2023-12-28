// import pkg from 'ggst-api-node'
// const { ggstApi } = pkg

import * as ggstApi from 'ggst-api-node'

export const name = 'strive'
export const description = 'Climb the tower'
export function execute (message, args) {

}

async function apiLogin(steamId) {
  return await ggstApi.userLogin(process.env.testSteamID).then(data =>{
    console.log(data)
  })
}
