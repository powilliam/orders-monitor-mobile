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

export type RowProps = ViewProps &
  SpaceProps &
  ColorProps &
  LayoutProps &
  BorderProps &
  FlexboxProps &
  PositionProps;

export const Row = styled.View<RowProps>`
  ${space}
  ${color}
  ${layout}
  ${border}
  ${flexbox}    
  ${position}
  flex-direction: row;
`;
