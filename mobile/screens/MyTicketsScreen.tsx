// Placeholder for MyTicketsScreen.tsx in a React Native app.
// This screen would fetch tickets and store them for offline use via AsyncStorage.

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import BookingCard from '../components/BookingCard';

const mockUpcomingTickets = [
  { id: '1', company: 'Volcano Express', from: 'Kigali', to: 'Rubavu', date: '28 Oct, 2024', time: '07:00 AM', seats: 'A5, A6', qrValue: 'VK-83AD1' },
];

const mockPastTickets = [
  { id: '2', company: 'RITCO', from: 'Kigali', to: 'Huye', date: '15 Sep, 2024', time: '09:30 AM', seats: 'C1', qrValue: 'RT-98CD3' },
];

export default function MyTicketsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [tickets, setTickets] = useState([]);

  // This effect simulates loading tickets from local storage (for offline access)
  // and then fetching fresh data from an API.
  useEffect(() => {
    const loadTickets = async () => {
      const fetchedTickets = activeTab === 'Upcoming' ? mockUpcomingTickets : mockPastTickets;
      setTickets(fetchedTickets);
    };

    loadTickets();
  }, [activeTab]);
  
  const handleTicketPress = (ticket) => {
      navigation.navigate('TicketDetails', { ticket });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Upcoming')} style={[styles.tab, activeTab === 'Upcoming' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'Upcoming' && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Past')} style={[styles.tab, activeTab === 'Past' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'Past' && styles.activeTabText]}>Past</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <BookingCard 
                ticket={item} 
                isPast={activeTab === 'Past'} 
                onPress={() => handleTicketPress(item)}
            />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={() => (
          activeTab === 'Upcoming' && <Text style={styles.offlineNotice}>Your upcoming tickets are available offline.</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#002B7F' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#FFFFFF30' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  tabContainer: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#001A52',
    borderRadius: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    color: 'white',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#002B7F',
  },
  list: {
    paddingHorizontal: 20,
  },
  offlineNotice: {
      color: '#A7C7E7',
      textAlign: 'center',
      fontSize: 12,
      marginBottom: 16,
  }
});