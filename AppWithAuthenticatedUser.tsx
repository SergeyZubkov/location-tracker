import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MenuDrawerContent from "./src/navigation/MenuDrawerContent";
import createRoutes from "./src/navigation/createRoutes";
import { useAuthStore } from "./src/stores/auth.store";
import AppBar from "./src/navigation/AppBar";
import { useTranslation } from "react-i18next";
import { handleError } from "./src/utils/error.utils";
import LoadableContent from "./src/components/LoadableContent/LoadableContent";
import { getLocalization } from "./src/services/localization.service";
import { AvailableLanguage } from "./src/models/common.interface";
import { mapLanguage } from "./src/utils/common.utils";

export const Drawer = createDrawerNavigator();

const AppWithAuthenticatedUser = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    setUpTranslation();
  }, []);

  const setUpTranslation = async () => {
    try {
      setLoading(true);
      const res = await getLocalization(AvailableLanguage.ru);

      i18n.addResourceBundle(
        AvailableLanguage.ru,
        "translation",
        mapLanguage(res.result.value)
      );
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadableContent loading={loading}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            header: (props) => <AppBar {...props} />,
          }}
          drawerContent={(props) => <MenuDrawerContent {...props} />}
        >
          {createRoutes(user!.menus)}
        </Drawer.Navigator>
      </NavigationContainer>
    </LoadableContent>
  );
};

export default AppWithAuthenticatedUser;
