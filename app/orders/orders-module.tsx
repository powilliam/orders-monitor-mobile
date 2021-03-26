import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { OrdersScreen } from "app/orders/screens/orders";

const { Navigator, Screen } = createStackNavigator();

export function OrdersModule() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Orders" component={OrdersScreen} />
    </Navigator>
  );
}
