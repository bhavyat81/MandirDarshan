import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { HeaderBanner } from '../components/HeaderBanner';
import { InfoSection } from '../components/InfoSection';
import { Colors } from '../utils/colors';
import { shaktiPeethas } from '../data/shaktiPeethas';

type RouteType = RouteProp<HomeStackParamList, 'ShaktiPeethaDetailScreen'>;

export function ShaktiPeethaDetailScreen() {
  const route = useRoute<RouteType>();
  const { shaktiPeethaId } = route.params;
  const item = shaktiPeethas.find((s) => s.id === shaktiPeethaId);

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Shakti Peetha not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBanner name={item.name} nameHindi={item.nameHindi} id={item.id} />

        {/* Deity Info Card */}
        <View style={styles.deityCard}>
          <View style={styles.deityRow}>
            <View style={styles.deityItem}>
              <Text style={styles.deityLabel}>Goddess</Text>
              <Text style={styles.deityValue}>{item.deityName}</Text>
            </View>
            <View style={styles.deityDivider} />
            <View style={styles.deityItem}>
              <Text style={styles.deityLabel}>Bhairava</Text>
              <Text style={styles.deityValue}>{item.bhairavaName}</Text>
            </View>
            <View style={styles.deityDivider} />
            <View style={styles.deityItem}>
              <Text style={styles.deityLabel}>Body Part</Text>
              <Text style={styles.deityValue}>{item.bodyPart}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionsContainer}>
          <InfoSection title="Story" icon="book" defaultExpanded>
            <Text style={styles.bodyText}>{item.story}</Text>
          </InfoSection>

          <InfoSection title="Significance" icon="star">
            <Text style={styles.bodyText}>{item.significance}</Text>
          </InfoSection>

          <InfoSection title="Temple Timings" icon="time">
            <Text style={styles.bodyText}>{item.timings}</Text>
          </InfoSection>

          <InfoSection title="How to Reach" icon="navigate">
            <Text style={styles.label}>✈️ By Air</Text>
            <Text style={styles.bodyText}>{item.howToReach.byAir}</Text>
            <Text style={[styles.label, styles.labelSpacing]}>🚂 By Train</Text>
            <Text style={styles.bodyText}>{item.howToReach.byTrain}</Text>
            <Text style={[styles.label, styles.labelSpacing]}>🚌 By Road</Text>
            <Text style={styles.bodyText}>{item.howToReach.byRoad}</Text>
          </InfoSection>

          <InfoSection title="Do's & Don'ts" icon="list">
            {item.dosAndDonts.map((d, i) => (
              <Text key={i} style={styles.bulletItem}>• {d}</Text>
            ))}
          </InfoSection>

          <InfoSection title="Best Time to Visit" icon="sunny">
            <Text style={styles.bodyText}>{item.bestTimeToVisit}</Text>
          </InfoSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  deityCard: {
    backgroundColor: Colors.card,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  deityItem: {
    flex: 1,
    alignItems: 'center',
  },
  deityDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  deityLabel: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  deityValue: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  sectionsContainer: {
    paddingBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 6,
  },
  labelSpacing: {
    marginTop: 12,
  },
  bodyText: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 22,
    marginTop: 4,
  },
  bulletItem: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 22,
    marginTop: 4,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: Colors.textLight,
  },
});
