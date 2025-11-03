// Placeholder for a reusable BookingCard component in React Native.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Mock Icon
const Icon = ({ name }) => <Text style={{ color: '#6B7280', fontSize: 10 }}>{name}</Text>;

export default function BookingCard({ ticket, isPast }) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.company}>{ticket.company}</Text>
        <Text style={isPast ? styles.statusPast : styles.statusUpcoming}>{isPast ? 'Completed' : 'Upcoming'}</Text>
      </View>
      <View style={styles.routeContainer}>
        <Text style={styles.location}>{ticket.from}</Text>
        <Icon name="-->" />
        <Text style={styles.location}>{ticket.to}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Icon name="Date" />
          <Text style={styles.detailText}>{ticket.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="Time" />
          <Text style={styles.detailText}>{ticket.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="Seat" />
          <Text style={styles.detailText}>{ticket.seats}</Text>
        </View>
      </View>
      {!isPast && (
        <View style={styles.qrCodePlaceholder}>
          <Text style={styles.qrCodeText}>QR</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  company: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusUpcoming: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statusPast: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0033A0',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 4,
  },
  qrCodePlaceholder: {
    position: 'absolute',
    right: 16,
    top: 60,
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  qrCodeText: {
      fontWeight: 'bold',
      color: '#9CA3AF'
  }
});
