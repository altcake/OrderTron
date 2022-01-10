export const name = 'dateConvert'
export const description = 'Converts an int to a string with days/hours/minutes/seconds'
export function convertToString (time) {
  const timeInSeconds = Math.floor(time / 1000)
  console.log(`Time in seconds: ${timeInSeconds}`)
  const days = Math.floor(timeInSeconds / 86400)
  console.log(`Days: ${days}`)
  const hours = Math.floor((timeInSeconds - (days * 86400)) / 3600)
  console.log(`Hours: ${hours}`)
  const minutes = Math.floor((timeInSeconds - (days * 86400) - (hours * 3600)) / 60)
  console.log(`Minutes: ${minutes}`)
  let timeString = ''
  if (days !== 0) {
    timeString += `${days} days, `
  }
  if (hours !== 0) {
    timeString += `${hours} hours, `
  }
  if (minutes !== 0) {
    timeString += `${minutes} minutes, `
  }
  const seconds = timeInSeconds - ((days * 86400) + (hours * 3600) + (minutes * 60))
  console.log(`Seconds: ${seconds}`)
  timeString += `${seconds} seconds`
  console.log(`Final string: ${timeString}`)
  return timeString
}
