import { HStack, Spinner } from "native-base";

const LoadingSpinner = () => {
  return (
    <HStack space={2} justifyContent="center" h={"100%"}>
      <Spinner size="lg" accessibilityLabel="Loading" />
    </HStack>
  );
};

export default LoadingSpinner;
