import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import Reanimated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { useDatabase } from "app/shared/contexts/database";

import { ScreenWrapper } from "app/shared/components/screen-wrapper";
import { Text, TextVariants } from "app/shared/components/text";
import { Column } from "app/shared/components/column";
import { Button } from "app/shared/components/button";

import { OrderCard } from "app/orders/components/order-card";

import { Order } from "app/shared/models/order";

const MINIMUM_Y_OFFSET = 15;

export function OrdersScreen() {
  const shouldLiftOffToolbar = useSharedValue(false);
  const toolbarElevation = useDerivedValue(() =>
    shouldLiftOffToolbar.value ? withTiming(8) : withTiming(0)
  );

  const { background } = useTheme();
  const { instance } = useDatabase();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [orders, setOrders] = useState<Order[]>([]);

  const hasOrders = orders.length > 0;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      if (y >= MINIMUM_Y_OFFSET && !shouldLiftOffToolbar.value) {
        shouldLiftOffToolbar.value = true;
      } else if (y < MINIMUM_Y_OFFSET && shouldLiftOffToolbar.value) {
        shouldLiftOffToolbar.value = false;
      }
    },
  });

  const toolbarAnimatedStyle = useAnimatedStyle(() => ({
    flexDirection: "row",
    padding: 16,
    backgroundColor: background,
    elevation: toolbarElevation.value,
  }));

  function onDeleteOrder(order: Order) {
    instance?.transaction((transtaction) => {
      transtaction.executeSql(
        `
        DELETE FROM ORDERS WHERE id = ?
      `,
        [order.id]
      );
    });
    setOrders(orders.filter((it) => it.id !== order.id));
  }

  useEffect(() => {
    if (!isFocused) return () => {};
    async function getOrdersFromDatabase() {
      instance?.transaction((transaction) => {
        transaction.executeSql(`SELECT * FROM ORDERS`, [], (_, results) => {
          setOrders(results.rows.raw());
        });
      });
    }
    getOrdersFromDatabase();
  }, [isFocused]);

  return (
    <ScreenWrapper>
      <StatusBar backgroundColor={background} barStyle="dark-content" />

      <Reanimated.View style={toolbarAnimatedStyle}>
        <Text
          variant={TextVariants.MEDIUM}
          fontSize="20px"
          letterSpacing="0.5px"
          numberOfLines={1}
        >
          Orders
        </Text>
      </Reanimated.View>

      {!hasOrders ? (
        <Column flex={1} alignItems="center" justifyContent="center">
          <Text
            fontSize="14px"
            letterSpacing="0.25px"
            opacity={0.6}
          >{`You doesn't have orders`}</Text>
        </Column>
      ) : (
        <Reanimated.ScrollView
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
        >
          {orders.map((it) => (
            <OrderCard
              key={it.id?.toString()}
              onDelete={() => onDeleteOrder(it)}
              {...it}
            />
          ))}
        </Reanimated.ScrollView>
      )}

      <Column p="16px">
        <Button
          text="Register new order"
          onPress={() => navigation.navigate("RegisterOrder")}
        />
      </Column>
    </ScreenWrapper>
  );
}
