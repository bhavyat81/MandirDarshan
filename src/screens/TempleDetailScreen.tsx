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
import { temples } from '../data/temples';
import { jyotirlingas } from '../data/jyotirlingas';
import { charDhamList } from '../data/charDham';
import { shaktiPeethas } from '../data/shaktiPeethas';

type RouteType = RouteProp<HomeStackParamList, 'TempleDetailScreen'>;

export function TempleDetailScreen() {
  const route = useRoute<RouteType>();
  const { templeId } = route.params;

  const temple = temples.find((t) => t.id === templeId);
  const jyotirlinga = jyotirlingas.find((t) => t.id === templeId);
  const charDham = charDhamList.find((t) => t.id === templeId);
  const shaktiPeetha = shaktiPeethas.find((t) => t.id === templeId);

  if (!temple && !jyotirlinga && !charDham && !shaktiPeetha) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Temple not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const name = temple?.name ?? jyotirlinga?.name ?? charDham?.name ?? shaktiPeetha?.name ?? '';
  const nameHindi = temple?.nameHindi ?? jyotirlinga?.nameHindi ?? charDham?.nameHindi ?? shaktiPeetha?.nameHindi ?? '';
  const deity = temple?.deity ?? jyotirlinga?.deity ?? charDham?.deity ?? shaktiPeetha?.deityName ?? '';
  const timings = temple?.timings ?? jyotirlinga?.timings ?? charDham?.timings ?? shaktiPeetha?.timings ?? '';
  const bestTimeToVisit = temple?.bestTimeToVisit ?? jyotirlinga?.bestTimeToVisit ?? charDham?.bestTimeToVisit ?? shaktiPeetha?.bestTimeToVisit ?? '';
  const howToReach = temple?.howToReach ?? jyotirlinga?.howToReach ?? charDham?.howToReach ?? shaktiPeetha?.howToReach;
  const dosAndDonts = temple?.dosAndDonts ?? jyotirlinga?.dosAndDonts ?? charDham?.dosAndDonts ?? shaktiPeetha?.dosAndDonts ?? [];
  const historyOrStory = temple?.history ?? jyotirlinga?.story ?? charDham?.story ?? shaktiPeetha?.story ?? '';
  const architecture = temple?.architecture ?? jyotirlinga?.architecture ?? '';
  const yearBuilt = temple?.yearBuilt ?? jyotirlinga?.yearBuilt ?? '';
  const vipDarshan = temple?.vipDarshan ?? jyotirlinga?.vipDarshan ?? charDham?.vipDarshan;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBanner name={name} nameHindi={nameHindi} id={templeId} />

        <View style={styles.sectionsContainer}>
          <InfoSection title="About" icon="information-circle" defaultExpanded>
            {deity ? <Text style={styles.label}>Deity: <Text style={styles.value}>{deity}</Text></Text> : null}
            {architecture ? <Text style={styles.label}>Architecture: <Text style={styles.value}>{architecture}</Text></Text> : null}
            {yearBuilt ? <Text style={styles.label}>Year Built: <Text style={styles.value}>{yearBuilt}</Text></Text> : null}
          </InfoSection>

          <InfoSection title="History & Story" icon="book">
            <Text style={styles.bodyText}>{historyOrStory}</Text>
          </InfoSection>

          <InfoSection title="Temple Timings" icon="time">
            <Text style={styles.bodyText}>{timings}</Text>
          </InfoSection>

          {howToReach && (
            <InfoSection title="How to Reach" icon="navigate">
              <Text style={styles.label}>✈️ By Air</Text>
              <Text style={styles.bodyText}>{howToReach.byAir}</Text>
              <Text style={[styles.label, styles.labelSpacing]}>🚂 By Train</Text>
              <Text style={styles.bodyText}>{howToReach.byTrain}</Text>
              <Text style={[styles.label, styles.labelSpacing]}>🚌 By Road</Text>
              <Text style={styles.bodyText}>{howToReach.byRoad}</Text>
            </InfoSection>
          )}

          <InfoSection title="Do's & Don'ts" icon="list">
            {dosAndDonts.map((item, index) => (
              <Text key={index} style={styles.bulletItem}>• {item}</Text>
            ))}
          </InfoSection>

          {vipDarshan?.available && (
            <InfoSection title="VIP Darshan" icon="star">
              <Text style={styles.label}>Ticket Types:</Text>
              {vipDarshan.ticketTypes.map((t, i) => {
                const price = i < vipDarshan.prices.length ? vipDarshan.prices[i] : '';
                return <Text key={i} style={styles.bodyText}>• {t}{price ? ` — ${price}` : ''}</Text>;
              })}
              <Text style={[styles.label, styles.labelSpacing]}>Timings: <Text style={styles.value}>{vipDarshan.timings}</Text></Text>
              <Text style={[styles.label, styles.labelSpacing]}>Booking: <Text style={styles.value}>{vipDarshan.bookingInfo}</Text></Text>
            </InfoSection>
          )}

          <InfoSection title="Best Time to Visit" icon="sunny">
            <Text style={styles.bodyText}>{bestTimeToVisit}</Text>
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
  sectionsContainer: {
    paddingTop: 16,
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
