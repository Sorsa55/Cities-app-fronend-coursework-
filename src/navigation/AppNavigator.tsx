import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InfoScreen from '../screens/InfoScreen';
import HomeStackNavigator from "./HomeStackNavigator";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Info" component={InfoScreen} />
    </Tab.Navigator>
  );
}