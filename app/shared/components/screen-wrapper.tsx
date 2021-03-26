import { ViewProps } from "react-native";
import styled from "styled-components/native";
import {
  space,
  color,
  layout,
  flexbox,
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexboxProps,
} from "styled-system";

export type ScreenWrapperProps = ViewProps &
  SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps;

export const ScreenWrapper = styled.SafeAreaView<ScreenWrapperProps>`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
