export enum ThemeStyle {
  LIGHT = "LIGHT",
  DARKK = "DARK",
}
export interface colorType {
  PRIMARY_COLOR?: string;
  BORDER_COLOR?: string;
  DEAFULT_TEXT_COLOR?: string;
  WHITE_COLOR?: string;
  BLACK_COLOR?: string;
  GRAY_COLOR?: string;
}
export interface fontFamilyType {
  medium?: string;
  regular?: string;
  bold?: string;
  italic?: string;
}
export interface fontSizeType {
  default?: number;
}

export interface ITheme {
  background?: string;
  colors?: colorType;
  fontFamily?: fontFamilyType;
  fontSize?: fontSizeType;
}
type ThemeType = { [key in ThemeStyle]: ITheme };
export const Theme: ThemeType = {
  LIGHT: {
    fontFamily: {},
    colors: {
      PRIMARY_COLOR: "#71C671",
      BORDER_COLOR: "#CCC",
      DEAFULT_TEXT_COLOR: "#262626",
      WHITE_COLOR: "#FFF",
      BLACK_COLOR: "#000",
      GRAY_COLOR: "#8C8C8C",
    },
  },
  DARK: {},
};
