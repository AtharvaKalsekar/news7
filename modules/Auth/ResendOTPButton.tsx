import { useAlertToast } from '@hooks';
import { AuthState, RootState, useResendOtpMutation } from '@store';
import { Button } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Number(((millis % 60000) / 1000).toFixed(0));
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const ResendOTPButton = () => {
  const [timer, setTimer] = useState(15000);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [resendOtp, resendOtpResult] = useResendOtpMutation();
  const { showErrorToast, showSuccessToast } = useAlertToast();
  const { token } = useSelector<RootState, AuthState>((state) => state.auth);

  useEffect(() => {
    setTimeRemaining(timer);
    const intv = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev - 1000 <= 0) {
          clearInterval(intv);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => {
      clearInterval(intv);
    };
  }, [timer]);

  useEffect(() => {
    if (resendOtpResult.isSuccess) {
      setTimer((prev) => prev + 15000);
      showSuccessToast("OTP resent successfully");
    } else if (resendOtpResult.isError) {
      showErrorToast("Failed to send otp");
    }
  }, [resendOtpResult.isSuccess, resendOtpResult.isError]);

  const canResend = !timeRemaining;
  const isResnedDisabled = !canResend;

  const styles = isResnedDisabled ? { opacity: 0.5 } : {};

  const onPressResend = useCallback(() => {
    resendOtp({ token });
    // .then((data) => {
    //   setTimer((prev) => prev + 15000);
    //   showSuccessToast("OTP resent successfully");
    // })
    // .catch((error) => {
    //   showErrorToast("Failed to send otp");
    // });
  }, []);

  return (
    <Button
      w="70%"
      my="10"
      colorScheme={"orange"}
      variant="outline"
      borderColor={"orange.700"}
      disabled={isResnedDisabled}
      style={styles}
      onPress={onPressResend}
    >
      {timeRemaining
        ? `Resend in ${millisToMinutesAndSeconds(timeRemaining)}`
        : "Resend OTP"}
    </Button>
  );
};
