import { Text } from '@components';
import { useAlertToast } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { useCheckEmailExistsMutation } from '@store';
import { Button, Center, FormControl, Input, KeyboardAvoidingView, Stack, WarningOutlineIcon } from 'native-base';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { StackNavProps } from '../../../StackNavigation';
import { Screens } from '../../../utils/constants';

type CheckEmailExistsForm = {
  email: string;
};

export const CheckEmailExists = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckEmailExistsForm, any>({
    defaultValues: {
      email: "",
    },
  });

  const { showErrorToast, showSuccessToast } = useAlertToast();

  const [checkEmailExists, { isError, error, isSuccess, isLoading }] =
    useCheckEmailExistsMutation();

  const { navigate } = useNavigation<StackNavProps>();

  useEffect(() => {
    if (isSuccess) {
      showSuccessToast("User exists");
      navigate(Screens.VERIFY_OTP);
    } else if (isError) {
      //@ts-ignore
      showErrorToast(error.data.message);
    }
  }, [isSuccess, isError]);

  const onSubmit = useCallback(async (data: CheckEmailExistsForm) => {
    await checkEmailExists({
      ...data,
    }).unwrap();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Center style={styles.innerContainer}>
        <FormControl isInvalid={!!errors.email} marginY={3}>
          <Stack mx="4">
            <FormControl.Label>
              <Text style={styles.inputLabel}>Email </Text>
            </FormControl.Label>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                />
              )}
              name="email"
            />
            {errors.email?.type === "pattern" && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Invalid email address
              </FormControl.ErrorMessage>
            )}
            {errors.email?.type === "required" && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Email address required
              </FormControl.ErrorMessage>
            )}
          </Stack>
        </FormControl>
        <Button
          colorScheme={"orange"}
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          isLoadingText={"Submitting"}
        >
          {"Submit "}
        </Button>
      </Center>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputLabel: {
    fontWeight: "700",
    color: "black",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  submitButton: {
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
  },
});
