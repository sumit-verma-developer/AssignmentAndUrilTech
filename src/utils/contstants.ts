import { Dimensions } from "react-native";

export const screenHeight = Dimensions.get('screen').height
export const screenWidth = Dimensions.get('screen').width


export enum FONTS {
  medium_Font = "CormorantGaramond-Medium",
  Regular_Font = "CormorantGaramond-Regular",
  Bold_Font="Tinos-Bold"
}

export enum Colors 
{
  primary = '#FFC201',
  active = '#1054E8',
  inactive = '#666',
  lightText = "#222",
  background = '#fff',
  text = '#222',
}