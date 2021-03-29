import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";

import { Column } from "app/shared/components/column";
import { Row } from "app/shared/components/row";
import { Text } from "app/shared/components/text";

import { SVGDeleteOutline } from "app/shared/assets/icons/delete-outline";

export interface OrderCardProps {
  identifier: string;
  delivery: string;
  status: string;
  onDelete?(): void;
}

export function OrderCard({
  identifier,
  delivery,
  status,
  onDelete,
}: OrderCardProps) {
  return (
    <Column m="16px" bg="white" borderRadius={6} style={{ elevation: 2 }}>
      <Row p="16px" justifyContent="space-between">
        <Column>
          {identifier && (
            <>
              <Text
                fontSize="10px"
                letterSpacing="1.5px"
                opacity={0.85}
                mb="4px"
              >
                IDENTIFIER
              </Text>
              <Text fontSize="16px" letterSpacing="0.6px" mb="16px">
                {identifier}
              </Text>
            </>
          )}

          {delivery && (
            <>
              <Text
                fontSize="10px"
                letterSpacing="1.5px"
                opacity={0.85}
                mb="4px"
              >
                DELIVERY
              </Text>
              <Text fontSize="16px" letterSpacing="0.6px" mb="16px">
                {delivery}
              </Text>
            </>
          )}

          {status && (
            <>
              <Text
                fontSize="10px"
                letterSpacing="1.5px"
                opacity={0.85}
                mb="4px"
              >
                STATUS
              </Text>
              <Text fontSize="16px" letterSpacing="0.6px">
                {status}
              </Text>
            </>
          )}
        </Column>

        <Column>
          <BorderlessButton onPress={onDelete}>
            <SVGDeleteOutline />
          </BorderlessButton>
        </Column>
      </Row>
    </Column>
  );
}
