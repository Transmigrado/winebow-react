
const ENDPOINT = 'https://api.winebow.us/api/countries?token=f8Mudw7MQe6i7698JVim8Zh4HVAnee2g'
const loadCountries = ()=>fetch(ENDPOINT)
  .then(response => response.json())

export default loadCountries