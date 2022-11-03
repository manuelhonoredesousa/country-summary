import React from "react";
import { Text as MyText, ITextProps } from "native-base";

type Txtprops = ITextProps & {
  type: "text" | "title";
  text: string;
};

export function Text({ type, text, ...rest }: Txtprops) {
  return <MyText fontFamily="body" bold={type == "title" ? true : false} fontSize="md" color={type == "title" ? "white" : "gray.100"} {...rest} >{text}</MyText>
}
