
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddEditBusScreen({ route, navigation }) {
    // const { bus } = route.params || {}; // Get bus data if editing
    const bus = null; // Mocking for now
    const isEditing = !!bus;

    const [plate, setPlate] = useState(bus?.plate || '');
    const [model, setModel] = useState(bus?.model || '');
    const [capacity, setCapacity] = useState(bus?.capacity?.toString() || '');

    const handleSave = () => {
        // Save logic here
        alert(`Bus ${isEditing ? 'updated' : 'added'} successfully!`);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backButton}>{'<'}</Text></TouchableOpacity>
                <Text style={styles.headerTitle}>{isEditing ? 'Edit Bus' : 'Add New Bus'}</Text>
            </View>
            <ScrollView style={styles.content}>
                <Text style={styles.label}>Plate Number</Text>
                <TextInput style={styles.input} value={plate} onChangeText={setPlate} placeholder="e.g., RAD 123 B" />
                
                <Text style={styles.label}>Bus Model</Text>
                <TextInput style={styles.input} value={model} onChangeText={setModel} placeholder="e.g., Yutong Explorer" />

                <Text style={styles.label}>Capacity</Text>
                <TextInput style={styles.input} value={capacity} onChangeText={setCapacity} keyboardType="number-pad" placeholder="e.g., 55" />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Bus</Text>
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
    label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8, marginTop: 12 },
    input: { backgroundColor: 'white', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB' },
    saveButton: { backgroundColor: '#0033A0', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
    saveButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
