import React, {Fragment} from 'react';
import {Dimensions} from 'react-native';

import {CompoundOption} from '../common/CompoundOption';
import {ScrollView} from 'react-native-gesture-handler';
import useLanguageStorage from '@/hooks/storage/useLanguageStorage';

interface LangauageOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

const deviceHeight = Dimensions.get('window').height;

const data = ['EN', 'KO', 'JA'];

function LangauageOption({isVisible, hideOption}: LangauageOptionProps) {
  const {language, setMode} = useLanguageStorage();

  const handlePressLanguage = (language: string) => {
    setMode(language);
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{maxHeight: deviceHeight * 0.9}}>
            {data.map((item, index) => (
              <Fragment key={index}>
                <CompoundOption.Button
                  onPress={() => handlePressLanguage(item)}
                  isChecked={language === item}>
                  {item}
                </CompoundOption.Button>
              </Fragment>
            ))}
          </ScrollView>
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

export default LangauageOption;
