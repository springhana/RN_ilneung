import React from 'react';
import {Text} from 'react-native';

import {CompoundOption} from '../common/CompoundOption';

interface AppInfoOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function AppInfoOption({isVisible, hideOption}: AppInfoOptionProps) {
  const handlePressLanguage = () => {
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            이 앱은 일본어 JLPT 단어장입니다.
          </CompoundOption.Button>
        </CompoundOption.Container>

        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

export default AppInfoOption;
