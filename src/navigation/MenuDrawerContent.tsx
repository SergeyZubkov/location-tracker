import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { DrawerContentComponentProps } from "@react-navigation/drawer/lib/typescript/src/types";
import { Avatar, Center, Text, VStack } from "native-base";
import { useAuthStore } from "../stores/auth.store";
import { capitalizeFirstLetter } from "../utils/string.utils";
import { getImageFromBytes } from "../utils/common.utils";

const MenuDrawerContent = (props: DrawerContentComponentProps) => {
  const { user, resetUser } = useAuthStore();
  const avatarSource = user?.profileImage
    ? {
        uri: getImageFromBytes(user?.profileImage),
      }
    : undefined;

  return (
    <DrawerContentScrollView {...props}>
      <Center bg="muted.100" h={136} mt={-4} pt={2}>
        <VStack alignItems="center">
          <Avatar size="lg" bg="muted.400" source={avatarSource}>
            {capitalizeFirstLetter(user?.firstName)?.[0]}
          </Avatar>
          <Text pt={2} fontSize={16} fontWeight={500}>
            {user?.lastName + " " + user?.firstName}
          </Text>
        </VStack>
      </Center>
      <DrawerItemList {...props} />
      <DrawerItem label="Выйти" onPress={() => resetUser()} />
    </DrawerContentScrollView>
  );
};

export default MenuDrawerContent;
