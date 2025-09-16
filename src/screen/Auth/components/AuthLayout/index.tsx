import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from '../../styles.ts';
import { ReactNode } from 'react';

interface MyComponentProps {
  children?: ReactNode;
}

export default function AuthLayout({ children }: MyComponentProps) {
  return (
    <KeyboardAvoidingView
      style={[styles.container]}
      // keyboardVerticalOffset={Platform.select({ android: 20, ios: 90 })}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.mainWrapper]}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
