import "react-native-gesture-handler";
import { NativeBaseProvider, extendTheme } from "native-base";
import Toast from "react-native-toast-message";
import COLORS from "./src/constants/styles/colors";
import LoginScreen from "./src/screens/Login/LoginScreen";
import { useEffect, useState } from "react";
import { useAuthStore } from "./src/stores/auth.store";
import { validateAuthToken } from "./src/services/auth.service";
import LoadingSpinner from "./src/components/LoadingSpinner/LoadingSpinner";
import AppWithAuthenticatedUser from "./AppWithAuthenticatedUser";
import "./src/i18n/i18n.config";
import { SafeAreaProvider } from "react-native-safe-area-context";

const newColorTheme = {
  primary: {
    ...COLORS.primary,
  },
};

const theme = extendTheme({
  colors: newColorTheme,
});

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
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        {loading ? (
          <LoadingSpinner />
        ) : user ? (
          <AppWithAuthenticatedUser />
        ) : (
          <LoginScreen />
        )}
        <Toast />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
