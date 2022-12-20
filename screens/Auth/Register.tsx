import { HStack, Text } from '@components';
import { Button, Center, FormControl, InfoOutlineIcon, Input, Stack, WarningOutlineIcon } from 'native-base';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';

export const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    console.log("data", data);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Center style={styles.innerContainer}>
        <FormControl isInvalid={!!errors.email}>
          <Stack mx="4">
            <FormControl.Label>Email </FormControl.Label>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: RegExp("/^w+([.-]?w+)*@w+([.-]?w+)*(.ww+)+$/"),
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
        <FormControl isInvalid={!!errors.password}>
          <Stack mx="4">
            <FormControl.Label>Password</FormControl.Label>
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
                />
              )}
              name="password"
            />
            <FormControl.HelperText>
              <HStack style={{ alignItems: "center" }}>
                <InfoOutlineIcon size="sm" style={{ marginRight: 3 }} />
                <Text>Must be atleast 8 characters.</Text>
              </HStack>
            </FormControl.HelperText>
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
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Button colorScheme={"orange"} style={styles.registerButton}>
            {"Register "}
          </Button>
        </TouchableOpacity>
      </Center>
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
  registerButton: {
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
  },
});
