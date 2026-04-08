import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../utils/colors';

const FEATURES = [
  '🛕 Browse temples across all Indian states',
  '🕉️ Complete guide to all 12 Jyotirlingas',
  '🌺 Explore sacred Shakti Peethas',
  '🙏 Char Dham Yatra information',
  '❤️ Save your favorite temples',
  '🔍 Search across all sacred places',
  '📍 How to reach each temple',
  '⏰ Temple timings and best time to visit',
  '🎟️ VIP Darshan booking information',
  "📜 Dos & Don'ts for each temple",
];

export function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🛕</Text>
          <Text style={styles.headerTitle}>Mandir Darshan</Text>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the App</Text>
          <Text style={styles.bodyText}>
            Mandir Darshan is your complete guide to the sacred temples of India. Whether you're planning a pilgrimage or simply want to learn about India's rich spiritual heritage, this app brings the divine to your fingertips.
          </Text>
          <Text style={[styles.bodyText, { marginTop: 10 }]}>
            From the ancient Jyotirlingas of Lord Shiva to the powerful Shakti Peethas and the revered Char Dham, explore thousands of years of devotion and architecture.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          {FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the Data</Text>
          <Text style={styles.bodyText}>
            The information in this app has been carefully curated from trusted sources. Temple timings and VIP darshan details may change — always verify with the temple authorities before visiting.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with 🙏 in India</Text>
          <View style={styles.footerDivider} />
          <Text style={styles.footerSubText}>
            "यत्र विश्वं भवत्येकनीडम्" — Where the universe becomes one nest
          </Text>
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
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 52,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textWhite,
  },
  versionBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginTop: 8,
  },
  versionText: {
    fontSize: 13,
    color: Colors.textWhite,
    fontWeight: '600',
  },
  section: {
    backgroundColor: Colors.card,
    margin: 16,
    marginBottom: 0,
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 6,
  },
  bodyText: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 22,
  },
  featureItem: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  featureText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    padding: 32,
    marginTop: 8,
  },
  footerText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  footerDivider: {
    width: 60,
    height: 2,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  footerSubText: {
    fontSize: 13,
    color: Colors.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
