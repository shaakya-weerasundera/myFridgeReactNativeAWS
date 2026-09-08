import { Tabs } from 'expo-router';

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" options={{ title: 'Home' }} />
            <Tabs.Screen name="inventory" options={{ title: 'Inventory' }} />
            <Tabs.Screen name="scan" options={{ title: 'Scan' }} />
            <Tabs.Screen name="shopping" options={{ title: 'Shopping' }} />
            <Tabs.Screen name="recipes" options={{ title: 'Recipes' }} />
        </Tabs>
    );
}