import { Drawer } from "../../App";
import { IUserMenuItem } from "../models/auth.interface";
import { Text } from "native-base";

const createRoutes = (menus: Array<IUserMenuItem>) => {
  return menus.map((menuItem) => (
    <Drawer.Screen
      key={menuItem.id}
      name={menuItem.title}
      component={() =>
        menuItem.children.length ? (
          <Drawer.Navigator>{createRoutes(menuItem.children)}</Drawer.Navigator>
        ) : (
          <Text>{menuItem.title}</Text>
        )
      }
    />
  ));
};

export default createRoutes;
