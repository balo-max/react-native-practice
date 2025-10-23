import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabBarStackType } from '../../../../navigation/types';
import { ScreenNames } from '../../../../constants/screenNames.ts';
import { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { fonts } from '../../../../constants/fonts.ts';
import DefaultButton from '../../DefaultButton';

interface FallbackProps {
  error: Error | undefined;
  resetError: () => void;
}

export default function ErrorFallBack({ error, resetError }: FallbackProps) {
  const navigation = useNavigation<StackNavigationProp<TabBarStackType>>();

  const handleResetError = () => {
    resetError();
    navigation.navigate(ScreenNames.HOME_PAGE);
  };

  useEffect(() => {
    if (__DEV__) {
      if (error) {
        Alert.alert(error.stack ?? 'Неизвестная ошибка');
      }
    }
  }, [error]);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        flex: 1,
      }}
    >
      <View style={{ width: '100%', gap: 20 }}>
        <Text style={{ fontFamily: fonts.raleway, fontSize: 24 }}>
          Opsss. Something went wrong
        </Text>
        <Text style={{ fontFamily: fonts.raleway }}>
          Error message: {error?.message}
        </Text>
        <DefaultButton
          onPress={() => {
            handleResetError();
          }}
          text={'Go to home'}
        />
      </View>
    </View>
  );
}
