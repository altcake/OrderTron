import { exec } from 'child_process'

const ar1 = process.env.USER_AR1

export const name = 'Maintenance'
export const description = 'Routine tasks for special people ONLY'
export function execute (message, args) {
  if (message.author.id == ar1) {
    console.log(ar1)
    console.log('Executing maintenance tasks...')
    message.channel.send("Executing maintenance tasks...")
    exec("scripts/maintenance.sh", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`)
          return
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`)
          return
      }
      console.log(`stdout: ${stdout}`)
      message.channel.send("Maintenance complete!")
    })
  }
  else {
    console.log('Unauthorized user!')
  }
}
