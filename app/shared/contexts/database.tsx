import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ActivityIndicator } from "react-native";
import SQLite, { SQLiteDatabase } from "react-native-sqlite-storage";
import { useTheme } from "styled-components";

import { Column } from "app/shared/components/column";

SQLite.enablePromise(true);

export const DATABASE_NAME = "orders-monitor-database.db";

export interface DatabaseContext {
  instance?: SQLiteDatabase;
}

export interface DatabaseProviderProps {
  children?: ReactNode;
}

export const DatabaseContextImpl = createContext<DatabaseContext>(
  {} as DatabaseContext
);

export function useDatabase() {
  return useContext(DatabaseContextImpl);
}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const { primary, background } = useTheme();

  const [isLoadingInstance, setIsLoadingInstance] = useState<boolean>(true);
  const [instance, setInstance] = useState<SQLiteDatabase>();

  useEffect(() => {
    if (instance) return () => {};
    setIsLoadingInstance(true);
    SQLite.openDatabase({ name: DATABASE_NAME, location: "default" })
      .then((instance) => {
        setInstance(instance);
        return instance;
      })
      .then((instance) => {
        instance.transaction((transaction) => {
          transaction.executeSql(
            `
            CREATE TABLE IF NOT EXISTS ORDERS (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              hash TEXT NOT NULL,
              identifier TEXT NOT NULL,
              entrega TEXT,
              status TEXT
            )
          `
          );
        });
      })
      .finally(() => setIsLoadingInstance(false));
  }, []);

  if (isLoadingInstance) {
    return (
      <Column
        flex={1}
        alignItems="center"
        justifyContent="center"
        bg={background}
      >
        <ActivityIndicator size="small" color={primary} />
      </Column>
    );
  }

  return (
    <DatabaseContextImpl.Provider value={{ instance }}>
      {children}
    </DatabaseContextImpl.Provider>
  );
}
