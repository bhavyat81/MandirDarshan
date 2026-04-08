import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'mandir_darshan_favorites';

export async function getFavorites(): Promise<string[]> {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

export async function addFavorite(id: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    if (!favorites.includes(id)) {
      favorites.push(id);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch {
    // ignore storage errors
  }
}

export async function removeFavorite(id: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    const updated = favorites.filter((fav) => fav !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }
}

export async function isFavorite(id: string): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    return favorites.includes(id);
  } catch {
    return false;
  }
}
