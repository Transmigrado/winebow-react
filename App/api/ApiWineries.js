
const ENDPOINT = 'https://api.winebow.us/api/wineries?token=f8Mudw7MQe6i7698JVim8Zh4HVAnee2g'
const loadWineries = ()=>fetch(ENDPOINT)
  .then(response => response.json())

export default loadWineries