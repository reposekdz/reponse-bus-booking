
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddEditDriverScreen({ route, navigation }) {
    // const { driver } = route.params || {};
    const driver = null; // Mocking for now
    const isEditing = !!driver;

    const [name, setName] = useState(driver?.name || '');
    const [phone, setPhone] = useState(driver?.phone || '');
    const [assignedBus, setAssignedBus] = useState(driver?.assignedBus || '');
    const [avatar, setAvatar] = useState(driver?.avatarUrl || null);

    const handleSave = () => {
        alert(`Driver ${isEditing ? 'updated' : 'added'} successfully!`);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backButton}>{'<'}</Text></TouchableOpacity>
                <Text style={styles.headerTitle}>{isEditing ? 'Edit Driver' : 'Add New Driver'}</Text>
            </View>
            <ScrollView style={styles.content}>
                 <View style={styles.avatarContainer}>
                    <Image source={{ uri: avatar || 'https://via.placeholder.com/100' }} style={styles.avatar} />
                    <TouchableOpacity>
                        <Text style={styles.changeText}>Upload Photo</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Full Name</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />
                
                <Text style={styles.label}>Phone Number</Text>
                <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

                <Text style={styles.label}>Assigned Bus Plate</Text>
                <TextInput style={styles.input} value={assignedBus} onChangeText={setAssignedBus} />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Driver</Text>
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
    avatarContainer: { alignItems: 'center', marginBottom: 24 },
    avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E5E7EB' },
    changeText: { color: '#0033A0', fontWeight: '600', marginTop: 12 },
    label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8, marginTop: 12 },
    input: { backgroundColor: 'white', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB' },
    saveButton: { backgroundColor: '#0033A0', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
    saveButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
