import React from "react";
import { VStack, HStack, Image, Heading, Text, IPressableProps } from "native-base";
import { Pressable } from "react-native";

type props = IPressableProps & {
  name: string,
  flag: string,
  region: string,
  population: string,
}

export function CountryTumb({ name, flag, region, population, ...rest }:props) {
  return (
    <Pressable {...rest}>
      <HStack borderRadius={5} mb={5}  bg="gray.500" borderWidth={1} borderColor="primary.100" >
        <Image borderTopLeftRadius={5} borderBottomLeftRadius={5} mr={4} source={{ uri: flag }} w={["28%", "100%"]} h={["100%", "100%"]} alt="Flag Image" size="lg" />
        <VStack style={{ minHeight: 70 }} >
          <Text color="white" bold fontSize="md" mt={2} mb={3}>{name}</Text>
          <Text color="gray.100" w="full" style={{ textAlign: "justify" }}>Region: {region} | Population: {population}</Text> 
        </VStack>
      </HStack>
    </Pressable>
  );
}