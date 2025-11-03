// Placeholder for HomeScreen.tsx in a React Native app.
// It showcases a typical layout with a hero image, search form, and featured content.

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// In a real app, these would be proper components and icons
const SearchForm = () => <View style={styles.searchForm}><Text style={styles.formText}>Search Form Placeholder</Text></View>;
const Icon = ({ name }) => <Text>{name}</Text>;

const featuredRoutes = [
    { from: 'Kigali', to: 'Rubavu', image: 'https://images.unsplash.com/photo-1590632313655-e9c5220c4273?q=80&w=2070&auto=format&fit=crop' },
    { from: 'Kigali', to: 'Musanze', image: 'https://www.andbeyond.com/wp-content/uploads/sites/5/one-of-the-reasons-to-visit-rwanda-gorilla.jpg' },
];

export default function HomeScreen({ navigation }) {
  const handleSearch = (from, to) => {
    // In a real app, you would navigate to the search results screen
    // navigation.navigate('SearchResults', { from, to });
    alert(`Searching for buses from ${from} to ${to}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2048&auto=format&fit=crop' }}
          style={styles.hero}
        >
          <View style={styles.heroOverlay} />
          <Text style={styles.heroTitle}>Tegura Urugendo Rwawe</Text>
          <Text style={styles.heroSubtitle}>Kata itike ya bisi mu buryo bworoshye.</Text>
        </ImageBackground>

        <View style={styles.formContainer}>
          <SearchForm onSearch={handleSearch} />
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Ingendo Zikunzwe</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredRoutes.map((route) => (
              <TouchableOpacity key={`${route.from}-${route.to}`} style={styles.routeCard} onPress={() => handleSearch(route.from, route.to)}>
                <ImageBackground source={{ uri: route.image }} style={styles.routeImage} imageStyle={{ borderRadius: 12 }}>
                  <View style={styles.routeOverlay} />
                  <Text style={styles.routeText}>{route.from} to {route.to}</Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollContent: { paddingBottom: 20 },
  hero: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 51, 160, 0.6)',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
  },
  formContainer: {
    marginTop: -50,
    paddingHorizontal: 20,
  },
  searchForm: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
  },
  formText: { color: '#333' },
  content: { marginTop: 20, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827'
  },
  routeCard: {
    width: 200,
    height: 120,
    marginRight: 16,
  },
  routeImage: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
  },
  routeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
  },
  routeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
