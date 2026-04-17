import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCityScreen from "../screens/AddCityScreen";
import AddLocationsScreen from "../screens/AddLocationsScreen";
import CityDetailsScreen from "../screens/CityDetailsScreen";
import EditCityScreen from "../screens/EditCityScreen";
import EditLocationsScreen from "../screens/EditLocationsScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddCity" component={AddCityScreen} />
      <Stack.Screen name="EditCity" component={EditCityScreen} />
      <Stack.Screen name="CityDetails" component={CityDetailsScreen} />
      <Stack.Screen name="AddLocations" component={AddLocationsScreen} />
      <Stack.Screen name="EditLocations" component={EditLocationsScreen} />
    </Stack.Navigator>
  );
}