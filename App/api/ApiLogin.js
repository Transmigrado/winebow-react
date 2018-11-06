
const ENDPOINT = 'https://api.winebow.us/api/login?'

const login = email =>fetch(`${ENDPOINT}`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({email, token:'f8Mudw7MQe6i7698JVim8Zh4HVAnee2g'})
}
)

export default login