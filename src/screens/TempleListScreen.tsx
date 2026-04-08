import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { TempleCard } from '../components/TempleCard';
import { Colors } from '../utils/colors';
import { temples } from '../data/temples';
import { jyotirlingas } from '../data/jyotirlingas';
import { charDhamList } from '../data/charDham';
import { states } from '../data/states';
import { Temple } from '../types';

type NavProp = NativeStackNavigationProp<HomeStackParamList>;
type RouteType = RouteProp<HomeStackParamList, 'TempleListScreen'>;

export function TempleListScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteType>();
  const { city, stateId } = route.params;

  const stateObj = states.find((s) => s.id === stateId);
  const stateName = stateObj?.name ?? '';

  const matchCity = (c: string) => c.toLowerCase() === city.toLowerCase();
  const matchState = (s: string) => s.toLowerCase() === stateName.toLowerCase();

  const allTemples: Temple[] = [
    ...temples.filter((t) => matchCity(t.city) || matchState(t.state)),
    ...jyotirlingas.filter((t) => matchCity(t.city) || matchState(t.state)),
  ];

  const charDhamTemples: Temple[] = charDhamList
    .filter((t) => matchCity(t.city) || matchState(t.state))
    .map((c) => ({
      id: c.id,
      name: c.name,
      nameHindi: c.nameHindi,
      city: c.city,
      state: c.state,
      deity: c.deity,
      description: c.story,
      history: c.story,
      architecture: '',
      yearBuilt: '',
      timings: c.timings,
      bestTimeToVisit: c.bestTimeToVisit,
      howToReach: c.howToReach,
      dosAndDonts: c.dosAndDonts,
      vipDarshan: c.vipDarshan,
      category: ['charDham' as const],
    }));

  const combined = [
    ...allTemples,
    ...charDhamTemples.filter((cd) => !allTemples.find((t) => t.id === cd.id)),
  ];

  const seen = new Set<string>();
  const unique = combined.filter((t) => {
    if (seen.has(t.id)) return false;
    seen.add(t.id);
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBanner}>
        <Text style={styles.headerTitle}>{city}</Text>
        <Text style={styles.headerSub}>{unique.length} temple{unique.length !== 1 ? 's' : ''} found</Text>
      </View>
      {unique.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={48} color={Colors.textLight} />
          <Text style={styles.emptyText}>No temples listed yet for {city}</Text>
        </View>
      ) : (
        <FlatList
          data={unique}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
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
              onPress={() => navigation.navigate('TempleDetailScreen', { templeId: item.id })}
            />
          )}
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
  headerBanner: {
    backgroundColor: Colors.primary,
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
    paddingHorizontal: 0,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 16,
  },
});
