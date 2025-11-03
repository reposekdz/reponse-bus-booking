
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/useAuth';

// --- Screens ---
// Auth
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Common
import HomeScreen from '../screens/HomeScreen';
import MyTicketsScreen from '../screens/MyTicketsScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

// Booking Flow
import SearchResultsScreen from '../screens/SearchResultsScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';
import TicketDetailsScreen from '../screens/TicketDetailsScreen';

// Services
import BusCharterScreen from '../screens/BusCharterScreen';

// Driver Role
import DriverDashboardScreen from '../screens/driver/DriverDashboardScreen';
import BoardingScreen from '../screens/driver/BoardingScreen';
import DriverSettingsScreen from '../screens/driver/DriverSettingsScreen';

// Agent Role
import AgentDashboardScreen from '../screens/agent/AgentDashboardScreen';
import AgentDepositScreen from '../screens/agent/AgentDepositScreen';
import AgentTransactionsScreen from '../screens/agent/AgentTransactionsScreen';
import AgentProfileScreen from '../screens/agent/AgentProfileScreen';

// Company Role
import CompanyDashboardScreen from '../screens/company/CompanyDashboardScreen';
import ManageFleetScreen from '../screens/company/ManageFleetScreen';
import ManageDriversScreen from '../screens/company/ManageDriversScreen';

// Admin Role
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeMain" component={HomeScreen} />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
        <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
    </Stack.Navigator>
);

const TicketsStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyTicketsList" component={MyTicketsScreen} />
        <Stack.Screen name="TicketDetails" component={TicketDetailsScreen} />
    </Stack.Navigator>
);

const ServicesStack = () => (
     <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ServicesList" component={ServicesScreen} />
        <Stack.Screen name="BusCharter" component={BusCharterScreen} />
    </Stack.Navigator>
);

const ProfileStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileMain" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
);

// --- Role-based Tab Navigators ---

const PassengerTabs = () => (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="MyTickets" component={TicketsStack} />
        <Tab.Screen name="Services" component={ServicesStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
);

const DriverTabs = () => (
    <Tab.Navigator>
        <Tab.Screen name="DriverDashboard" component={DriverDashboardScreen} />
        <Tab.Screen name="DriverBoarding" component={BoardingScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
);

const AgentTabs = () => (
    <Tab.Navigator>
        <Tab.Screen name="AgentDashboard" component={AgentDashboardScreen} />
        <Tab.Screen name="AgentDeposit" component={AgentDepositScreen} />
        <Tab.Screen name="AgentTransactions" component={AgentTransactionsScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
);

const CompanyTabs = () => (
    <Tab.Navigator>
        <Tab.Screen name="CompanyDashboard" component={CompanyDashboardScreen} />
        <Tab.Screen name="ManageFleet" component={ManageFleetScreen} />
        <Tab.Screen name="ManageDrivers" component={ManageDriversScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
);

const AdminTabs = () => (
    <Tab.Navigator>
        <Tab.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
);


const AppNavigator = () => {
    const { user } = useAuth();

    const renderTabsByRole = () => {
        switch (user?.role) {
            case 'driver': return <DriverTabs />;
            case 'agent': return <AgentTabs />;
            case 'company': return <CompanyTabs />;
            case 'admin': return <AdminTabs />;
            case 'passenger':
            default:
                return <PassengerTabs />;
        }
    }

    return (
        <NavigationContainer>
            {user ? renderTabsByRole() : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;
