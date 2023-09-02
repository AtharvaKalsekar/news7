import { useAlertToast } from '@hooks';
import { FormLabel, ScreenContainer } from '@modules';
import { useNavigation } from '@react-navigation/native';
import { useCheckEmailExistsMutation } from '@store';
import { Button, FormControl, Input, KeyboardAvoidingView, Stack, WarningOutlineIcon } from 'native-base';
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
      <ScreenContainer>
        <FormControl isInvalid={!!errors.email} marginY={3}>
          <Stack mx="4">
            <FormLabel label="Email" />
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
                  focusOutlineColor={"orange.500"}
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
          isLoadingText={"Submitting "}
        >
          {"Submit "}
        </Button>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submitButton: {
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
  },
});
