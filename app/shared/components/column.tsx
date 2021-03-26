import { ViewProps } from "react-native";
import styled from "styled-components/native";
import {
  space,
  color,
  layout,
  border,
  flexbox,
  position,
  SpaceProps,
  ColorProps,
  LayoutProps,
  BorderProps,
  FlexboxProps,
  PositionProps,
} from "styled-system";

export type ColumProps = ViewProps &
  SpaceProps &
  ColorProps &
  LayoutProps &
  BorderProps &
  FlexboxProps &
  PositionProps;

export const Column = styled.View<ColumProps>`
  ${space}
  ${color}
  ${layout}
  ${border}
  ${flexbox}    
  ${position}
  flex-direction: column;
`;
