import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { useDatabase } from "app/shared/contexts/database";

import { Column } from "app/shared/components/column";
import { Row } from "app/shared/components/row";
import { Text } from "app/shared/components/text";

import { SVGDeleteOutline } from "app/shared/assets/icons/delete-outline";

import { getOrderDetails } from "app/shared/services/orders-service";

import { Order } from "app/shared/models/order";

export interface OrderCardProps extends Order {
  onDelete?(): void;
}

export function OrderCard({
  hash,
  identifier,
  entrega,
  status,
  onDelete,
}: OrderCardProps) {
  const { primary } = useTheme();
  const { instance } = useDatabase();

  const [isFetchingOrderDetails, setIsFetchingOrderDetails] = useState<boolean>(
    true
  );
  const [internalState, setInternalState] = useState<Order>({
    hash,
    identifier,
    entrega,
    status,
  });

  useEffect(() => {
    if (!hash && !identifier) return () => {};
    setIsFetchingOrderDetails(true);
    getOrderDetails({ hash, identifier })
      .then(({ data }) => {
        setInternalState({
          hash,
          identifier,
          entrega: data.entrega,
          status: data.status,
        });
        return data;
      })
      .then((data) => {
        instance?.transaction((transaction) => {
          transaction.executeSql(
            `
            UPDATE ORDERS
            SET entrega = ?,
                status = ?
            WHERE 
                identifier = ?
          `,
            [data.entrega, data.status, identifier]
          );
        });
      })
      .finally(() => setIsFetchingOrderDetails(false));
  }, [hash, identifier]);

  return (
    <Column m="16px" bg="white" borderRadius={6} style={{ elevation: 2 }}>
      {isFetchingOrderDetails ? (
        <Column height="150px" justifyContent="center">
          <ActivityIndicator size="small" color={primary} />
        </Column>
      ) : (
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
                  {internalState.identifier}
                </Text>
              </>
            )}

            {internalState.entrega && (
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
                  {internalState.entrega}
                </Text>
              </>
            )}

            {internalState.status && (
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
                  {internalState.status}
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
      )}
    </Column>
  );
}
