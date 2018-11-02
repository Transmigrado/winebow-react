
const ENDPOINT = 'https://api.winebow.us/api/regions?token=f8Mudw7MQe6i7698JVim8Zh4HVAnee2g'
const loadRegions = ()=>fetch(ENDPOINT)
  .then(response => response.json())

export default loadRegions