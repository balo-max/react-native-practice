import {Text, TextInput, TouchableOpacity, View, ViewStyle} from 'react-native';
import styles from '../../../screen/Auth/styles';
import React, {useState} from 'react';
import { HidePassIcon, ViewPassIcon } from '../../../assets/icons';

interface IInput {
  onBlur?: () => void;
  value: string;
  onChangeText: (text: string) => void;
  placeholderColor?: string;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  additionalContainerStyle?: ViewStyle;
  additionInputStyle?: ViewStyle;
  onFocus?: () => void;
}
export default function Input({

                                placeholder,
                                value,
                                onChangeText,
                                placeholderColor = '#838383',
                                error,
                                secureTextEntry = false,
                                additionalContainerStyle,
                                additionInputStyle,
                                onFocus,
                              }: IInput) {
  const [isPassHidden, setIsPassHidden] = useState(false);

  return (
    <>
      <View style={[styles.inputContainer, additionalContainerStyle]}>
        <TextInput
          placeholder={placeholder}
          style={[styles.input, additionInputStyle]}
          placeholderTextColor={placeholderColor}
          onFocus={onFocus}
          value={value}
          onChangeText={text => onChangeText(text)}
          secureTextEntry={!isPassHidden}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              setIsPassHidden(!isPassHidden);
            }}
            hitSlop={{top: 15, bottom: 15, right: 15, left: 15}}>
            {!isPassHidden ? (
              <ViewPassIcon fill={'#000000'} />
            ) : (
              <HidePassIcon fill={'#a36161'} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text>{error}</Text>}
    </>
  );
}