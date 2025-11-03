
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../hooks/useAuth';

// Import Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import MyTicketsScreen from '../screens/MyTicketsScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TicketDetailsScreen from '../screens/TicketDetailsScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

// Agent Screens
import AgentDashboardScreen from '../screens/agent/AgentDashboardScreen';
import AgentDepositScreen from '../screens/agent/AgentDepositScreen';
import AgentTransactionsScreen from '../screens/agent/AgentTransactionsScreen';
import AgentProfileScreen from '../screens/agent/AgentProfileScreen';

// Driver Screens
import DriverDashboardScreen from '../screens/driver/DriverDashboardScreen';
import BoardingScreen from '../screens/driver/BoardingScreen';
import DriverSettingsScreen from '../screens/driver/DriverSettingsScreen';


// Company Screens
import CompanyDashboardScreen from '../screens/company/CompanyDashboardScreen';
import ManageFleetScreen from '../screens/company/ManageFleetScreen';
import ManageDriversScreen from '../screens/company/ManageDriversScreen';

// Admin Screens
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';

import Icon from '../components/Icon';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function PassengerTabs() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Home') iconName = 'home';
                else if (route.name === 'MyTickets') iconName = 'ticket';
                else if (route.name === 'Services') iconName = 'briefcase';
                else if (route.name === 'Profile') iconName = 'user-circle';
                return <Icon name={iconName} size={size} color={color} />;
            },
        })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="MyTickets" component={MyTicketsScreen} />
            <Tab.Screen name="Services" component={ServicesScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

function DriverTabs() {
     return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Dashboard') iconName = 'chart-bar';
                else if (route.name === 'Boarding') iconName = 'qr-code';
                else if (route.name === 'Profile') iconName = 'user-circle';
                return <Icon name={iconName} size={size} color={color} />;
            },
        })}>
            <Tab.Screen name="Dashboard" component={DriverDashboardScreen} />
            <Tab.Screen name="Boarding" component={BoardingScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

function AgentTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={AgentDashboardScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Deposit" component={AgentDepositScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Transactions" component={AgentTransactionsScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Profile" component={AgentProfileScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}


function CompanyTabs() {
     return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Dashboard') iconName = 'chart-bar';
                else if (route.name === 'Fleet') iconName = 'bus';
                else if (route.name === 'Drivers') iconName = 'users';
                return <Icon name={iconName} size={size} color={color} />;
            },
        })}>
            <Tab.Screen name="Dashboard" component={CompanyDashboardScreen} />
            <Tab.Screen name="Fleet" component={ManageFleetScreen} />
            <Tab.Screen name="Drivers" component={ManageDriversScreen} />
        </Tab.Navigator>
    );
}

function AdminTabs() {
    return (
        <Tab.Navigator>
             <Tab.Screen name="Dashboard" component={AdminDashboardScreen} options={{ headerShown: false }} />
             {/* Add other admin tabs here */}
        </Tab.Navigator>
    );
}

function AppStack() {
    const { user } = useAuth();

    switch(user?.role) {
        case 'passenger': return <PassengerTabs />;
        case 'driver': return <DriverTabs />;
        case 'agent': return <AgentTabs />;
        case 'company': return <CompanyTabs />;
        case 'admin': return <AdminTabs />;
        default: return <PassengerTabs />;
    }
}


export default function AppNavigator() {
    const { user } = useAuth();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <>
                    <Stack.Screen name="MainApp" component={AppStack} />
                    {/* Screens accessible after login */}
                    <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
                    <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
                    <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
                    <Stack.Screen name="TicketDetails" component={TicketDetailsScreen} />
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                    <Stack.Screen name="DriverBoarding" component={BoardingScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}
