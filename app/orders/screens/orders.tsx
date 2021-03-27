import React, { useState } from "react";
import { StatusBar } from "react-native";
import Reanimated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { ScreenWrapper } from "app/shared/components/screen-wrapper";
import { Text, TextVariants } from "app/shared/components/text";
import { Column } from "app/shared/components/column";
import { Button } from "app/shared/components/button";

import { OrderCard, OrderCardProps } from "app/orders/components/order-card";

const MINIMUM_Y_OFFSET = 15;

export function OrdersScreen() {
  const shouldLiftOffToolbar = useSharedValue(false);
  const toolbarElevation = useDerivedValue(() =>
    shouldLiftOffToolbar.value ? withTiming(8) : withTiming(0)
  );

  const { background } = useTheme();
  const navigation = useNavigation();

  const [orders, setOrders] = useState<OrderCardProps[]>([
    { identifier: "123321", delivery: "01/04/21", status: "PENDENTE" },
    { identifier: "123322", delivery: "01/04/21", status: "PENDENTE" },
    { identifier: "123323", delivery: "01/04/21", status: "PENDENTE" },
    { identifier: "123324", delivery: "01/04/21", status: "PENDENTE" },
    { identifier: "123325", delivery: "01/04/21", status: "PENDENTE" },
  ]);

  const hasOrders = orders.length > 0;

  function onDeleteOrder(identifier: string) {
    setOrders(() => orders.filter((it) => it.identifier !== identifier));
  }

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
              key={it.identifier}
              onDelete={() => onDeleteOrder(it.identifier)}
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
