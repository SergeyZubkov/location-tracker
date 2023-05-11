import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  StatusBar,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerHeaderProps } from "@react-navigation/drawer/src/types";

function AppBar({ navigation }: DrawerHeaderProps) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop bg="violet.600" />
      <HStack
        bg="primary.500"
        px="0"
        py="1"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack alignItems="center" justifyContent="space-between" w="100%">
          <IconButton
            icon={
              <Icon size="lg" as={MaterialIcons} name="menu" color="white" />
            }
            onPress={() => navigation.openDrawer()}
          />
          <Center w="100%">
            <Image
              source={{
                uri: "",
              }}
              size="xs"
              fallbackElement={<Text color="white">ERP Mobile</Text>}
            />
          </Center>
        </HStack>
      </HStack>
    </>
  );
}

export default AppBar;
