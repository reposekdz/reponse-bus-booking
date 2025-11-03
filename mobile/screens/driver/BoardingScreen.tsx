
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockPassengers = [
    { id: 1, name: 'Kalisa Jean', seat: 'A5', ticketId: 'VK-83AD1', status: 'booked' },
    { id: 2, name: 'Mutesi Aline', seat: 'A6', ticketId: 'VK-83AD2', status: 'booked' },
    { id: 3, name: 'Gatete David', seat: 'B1', ticketId: 'VK-83AD3', status: 'boarded' },
];


export default function BoardingScreen() {
    const [passengers, setPassengers] = useState(mockPassengers);
    const [scanResult, setScanResult] = useState('');
    const [scannedTicketId, setScannedTicketId] = useState('');

    const handleScan = () => {
        const passenger = passengers.find(p => p.ticketId.toLowerCase() === scannedTicketId.toLowerCase());
        if(passenger) {
            if(passenger.status === 'boarded') {
                Alert.alert("Already Boarded", `${passenger.name} has already boarded.`);
            } else {
                 setPassengers(passengers.map(p => p.id === passenger.id ? {...p, status: 'boarded'} : p));
                 Alert.alert("Success", `Welcome, ${passenger.name}! (Seat: ${passenger.seat})`);
            }
        } else {
            Alert.alert("Invalid Ticket", "This ticket ID was not found for this trip.");
        }
        setScannedTicketId('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Passenger Boarding</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                 <View style={styles.scannerContainer}>
                    <Text style={styles.scannerPlaceholder}>QR Scanner View</Text>
                </View>
                <Text style={styles.manualEntryLabel}>Or Enter Ticket ID Manually:</Text>
                 <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="e.g., VK-83AD1" 
                        value={scannedTicketId}
                        onChangeText={setScannedTicketId}
                        autoCapitalize="characters"
                    />
                    <TouchableOpacity style={styles.verifyButton} onPress={handleScan}>
                        <Text style={styles.verifyButtonText}>Verify</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.manifestTitle}>Passenger Manifest</Text>
                {passengers.map(p => (
                    <View key={p.id} style={styles.passengerItem}>
                        <View>
                            <Text style={styles.passengerName}>{p.name}</Text>
                            <Text style={styles.passengerDetails}>Seat: {p.seat} | ID: {p.ticketId}</Text>
                        </View>
                        <Text style={[styles.status, { color: p.status === 'boarded' ? '#10B981' : '#F59E0B'}]}>{p.status}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6' },
    header: { padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
    headerTitle: { fontSize: 24, fontWeight: 'bold' },
    content: { padding: 20 },
    scannerContainer: {
        aspectRatio: 1,
        width: '100%',
        backgroundColor: '#111827',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    scannerPlaceholder: { color: '#6B7280' },
    manualEntryLabel: { textAlign: 'center', color: '#6B7280', marginBottom: 8 },
    inputContainer: { flexDirection: 'row', marginBottom: 24 },
    input: {
        flex: 1,
        backgroundColor: 'white',
        padding: 12,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB'
    },
    verifyButton: {
        backgroundColor: '#0033A0',
        padding: 12,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: 'center'
    },
    verifyButtonText: { color: 'white', fontWeight: 'bold' },
    manifestTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
    passengerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 8,
    },
    passengerName: { fontWeight: '600' },
    passengerDetails: { color: '#6B7280', fontSize: 12 },
    status: { fontWeight: 'bold' },
});
