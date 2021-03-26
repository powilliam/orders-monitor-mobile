import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppProvider } from "app/shared/contexts/app";

import { OrdersModule } from "app/orders/orders-module";

export function AppModule() {
  return (
    <AppProvider>
      <NavigationContainer>
        <OrdersModule />
      </NavigationContainer>
    </AppProvider>
  );
}
