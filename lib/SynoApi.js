class SynoApi {
  constructor(options) {
    this.protocol = options.protocol || 'https'
    this.host = options.host
    this.port = options.port || 5000
    this.fsListApiVersion = options.fsListApiVersion || '2'
    this.fsSharingApiVersion = options.fsSharingApiVersion || '3'
    this.authApiVersion = options.authApiVersion || '6'
    this.base = options.base || ''
    this.intermediatePath = options.intermediatePath
    this.cookie = options.cookie || ''
    this.user = options.username
    this.pass = options.password
  }
}

module.exports = {
  name: 'Syno API',
  description: 'Synology API',
  buildQuery(params) {
      return Object.keys(params)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
          .join('&')
  },

  buildUrl(apiCgi, query) {
      let fullPath = `${this.protocol}://${this.host}:${this.port}/webapi/${apiCgi}.cgi`
      if (query) {
          fullPath += `?${query}`
      }
      console.debug(fullPath)
      return fullPath
  },

  buildRequest(url, method) {
    console.debug(`Cookie: ${this.cookie}`)
    return new Request(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Cookie': `id=${this.cookie}`,
            'Content-Type': 'application/json',
            'Connection': 'keep-alive'
        }
    })
  },

  async sendRequest(request) {
    return await fetch(request)
    .then(response => {
      if (!response.ok) {
        console.debug("HTTP error " + response.status)
        console.debug("HTTP body: " + JSON.stringify(response.headers))
        console.debug("HTTP body: " + response.statusText)
        throw new Error("HTTP error " + response.status)
      }
      return response.json()
    })
    .then((apiJson) => {
      console.log(apiJson)
      return apiJson
    })
    .catch((error) => {
      console.error(error)
    })
  },

  async login() {
    apiCgi = 'auth'
    let queryParams = {
      'api': 'SYNO.API.Auth',
      'version': this.authApiVersion,
      'method': 'login',
      'account': this.user,
      'passwd': this.pass,
      'session': 'FileStation',
      'format': 'cookie'
    }
    let request = this.buildRequest(this.buildUrl(apiCgi, this.buildQuery(queryParams)), 'GET')
    console.log(JSON.stringify(request))
    let response = await this.sendRequest(request)
    console.log(`Returning: ${response}`)
    console.debug(`Setting cookie: ${response.data[0].sid}`)
    this.cookie = response.data[0].sid
  },

  async getLink(file, path) {
    apiCgi = 'entry'
    let queryParams = {
      'api': 'SYNO.FileStation.Sharing',
      'version': this.fsSharingApiVersion,
      'method': 'create',
      'path': `${path}${file}`
    }
    let request = this.buildRequest(this.buildUrl(apiCgi, this.buildQuery(queryParams)), 'GET')
    console.log(JSON.stringify(request))
    let response = await this.sendRequest(request)
    return response.data[0].links[0].url
  }
}