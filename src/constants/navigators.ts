const mainNavigations = {
  HOME: 'Home',
  BASICS: 'Basics',
  QUIZ: 'Quiz',
  CALENDAR: 'Calendar',
  SETTING: 'Setting',
} as const;

const wordNavigations = {
  WORD_HOME: 'WordHome',
  WORD_STEP: 'WordStep',
  STEP_LIST: 'StepList',
  WORD_FAVORITES: 'WordFavorites',
} as const;

const basicsNavigations = {
  BASICS_HOME: 'BasicsHome',
  BASICS_WORD: 'BasicsWord',
} as const;

const quizNavigations = {
  QUIZ_HOME: 'QuizHome',
  QUIZ_STEP: 'QuizStep',
  QUIZ_DETAIL: 'QuizDetail',
} as const;

const settingNavigations = {
  SETTING_HOME: 'SettingHome',
  SETTING_USER: 'SettingUser',
} as const;

export {
  mainNavigations,
  wordNavigations,
  basicsNavigations,
  quizNavigations,
  settingNavigations,
};
