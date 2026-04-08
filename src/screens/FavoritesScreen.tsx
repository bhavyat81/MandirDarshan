import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { TempleCard } from '../components/TempleCard';
import { Colors } from '../utils/colors';
import { getFavorites } from '../utils/favorites';
import { temples } from '../data/temples';
import { jyotirlingas } from '../data/jyotirlingas';
import { shaktiPeethas } from '../data/shaktiPeethas';
import { charDhamList } from '../data/charDham';
import { Temple } from '../types';

type NavProp = NativeStackNavigationProp<HomeStackParamList>;

type FavItem = {
  id: string;
  name: string;
  nameHindi: string;
  city: string;
  state: string;
  deity: string;
  description: string;
  category: Temple['category'];
  detailScreen: keyof HomeStackParamList;
  paramKey: string;
};

export function FavoritesScreen() {
  const navigation = useNavigation<NavProp>();
  const [favorites, setFavorites] = useState<FavItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavorites = useCallback(async () => {
    const ids = await getFavorites();
    const items: FavItem[] = [];

    for (const id of ids) {
      const temple = temples.find((t) => t.id === id);
      if (temple) {
        items.push({
          id: temple.id,
          name: temple.name,
          nameHindi: temple.nameHindi,
          city: temple.city,
          state: temple.state,
          deity: temple.deity,
          description: temple.description,
          category: temple.category,
          detailScreen: 'TempleDetailScreen',
          paramKey: 'templeId',
        });
        continue;
      }
      const jyotirlinga = jyotirlingas.find((j) => j.id === id);
      if (jyotirlinga) {
        items.push({
          id: jyotirlinga.id,
          name: jyotirlinga.name,
          nameHindi: jyotirlinga.nameHindi,
          city: jyotirlinga.city,
          state: jyotirlinga.state,
          deity: jyotirlinga.deity,
          description: jyotirlinga.description,
          category: jyotirlinga.category,
          detailScreen: 'JyotirlingaDetailScreen',
          paramKey: 'jyotirlingaId',
        });
        continue;
      }
      const shaktiPeetha = shaktiPeethas.find((s) => s.id === id);
      if (shaktiPeetha) {
        items.push({
          id: shaktiPeetha.id,
          name: shaktiPeetha.name,
          nameHindi: shaktiPeetha.nameHindi,
          city: shaktiPeetha.city,
          state: shaktiPeetha.state,
          deity: shaktiPeetha.deityName,
          description: shaktiPeetha.story,
          category: [],
          detailScreen: 'ShaktiPeethaDetailScreen',
          paramKey: 'shaktiPeethaId',
        });
        continue;
      }
      const charDham = charDhamList.find((c) => c.id === id);
      if (charDham) {
        items.push({
          id: charDham.id,
          name: charDham.name,
          nameHindi: charDham.nameHindi,
          city: charDham.city,
          state: charDham.state,
          deity: charDham.deity,
          description: charDham.story,
          category: ['charDham'],
          detailScreen: 'CharDhamDetailScreen',
          paramKey: 'charDhamId',
        });
      }
    }
    setFavorites(items);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  const handlePress = (item: FavItem) => {
    navigation.navigate('Home' as any, {
      screen: item.detailScreen,
      params: { [item.paramKey]: item.id },
    } as any);
  };

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerTitle}>❤️ Favorites</Text>
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={64} color={Colors.border} />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>Start exploring temples!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBanner}>
        <Text style={styles.headerTitle}>❤️ Favorites</Text>
        <Text style={styles.headerSub}>{favorites.length} saved place{favorites.length !== 1 ? 's' : ''}</Text>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <TempleCard
            id={item.id}
            name={item.name}
            nameHindi={item.nameHindi}
            city={item.city}
            state={item.state}
            deity={item.deity}
            description={item.description}
            category={item.category}
            onPress={() => handlePress(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerBanner: {
    backgroundColor: '#E53935',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textWhite,
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  list: {
    paddingVertical: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 8,
  },
});
