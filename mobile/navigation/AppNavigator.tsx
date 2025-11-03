// This file defines the navigation structure of the app.
// It uses @react-navigation/bottom-tabs for the main screens and @react-navigation/native-stack for other flows.
// Note: These imports are placeholders for a real React Native environment.

import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';


// Mock placeholder components since we can't import real ones.
const NavigationContainer = (props: any) => <View>{props.children}</View>;
const createBottomTabNavigator = () => ({ Navigator: (props: any) => <View>{props.children}</View>, Screen: (props: any) => null });
const createNativeStackNavigator = () => ({ Navigator: (props: any) => <View>{props.children}</View>, Screen: (props: any) => null });


// Import Screens
import HomeScreen from '../screens/HomeScreen';
import MyTicketsScreen from '../screens/MyTicketsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';
import LiveTrackingScreen from '../screens/LiveTrackingScreen';
import TicketDetailsScreen from '../screens/TicketDetailsScreen';

// Mock Icons
const Icon = ({ name }) => <Text>{name}</Text>;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0033A0' },
        tabBarActiveTintColor: '#FBBF24',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="Home" />,
        }}
      />
      <Tab.Screen
        name="MyTickets"
        component={MyTicketsScreen}
        options={{
          tabBarLabel: 'My Tickets',
          tabBarIcon: ({ color }) => <Icon name="Ticket" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="User" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F3F4F6' },
        }}
      >
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
        <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
        <Stack.Screen name="LiveTracking" component={LiveTrackingScreen} />
        <Stack.Screen name="TicketDetails" component={TicketDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}