import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useNetInfo } from "@react-native-community/netinfo";
import { useTheme } from "styled-components";

import { useDatabase } from "app/shared/contexts/database";

import { Column } from "app/shared/components/column";
import { Row } from "app/shared/components/row";
import { Text, TextVariants } from "app/shared/components/text";

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
  const { isInternetReachable } = useNetInfo();

  const [
    isSynchronizingOrderDetails,
    setIsSynchronizingOrderDetails,
  ] = useState<boolean>(false);
  const [
    hasFailedDuringSynchronization,
    setHasFailedDuringSynchronization,
  ] = useState<boolean>(false);
  const [internalState, setInternalState] = useState<Order>({
    hash,
    identifier,
    entrega,
    status,
  });

  async function synchronize() {
    setIsSynchronizingOrderDetails(true);
    setHasFailedDuringSynchronization(false);
    try {
      const { data } = await getOrderDetails({ hash, identifier });
      instance?.transaction((transaction) =>
        transaction.executeSql(
          `
            UPDATE ORDERS
            SET entrega = ?,
                status = ?
            WHERE 
              identifier = ?
        `,
          [data.entrega, data.status, identifier]
        )
      );
      setInternalState({
        hash,
        identifier,
        entrega: data.entrega,
        status: data.status,
      });
    } catch (error) {
      setIsSynchronizingOrderDetails(false);
      setHasFailedDuringSynchronization(true);
    } finally {
      setIsSynchronizingOrderDetails(false);
    }
  }

  useEffect(() => {
    if (!isInternetReachable) return () => {};
    synchronize();
  }, [isInternetReachable]);

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

      {isSynchronizingOrderDetails && (
        <Column px="16px" pb="16px">
          <Text
            fontSize="10px"
            letterSpacing="1.5px"
            opacity={0.65}
            color={primary}
          >
            Synchronizing...
          </Text>
        </Column>
      )}

      {hasFailedDuringSynchronization && (
        <Row
          px="16px"
          pb="16px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text
            fontSize="10px"
            letterSpacing="1.5px"
            color="red"
            opacity={0.65}
          >
            Synchronization failed
          </Text>

          <TouchableOpacity onPress={synchronize}>
            <Text
              variant={TextVariants.MEDIUM}
              fontSize="10px"
              letterSpacing="1.25px"
              color="black"
            >
              TRY AGAIN
            </Text>
          </TouchableOpacity>
        </Row>
      )}
    </Column>
  );
}
