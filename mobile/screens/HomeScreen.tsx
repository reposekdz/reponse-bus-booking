import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../contexts/LanguageContext';

// Mock Form Component
const SearchForm = ({ onSearch }) => {
    const { t } = useLanguage();
    const [from, setFrom] = React.useState('Kigali');
    const [to, setTo] = React.useState('Rubavu');
    return (
        <View style={styles.searchForm}>
            <TextInput placeholder={t('form_from')} style={styles.input} value={from} onChangeText={setFrom} />
            <TextInput placeholder={t('form_to')} style={styles.input} value={to} onChangeText={setTo} />
            <View style={styles.row}>
                <TouchableOpacity style={styles.dateInput}><Text>Oct 28</Text></TouchableOpacity>
                <TouchableOpacity style={styles.passengersInput}><Text>1 {t('form_passengers')}</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={() => onSearch(from, to)}>
                <Text style={styles.searchButtonText}>{t('form_search_button')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const featuredRoutes = [
    { from: 'Kigali', to: 'Rubavu', image: 'https://images.unsplash.com/photo-1590632313655-e9c5220c4273?q=80&w=2070&auto=format&fit=crop' },
    { from: 'Kigali', to: 'Musanze', image: 'https://www.andbeyond.com/wp-content/uploads/sites/5/one-of-the-reasons-to-visit-rwanda-gorilla.jpg' },
];

export default function HomeScreen({ navigation }) {
  const { t } = useLanguage();
  const handleSearch = (from, to) => {
    navigation.navigate('SearchResults', { from, to });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2048&auto=format&fit=crop' }}
          style={styles.hero}
        >
          <View style={styles.heroOverlay} />
          <Text style={styles.heroTitle}>{t('hero_title')}</Text>
          <Text style={styles.heroSubtitle}>{t('hero_subtitle')}</Text>
        </ImageBackground>

        <View style={styles.formContainer}>
          <SearchForm onSearch={handleSearch} />
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>{t('mobile_home_featured')}</Text>
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
    marginTop: -80,
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
  input: {
      backgroundColor: '#F3F4F6',
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
  },
  dateInput: {
      flex: 1,
      backgroundColor: '#F3F4F6',
      padding: 12,
      borderRadius: 8,
      marginRight: 8,
  },
  passengersInput: {
      flex: 1,
      backgroundColor: '#F3F4F6',
      padding: 12,
      borderRadius: 8,
      marginLeft: 8,
  },
  searchButton: {
      backgroundColor: '#FBBF24',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
  },
  searchButtonText: {
      color: '#0033A0',
      fontWeight: 'bold',
      fontSize: 16,
  },
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