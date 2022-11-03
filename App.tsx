import { NativeBaseProvider, StatusBar} from "native-base";
import { useFonts, Roboto_400Regular, Roboto_700Bold, } from "@expo-google-fonts/roboto";
import { Loadding } from "./src/screens/loadding";
import { THEME } from "./src/styles/theme";
import { Routes } from "./src/routes";

export default function App() {
  const [fontLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      {fontLoaded ? <Routes/> : <Loadding message="Loadding..." spinn={true} />}
    </NativeBaseProvider>
  );
}
