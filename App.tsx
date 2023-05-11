import "react-native-gesture-handler";
import { NativeBaseProvider, extendTheme } from "native-base";
import Toast from "react-native-toast-message";
import COLORS from "./src/constants/styles/colors";
import LoginScreen from "./src/screens/Login/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useAuthStore } from "./src/stores/auth.store";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MenuDrawerContent from "./src/navigation/MenuDrawerContent";
import { validateAuthToken } from "./src/services/auth.service";
import LoadingSpinner from "./src/components/LoadingSpinner/LoadingSpinner";
import createRoutes from "./src/navigation/createRoutes";
import AppBar from "./src/navigation/AppBar";

const newColorTheme = {
  primary: {
    ...COLORS.primary,
  },
};
const theme = extendTheme({
  colors: newColorTheme,
});

export const Drawer = createDrawerNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);
  const { token, user, setUserData } = useAuthStore();

  useEffect(() => {
    validateToken();
  }, [token]);

  const validateToken = async () => {
    setLoading(true);
    try {
      const {
        result: { user, token },
      } = await validateAuthToken();
      setUserData(user, user.menus, token);
    } catch (e) {
      // handleError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NativeBaseProvider theme={theme}>
      {loading ? (
        <LoadingSpinner />
      ) : user ? (
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              header: (props) => <AppBar {...props} />,
            }}
            drawerContent={(props) => <MenuDrawerContent {...props} />}
          >
            {createRoutes(user.menus)}
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <LoginScreen />
      )}
      <Toast />
    </NativeBaseProvider>
  );
}
