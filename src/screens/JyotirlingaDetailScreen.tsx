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
import { jyotirlingas } from '../data/jyotirlingas';

type RouteType = RouteProp<HomeStackParamList, 'JyotirlingaDetailScreen'>;

export function JyotirlingaDetailScreen() {
  const route = useRoute<RouteType>();
  const { jyotirlingaId } = route.params;
  const item = jyotirlingas.find((j) => j.id === jyotirlingaId);

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Jyotirlinga not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBanner name={item.name} nameHindi={item.nameHindi} id={item.id} />

        <View style={styles.badgeContainer}>
          <View style={styles.numberBadge}>
            <Text style={styles.numberText}>Jyotirlinga #{item.jyotirlingaNumber}</Text>
          </View>
        </View>

        <View style={styles.sectionsContainer}>
          <InfoSection title="Mythological Story" icon="book" defaultExpanded>
            <Text style={styles.bodyText}>{item.story}</Text>
          </InfoSection>

          <InfoSection title="Significance" icon="star">
            <Text style={styles.bodyText}>{item.significance}</Text>
          </InfoSection>

          <InfoSection title="About" icon="information-circle">
            {item.deity ? <Text style={styles.label}>Deity: <Text style={styles.value}>{item.deity}</Text></Text> : null}
            {item.architecture ? <Text style={styles.label}>Architecture: <Text style={styles.value}>{item.architecture}</Text></Text> : null}
            {item.yearBuilt ? <Text style={styles.label}>Year Built: <Text style={styles.value}>{item.yearBuilt}</Text></Text> : null}
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

          {item.vipDarshan?.available && (
            <InfoSection title="VIP Darshan" icon="star-outline">
              <Text style={styles.label}>Ticket Types:</Text>
              {item.vipDarshan.ticketTypes.map((t, i) => {
                const price = i < item.vipDarshan!.prices.length ? item.vipDarshan!.prices[i] : '';
                return <Text key={i} style={styles.bodyText}>• {t}{price ? ` — ${price}` : ''}</Text>;
              })}
              <Text style={[styles.label, styles.labelSpacing]}>Timings: <Text style={styles.value}>{item.vipDarshan.timings}</Text></Text>
              <Text style={[styles.label, styles.labelSpacing]}>Booking: <Text style={styles.value}>{item.vipDarshan.bookingInfo}</Text></Text>
            </InfoSection>
          )}

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
  badgeContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  numberBadge: {
    backgroundColor: Colors.accent,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  numberText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.secondary,
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
  value: {
    fontWeight: '400',
    color: Colors.textLight,
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
