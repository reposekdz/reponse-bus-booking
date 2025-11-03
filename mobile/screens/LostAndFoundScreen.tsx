
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LostAndFoundScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backButton}>{'<'}</Text></TouchableOpacity>
                <Text style={styles.headerTitle}>Lost & Found</Text>
            </View>
            <ScrollView style={styles.content}>
                <Text style={styles.description}>
                    Lost an item on one of our buses? Found something that someone else left behind? Let us know.
                </Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Report a Lost Item</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
                    <Text style={[styles.buttonText, styles.secondaryButtonText]}>Inquire About a Found Item</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    header: { padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center' },
    backButton: { fontSize: 24, fontWeight: 'bold', marginRight: 16, color: '#0033A0' },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    content: { padding: 20 },
    description: { fontSize: 16, color: '#374151', lineHeight: 24, marginBottom: 24 },
    button: { backgroundColor: '#0033A0', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    secondaryButton: { backgroundColor: 'white', borderWidth: 1, borderColor: '#0033A0' },
    secondaryButtonText: { color: '#0033A0' },
});
