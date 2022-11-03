import React from 'react';
import { HStack, Spinner, Heading, Center } from 'native-base';
import LottieView from "lottie-react-native";

export function LoadingContent({sms, spin}) {
  return (
    <Center flexDir="column-reverse"  w="3/4" h="3/4" justifyContent="flex-start">
        <LottieView style={{ marginBottom: 50 }} autoPlay loop={true} source={require("../assets/launch.json")} />
        <HStack space="2">
            {spin?(<Spinner color="primary.700"/>):("")}
            <Heading color="primary.700" fontSize="md">{sms}</Heading>
        </HStack>
    </Center>
  );
}