import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Country } from "../screens/Country";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{headerShown:false}}>
      <Screen name="home" component={Home} />
      <Screen name="country" component={Country} />
    </Navigator>
  );
}
