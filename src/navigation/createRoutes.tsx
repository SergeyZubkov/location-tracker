import { IUserMenuItem } from "../models/auth.interface";
import { Text } from "native-base";
import { Drawer } from "../../AppWithAuthenticatedUser";

const createRoutes = (menus: Array<IUserMenuItem>) => {
  return menus.map((menuItem) => (
    <Drawer.Screen
      key={menuItem.id}
      name={menuItem.title}
      component={() => <Text>{menuItem.title}</Text>}
    />
  ));
};

export default createRoutes;
