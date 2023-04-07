// import { Alert } from '@components';
import { useAlertToast } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { setAuthState, useLoginMutation } from "@store";
import {
  Button,
  Center,
  FormControl,
  Input,
  Link,
  Stack,
  WarningOutlineIcon,
} from "native-base";
import React, { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { StackNavProps } from "StackNavigation";

import { Screens } from "../../utils/constants";

type LoginForm = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm, any>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { navigate } = useNavigation<StackNavProps>();
  const [login, { isError, error, isSuccess, data: loggedinUserData }] =
    useLoginMutation();
  const { showErrorToast, showSuccessToast } = useAlertToast();
  const dispath = useDispatch();

  useEffect(() => {
    if (isError) {
      //@ts-ignore
      showErrorToast(error.data.message);
    }
    if (isSuccess) {
      showSuccessToast("Login Success");
      //set auth state data
      loggedinUserData && dispath(setAuthState(loggedinUserData));
    }
  }, [isError, isSuccess]);

  const onSubmit = useCallback(async (data: LoginForm) => {
    await login({
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
        <FormControl isInvalid={!!errors.password} marginY={3}>
          <Stack mx="4">
            <FormControl.Label>
              <Text style={styles.inputLabel}>Password</Text>
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
                  placeholder="Enter password"
                  type="password"
                />
              )}
              name="password"
            />
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
          style={styles.registerButton}
          onPress={handleSubmit(onSubmit)}
        >
          {"Login "}
        </Button>
        <Link
          style={styles.otherLink}
          onPress={() => navigate(Screens.REGISTER)}
        >
          <Text>Not registered?. Sign-up here.</Text>
        </Link>
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
  registerButton: {
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
  },
  otherLink: {
    marginTop: 10,
  },
});
