import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'myfridge_token';

/* when called, saves the authentication token (assuming when user creates an account?) */
export async function saveToken(token: string) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
}

/* assuming similar logic as saveToken but to get authentication token when user is logged in? */
export async function getToken() {
    return AsyncStorage.getItem(TOKEN_KEY);
}

/* assuming similar logic as saveToken but to remove the token when user is logged out? */
export async function clearToken() {
    await AsyncStorage.removeItem(TOKEN_KEY);
}
