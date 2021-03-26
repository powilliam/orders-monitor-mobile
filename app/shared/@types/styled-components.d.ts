import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    onPrimary?: string;
    secondary?: string;
    onSecondary?: string;
    background?: string;
  }
}
