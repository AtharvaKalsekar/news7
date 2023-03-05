import { ResendOTPButton } from '@modules';
import { Button, Center, HStack, Input } from 'native-base';
import { useCallback, useRef, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';

export const VerifyOtp = () => {
  const [value, setValue] = useState<string[]>(Array.from({ length: 6 }));
  const ref = useRef<any>(Array.from({ length: 6 }));

  const onChange = useCallback((inputIndex: number, val: string) => {
    if (isNaN(Number(val))) {
      return;
    }
    setValue((values) => {
      const newValues = [...values];
      newValues[inputIndex] = val.charAt(val.length - 1);
      return newValues;
    });
    if (val && inputIndex < 5) {
      ref.current[inputIndex + 1].focus?.();
    }
    if (!val && inputIndex > 0) {
      ref.current[inputIndex - 1].focus?.();
    }
  }, []);

  const isInputValid = value.every((elem) => !!elem);

  const buttonStyles = isInputValid ? {} : { opacity: 0.5 };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Center style={styles.innerContainer}>
        <HStack space={3} maxW="80%">
          {Array.from({ length: 6 }).map((elem, index) => {
            return (
              <Input
                type="text"
                size={"2xl"}
                variant="unstyled"
                key={index}
                style={styles.inputBox}
                width="10"
                keyboardType="numeric"
                value={value[index]}
                colorScheme={"orange"}
                ref={(e) => (ref.current[index] = e)}
                onChangeText={(val: string) => {
                  onChange(index, val);
                }}
                selection={{
                  start: value[index]?.length,
                  end: value[index]?.length,
                }}
              />
            );
          })}
        </HStack>
        <ResendOTPButton onPress={() => {}} />
      </Center>
      <Button
        w="70%"
        my="10"
        colorScheme={"orange"}
        disabled={!isInputValid}
        style={buttonStyles}
        alignSelf="center"
      >
        Verify OTP
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  inputBox: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "900",
    textAlignVertical: "center",
    borderBottomWidth: 2,
  },
});
