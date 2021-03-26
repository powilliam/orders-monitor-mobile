import React from "react";
import { StatusBar } from "react-native";

import { AppProvider } from "app/shared/contexts/app";

import { ScreenWrapper } from "app/shared/components/screen-wrapper";
import { Text } from "app/shared/components/text";

import { theme } from "app/shared/themes/light";

export function AppModule() {
  return (
    <AppProvider>
      <ScreenWrapper alignItems="center" justifyContent="center" p="16px">
        <StatusBar backgroundColor={theme.primary} barStyle="light-content" />

        <Text fontSize="16px" letterSpacing="0.4px">
          app-module
        </Text>
      </ScreenWrapper>
    </AppProvider>
  );
}
