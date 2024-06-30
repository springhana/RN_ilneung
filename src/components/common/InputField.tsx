import React, {forwardRef, ForwardedRef, useRef} from 'react';
import {
  Pressable,
  TextInput,
  Text,
  TextInputProps,
  Dimensions,
} from 'react-native';
import {StyleSheet, View} from 'react-native';
import mergeRefs from '../../utils/mergeRefs';
import {colors} from '../../constants/colors';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  color?: 'ligth' | 'dark';
}

const deviceHeight = Dimensions.get('window').height;

const InputField = forwardRef(
  (
    {
      disabled = false,
      error,
      touched,
      color = 'dark',
      ...props
    }: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View style={styles.container}>
          <View>
            <TextInput
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              editable={!disabled}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              style={[
                styles.input,
                color === 'dark' ? styles.inputDark : styles.inputLight,
                disabled && styles.disabled,
              ]}
              placeholderTextColor={
                color === 'dark'
                  ? colors['light'].WHITE
                  : colors['light'].GRAY_300
              }
              {...props}
            />
          </View>
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: deviceHeight > 700 ? 10 : 5,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
  },
  inputDark: {
    backgroundColor: colors['light'].GRAY_200,
    color: colors['light'].GRAY_300,
  },
  inputLight: {
    backgroundColor: colors['light'].GRAY_200,
    color: colors['light'].GRAY_300,
  },
  disabled: {},
  error: {
    fontSize: 12,
    paddingTop: 5,
  },
});

export default InputField;
