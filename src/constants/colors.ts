const common = {
  RED_500: '#FF5F5F',
  BLUE_500: '#0D8AFF',
  GRAY_200: '#E3E3E3',
  GRAY_300: '#8E8E8E',
  SKYBLUE_200: '#00F5FF',
  SKYBLUE_700: '#00CCCC',
  RED_300: '#FF7256',
  PURPLE_200: '#E6A8E6',
  YELLOW_300: '#FFD700',
  GREEN_200: '#B0FFB0',
  PINK_200: '#FFB6C1',
};

const colors = {
  light: {
    WHITE: '#FFF',
    BLUE_200: '#F0F3F9',
    BLUE_300: '#E6E6FA',
    GRAY_100: '#F8F8F8',
    PINK_300: '#F08080',
    BLACK: '#161616',
    ...common,
  },
  dark: {
    WHITE: '#161616',
    BLUE_200: '#0F0C06',
    BLUE_300: '#E6E6FA',
    GRAY_100: '#202124',
    PINK_300: '#2E2E2E',
    BLACK: '#FFF',
    ...common,
  },
} as const;

export {colors};
