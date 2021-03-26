import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { Column } from "app/shared/components/column";
import { Row } from "app/shared/components/row";
import { Text, TextVariants } from "app/shared/components/text";

export interface ButtonProps {
  text: string;
  onPress?(): void;
}

export function Button({ text, onPress }: ButtonProps) {
  const { primary } = useTheme();

  return (
    <Column>
      <Row bg={primary} borderRadius={4}>
        <BorderlessButton onPress={onPress} style={{ flex: 1 }}>
          <Text
            variant={TextVariants.MEDIUM}
            px="16px"
            py="14px"
            fontSize="14px"
            letterSpacing="1.25px"
            color="white"
            textAlign="center"
          >
            {text.toUpperCase()}
          </Text>
        </BorderlessButton>
      </Row>
    </Column>
  );
}
