// This file defines the navigation structure of the app.
import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../hooks/useAuth';

// Mock placeholder components since we can't import real ones.
// FIX: Explicitly type `children` prop for mock components to resolve missing property error.
const NavigationContainer = (props: { children: React.ReactNode }) => <View>{props.children}</View>;
const createBottomTabNavigator = () => ({ Navigator: (props: { children: React.ReactNode }) => <View>{props.children}</View>, Screen: (props: any) => null });
const createNativeStackNavigator = () => ({ Navigator: (props: { children: React.ReactNode }) => <View>{props.children}</View>, Screen: (props: any) => null });

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import MyTicketsScreen from '../screens/MyTicketsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';
import LiveTrackingScreen from '../screens/LiveTrackingScreen';
import TicketDetailsScreen from '../screens/TicketDetailsScreen';
import ServicesScreen from '../screens/ServicesScreen';
import BusCharterScreen from '../screens/BusCharterScreen';

// Admin Screens
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import ManageUsersScreen from '../screens/admin/ManageUsersScreen';

// Company Screens
import CompanyDashboardScreen from '../screens/company/CompanyDashboardScreen';
import ManageFleetScreen from '../screens/company/ManageFleetScreen';

// Mock Icons
const Icon = ({ name }) => <Text>{name}</Text>;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PassengerTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Icon name="Home" /> }} />
      <Tab.Screen name="Services" component={ServicesScreen} options={{ tabBarIcon: () => <Icon name="Services" /> }} />
      <Tab.Screen name="MyTickets" component={MyTicketsScreen} options={{ tabBarIcon: () => <Icon name="Ticket" /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => <Icon name="User" /> }} />
    </Tab.Navigator>
  );
}

function AdminTabs() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'Dashboard', tabBarIcon: () => <Icon name="Dashboard" /> }} />
        <Tab.Screen name="ManageUsers" component={ManageUsersScreen} options={{ title: 'Manage Users', tabBarIcon: () => <Icon name="Users" /> }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => <Icon name="User" /> }} />
      </Tab.Navigator>
    );
}

function CompanyTabs() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="CompanyDashboard" component={CompanyDashboardScreen} options={{ title: 'Dashboard', tabBarIcon: () => <Icon name="Dashboard" /> }} />
        <Tab.Screen name="ManageFleet" component={ManageFleetScreen} options={{ title: 'Manage Fleet', tabBarIcon: () => <Icon name="Bus" /> }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => <Icon name="User" /> }} />
      </Tab.Navigator>
    );
}


export default function AppNavigator() {
  const { user } = useAuth();

  const renderRootNavigator = () => {
    if (!user) {
        // Here you would have an Auth stack with Login/Register screens
        // For this demo, we use the ProfileScreen to simulate login
        // FIX: Pass a mock navigation prop to satisfy the component's signature.
        return <ProfileScreen navigation={{}} />;
    }
    switch (user.role) {
        case 'admin':
            return <AdminTabs />;
        case 'company':
            return <CompanyTabs />;
        case 'passenger':
        default:
            return <PassengerTabs />;
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Root" component={renderRootNavigator} />
        {/* Common screens available to all roles */}
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
        <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
        <Stack.Screen name="LiveTracking" component={LiveTrackingScreen} />
        <Stack.Screen name="TicketDetails" component={TicketDetailsScreen} />
        <Stack.Screen name="BusCharter" component={BusCharterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}