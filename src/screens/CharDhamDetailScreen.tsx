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
import { charDhamList } from '../data/charDham';

type RouteType = RouteProp<HomeStackParamList, 'CharDhamDetailScreen'>;

export function CharDhamDetailScreen() {
  const route = useRoute<RouteType>();
  const { charDhamId } = route.params;
  const item = charDhamList.find((c) => c.id === charDhamId);

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Char Dham not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBanner name={item.name} nameHindi={item.nameHindi} id={item.id} />

        <View style={styles.sectionsContainer}>
          <InfoSection title="Story & Significance" icon="book" defaultExpanded>
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

          {item.vipDarshan?.available && (
            <InfoSection title="VIP Darshan" icon="star-outline">
              <Text style={styles.label}>Ticket Types:</Text>
              {item.vipDarshan.ticketTypes.map((t, i) => (
                <Text key={i} style={styles.bodyText}>• {t} — {item.vipDarshan!.prices[i] ?? ''}</Text>
              ))}
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
