const keySettings = 'config'
const initialConfig = {hints: true, time: 600}

export default class SettingsService{
  static getConfig() {
    const response = localStorage.getItem(keySettings)
    if(!response) {
      SettingsService.setConfig(initialConfig)
      return initialConfig
    }
    return JSON.parse(response)
  }

  static setConfig(config: {hints: boolean, time: number}){
    const newConfig = JSON.stringify(config)
    localStorage.setItem(keySettings, newConfig)
  }
}