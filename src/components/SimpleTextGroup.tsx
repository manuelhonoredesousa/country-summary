import React from "react";
import { HStack } from "native-base";
import { Text } from "./Text";

type myPros = {
    title: string,
    answer: string
}

export function SimpleTextGroup({title, answer}:myPros) {
  return (
    <HStack flexWrap="wrap">
      <Text type="title" text={title} />
      <Text type="text" text={answer} />
    </HStack>
  );
}
