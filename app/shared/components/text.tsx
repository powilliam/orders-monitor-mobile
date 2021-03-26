import { TextProps as RNTextProps } from "react-native";
import styled from "styled-components/native";
import {
  typography,
  color,
  variant,
  layout,
  TypographyProps,
  ColorProps,
  LayoutProps,
} from "styled-system";

interface VariantProps {
  variant?: string;
}

export enum TextVariants {
  THIN = "thin",
  LIGHT = "light",
  REGULAR = "regular",
  MEDIUM = "medium",
  BOLD = "bold",
}

export type TextProps = RNTextProps &
  TypographyProps &
  ColorProps &
  LayoutProps &
  VariantProps;

export const Text = styled.Text<TextProps>`
  ${typography}
  ${color}
  ${layout}
  ${variant({
    variants: {
      [TextVariants.THIN]: {
        fontFamily: "Roboto-Thin",
      },
      [TextVariants.LIGHT]: {
        fontFamily: "Roboto-Light",
      },
      [TextVariants.REGULAR]: {
        fontFamily: "Roboto-Regular",
      },
      [TextVariants.MEDIUM]: {
        fontFamily: "Roboto-Medium",
      },
      [TextVariants.BOLD]: {
        fontFamily: "Roboto-Bold",
      },
    },
  })}
`;

Text.defaultProps = {
  variant: TextVariants.REGULAR,
};
