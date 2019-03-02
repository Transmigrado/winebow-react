import { AsyncStorage } from 'react-native'

const storageData = async (key,data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
        return Promise.reject(error)
    }

    return Promise.resolve(data)
}

const retrieveData = async key => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return Promise.resolve(JSON.parse(value))
        }
        return Promise.reject('Empty Data')
    } catch (error) {
        return Promise.reject(error)
    }
}

export default { storageData, retrieveData }