import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { getAuthToken } from "../../services/auth.service";
import { useAuthStore } from "../../stores/auth.store";
import { setAuthTokenToStore } from "../../utils/request.utils";
import { handleError } from "../../utils/error.utils";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string; userName: string }>();
  const { setToken } = useAuthStore();

  const onSubmit = async ({
    password,
    userName,
  }: {
    password: string;
    userName: string;
  }) => {
    setLoading(true);
    try {
      const { result } = await getAuthToken({ password, userName });
      await setAuthTokenToStore({
        expired: result.expiration,
        token: result.token,
      });
      setToken(result.token);
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center w="100%" h="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Авторизация
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={!!errors["userName"]}>
            <FormControl.Label>Логин</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input onChangeText={onChange} onBlur={onBlur} value={value} />
              )}
              name="userName"
              rules={{ required: "is required" }}
              defaultValue=""
            />
            <FormControl.ErrorMessage>Заполните поле</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors["password"]}>
            <FormControl.Label>Пароль</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  type="password"
                />
              )}
              name="password"
              rules={{ required: "is required" }}
              defaultValue=""
            />
            <FormControl.ErrorMessage>Заполните поле</FormControl.ErrorMessage>
            {/*<Link*/}
            {/*  _text={{*/}
            {/*    color: "indigo.500",*/}
            {/*    fontSize: "xs",*/}
            {/*    fontWeight: "500",*/}
            {/*  }}*/}
            {/*  alignSelf="flex-end"*/}
            {/*  mt="1"*/}
            {/*>*/}
            {/*  Forget Password?*/}
            {/*</Link>*/}
          </FormControl>
          <Button
            mt="2"
            colorScheme="primary"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          >
            Войти
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginScreen;
