import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import { DatabaseProvider } from "app/shared/contexts/database";

import { theme } from "app/shared/themes/light";

export interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <DatabaseProvider>{children}</DatabaseProvider>
    </ThemeProvider>
  );
}
