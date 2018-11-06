
const ENDPOINT = 'https://api.winebow.us/api/register?'

const signup = ({email,name}) =>fetch(`${ENDPOINT}`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({email, name, token:'f8Mudw7MQe6i7698JVim8Zh4HVAnee2g'})
}
)

export default signup