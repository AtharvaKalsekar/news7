import { Text } from "@components";
import { useAlertToast } from "@hooks";
import { AuthState, RootState, useSetNewPasswordMutation } from "@store";
import {
  Button,
  Center,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Stack,
  WarningOutlineIcon,
} from "native-base";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

type SetNewPasswordForm = {
  password: string;
};

export const SetNewPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SetNewPasswordForm, any>({
    defaultValues: {
      password: "",
    },
  });

  const { showErrorToast, showSuccessToast, clearAllToasts } = useAlertToast();

  const [setNewPassword, { isError, error, isSuccess }] =
    useSetNewPasswordMutation();

  useEffect(() => {
    clearAllToasts();
    if (isSuccess) {
      showSuccessToast("Password updated successfully!!");
    } else if (isError) {
      //@ts-ignore
      showErrorToast(error.data.message);
    }
  }, [isSuccess, isError]);

  const { token } = useSelector<RootState, AuthState>((state) => state.auth);

  const onSubmit = useCallback(async (data: SetNewPasswordForm) => {
    await setNewPassword({
      ...data,
      token,
    }).unwrap();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Center style={styles.innerContainer}>
        <FormControl isInvalid={!!errors.password} marginY={3}>
          <Stack mx="4">
            <FormControl.Label>
              <Text style={styles.inputLabel}>Set New Password</Text>
            </FormControl.Label>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter password"
                  type="password"
                />
              )}
              name="password"
            />
            {errors.password?.type === "minLength" && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Atleast 8 characters are required.
              </FormControl.ErrorMessage>
            )}
            {errors.password?.type === "required" && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Password required.
              </FormControl.ErrorMessage>
            )}
          </Stack>
        </FormControl>
        <Button
          colorScheme={"orange"}
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
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
