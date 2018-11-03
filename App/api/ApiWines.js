
const ENDPOINT = 'https://api.winebow.us/api/wines?token=f8Mudw7MQe6i7698JVim8Zh4HVAnee2g'
const loadWines = ()=>fetch(ENDPOINT)
  .then(response => response.json())

export default loadWines