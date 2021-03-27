import React from "react";
import { TextInputProps } from "react-native";
import styled, { useTheme } from "styled-components/native";

import { Column } from "app/shared/components/column";
import { Row } from "app/shared/components/row";
import { Text, TextVariants } from "app/shared/components/text";

import { SVGInformationOutline } from "app/shared/assets/icons/information-outline";

export interface TextFieldProps extends TextInputProps {
  errorMessage?: string;
}

export function TextField({ errorMessage, ...props }: TextFieldProps) {
  const { error } = useTheme();

  return (
    <Column p="6px">
      <TextFieldBase placeholderTextColor="rgba(0, 0, 0, 0.6)" {...props} />

      {errorMessage && (
        <Row alignItems="center" mt="4px">
          <SVGInformationOutline />
          <Text
            variant={TextVariants.MEDIUM}
            fontSize="10px"
            letterSpacing="1.5px"
            ml="8px"
            color={error}
          >
            {errorMessage.toUpperCase()}
          </Text>
        </Row>
      )}
    </Column>
  );
}

export const TextFieldBase = styled.TextInput`
  align-items: center;
  padding: 12px;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 6px;
  font-size: 16px;
  letter-spacing: 0.6px;
  color: #000;
  font-family: Roboto-Medium;
`;
