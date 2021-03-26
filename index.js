import { AppRegistry } from "react-native";
import { AppModule } from "./app/app-module";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => AppModule);
