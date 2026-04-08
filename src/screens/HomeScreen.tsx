import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { SearchBar } from '../components/SearchBar';
import { SectionCard } from '../components/SectionCard';
import { Colors } from '../utils/colors';
import { temples } from '../data/temples';

type HomeNavProp = NativeStackNavigationProp<HomeStackParamList>;

const FEATURED_TEMPLES = temples.slice(0, 6);

export function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length > 0) {
      (navigation as any).getParent()?.navigate('Search');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.heroHeader}>
          <Text style={styles.heroTitle}>🛕 Mandir Darshan</Text>
          <Text style={styles.heroSubtitle}>Explore Sacred Temples of India</Text>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search temples, jyotirlingas..."
        />

        {/* Section Cards Grid */}
        <Text style={styles.sectionTitle}>Explore</Text>
        <View style={styles.gridRow}>
          <SectionCard
            icon="map-outline"
            title="Browse by State"
            subtitle="All states of India"
            color={Colors.primary}
            onPress={() => navigation.navigate('StateListScreen')}
          />
          <SectionCard
            icon="flame-outline"
            title="12 Jyotirlingas"
            subtitle="Sacred Shiva shrines"
            color={Colors.secondary}
            onPress={() => navigation.navigate('JyotirlingaListScreen')}
          />
        </View>
        <View style={styles.gridRow}>
          <SectionCard
            icon="star-outline"
            title="Shakti Peethas"
            subtitle="Divine goddess shrines"
            color="#7B2D8B"
            onPress={() => navigation.navigate('ShaktiPeethaListScreen')}
          />
          <SectionCard
            icon="compass-outline"
            title="Char Dham"
            subtitle="Four sacred pilgrimages"
            color="#008080"
            onPress={() => navigation.navigate('CharDhamListScreen')}
          />
        </View>

        {/* Featured Temples */}
        <Text style={styles.sectionTitle}>Featured Temples</Text>
        <FlatList
          data={FEATURED_TEMPLES}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.featuredCard}
              onPress={() => navigation.navigate('TempleDetailScreen', { templeId: item.id })}
              activeOpacity={0.85}
            >
              <View style={styles.featuredIconContainer}>
                <Text style={styles.featuredEmoji}>🛕</Text>
              </View>
              <Text style={styles.featuredName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.featuredCity}>{item.city}</Text>
              <Text style={styles.featuredDeity} numberOfLines={1}>{item.deity}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroHeader: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
    paddingBottom: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textWhite,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 6,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 4,
  },
  gridRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  featuredList: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  featuredCard: {
    width: 140,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  featuredIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featuredEmoji: {
    fontSize: 24,
  },
  featuredName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 17,
  },
  featuredCity: {
    fontSize: 11,
    color: Colors.textLight,
    marginTop: 3,
    textAlign: 'center',
  },
  featuredDeity: {
    fontSize: 11,
    color: Colors.primary,
    marginTop: 2,
    textAlign: 'center',
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 24,
  },
});
