import { Text } from '@components';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '@screens';
import { useRegisterMutation } from '@store';
import { Button, Center, FormControl, Input, Link, Stack, WarningOutlineIcon } from 'native-base';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { StackNavProps } from 'StackNavigation';

type RegisterationForm = {
  name: string;
  email: string;
  password: string;
};

export const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterationForm, any>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { navigate } = useNavigation<StackNavProps>();

  const [register, registerResult] = useRegisterMutation();

  const onSubmit = useCallback(async (data: RegisterationForm) => {
    await register({
      ...data,
    }).unwrap();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Center style={styles.innerContainer}>
        <FormControl isInvalid={!!errors.name} marginY={3}>
          <Stack mx="4">
            <FormControl.Label>
              <Text style={styles.inputLabel}>Username </Text>
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
                  placeholder="Enter user name"
                />
              )}
              name="name"
            />
            {errors.name?.type === "required" && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                User name is required
              </FormControl.ErrorMessage>
            )}
          </Stack>
        </FormControl>
        <FormControl isInvalid={!!errors.email} marginY={3}>
          <Stack mx="4">
            <FormControl.Label>
              <Text style={styles.inputLabel}>Email </Text>
            </FormControl.Label>
            <Controller
              control={control}
              rules={{
                required: true,
                // pattern: RegExp("/^w+([.-]?w+)*@w+([.-]?w+)*(.ww+)+$/"),
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
          style={styles.registerButton}
          onPress={handleSubmit(onSubmit)}
        >
          {"Register "}
        </Button>
        <Link style={styles.otherLink} onPress={() => navigate(Screens.LOGIN)}>
          <Text>Already registered?. Login here.</Text>
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
