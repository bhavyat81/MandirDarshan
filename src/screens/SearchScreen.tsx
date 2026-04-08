import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { SearchBar } from '../components/SearchBar';
import { Colors } from '../utils/colors';
import { temples } from '../data/temples';
import { jyotirlingas } from '../data/jyotirlingas';
import { shaktiPeethas } from '../data/shaktiPeethas';
import { charDhamList } from '../data/charDham';

type NavProp = NativeStackNavigationProp<HomeStackParamList>;

type ResultItem = {
  id: string;
  name: string;
  location: string;
  type: 'TEMPLE' | 'JYOTIRLINGA' | 'SHAKTI PEETHA' | 'CHAR DHAM';
  screenName: keyof HomeStackParamList;
  paramKey: string;
};

const TYPE_COLORS: Record<string, string> = {
  TEMPLE: Colors.primary,
  JYOTIRLINGA: Colors.secondary,
  'SHAKTI PEETHA': '#7B2D8B',
  'CHAR DHAM': '#2E7D32',
};

export function SearchScreen() {
  const navigation = useNavigation<NavProp>();
  const [query, setQuery] = useState('');

  const allItems: ResultItem[] = [
    ...temples.map((t) => ({
      id: t.id,
      name: t.name,
      location: `${t.city}, ${t.state}`,
      type: 'TEMPLE' as const,
      screenName: 'TempleDetailScreen' as keyof HomeStackParamList,
      paramKey: 'templeId',
    })),
    ...jyotirlingas.map((j) => ({
      id: j.id,
      name: j.name,
      location: `${j.city}, ${j.state}`,
      type: 'JYOTIRLINGA' as const,
      screenName: 'JyotirlingaDetailScreen' as keyof HomeStackParamList,
      paramKey: 'jyotirlingaId',
    })),
    ...shaktiPeethas.map((s) => ({
      id: s.id,
      name: s.name,
      location: `${s.city}, ${s.state}`,
      type: 'SHAKTI PEETHA' as const,
      screenName: 'ShaktiPeethaDetailScreen' as keyof HomeStackParamList,
      paramKey: 'shaktiPeethaId',
    })),
    ...charDhamList.map((c) => ({
      id: c.id,
      name: c.name,
      location: `${c.city}, ${c.state}`,
      type: 'CHAR DHAM' as const,
      screenName: 'CharDhamDetailScreen' as keyof HomeStackParamList,
      paramKey: 'charDhamId',
    })),
  ];

  const results = query.trim().length > 0
    ? allItems.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handlePress = (item: ResultItem) => {
    navigation.navigate('Home' as any, {
      screen: item.screenName,
      params: { [item.paramKey]: item.id },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search temples, jyotirlingas..."
        autoFocus
      />

      {query.trim().length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={64} color={Colors.border} />
          <Text style={styles.emptyTitle}>Search Sacred Places</Text>
          <Text style={styles.emptySubtitle}>Search temples, jyotirlingas, shakti peethas...</Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={48} color={Colors.textLight} />
          <Text style={styles.noResultsText}>No results found for "{query}"</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => `${item.type}-${item.id}`}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultItem} onPress={() => handlePress(item)} activeOpacity={0.8}>
              <View style={[styles.typeBadge, { backgroundColor: TYPE_COLORS[item.type] }]}>
                <Text style={styles.typeText}>{item.type}</Text>
              </View>
              <View style={styles.resultContent}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultLocation}>{item.location}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
  },
  typeBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 10,
  },
  typeText: {
    fontSize: 10,
    color: Colors.textWhite,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  resultContent: {
    flex: 1,
  },
  resultName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  resultLocation: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 2,
  },
  separator: {
    height: 8,
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
    textAlign: 'center',
    marginTop: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 16,
  },
});
