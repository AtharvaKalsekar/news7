import { Button } from 'native-base';
import { useCallback, useEffect, useState } from 'react';

const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Number(((millis % 60000) / 1000).toFixed(0));
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

type Props = {
  onPress: () => void;
};

export const ResendOTPButton = ({ onPress }: Props) => {
  const [timer, setTimer] = useState(15000);
  const [timeRemaining, setTimeRemaining] = useState(0);

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

  const canResend = !timeRemaining;
  const isResnedDisabled = !canResend;

  const styles = isResnedDisabled ? { opacity: 0.5 } : {};

  const onPressResend = useCallback(() => {
    setTimer((prev) => prev + 15000);
    onPress();
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
        : "Resend"}
    </Button>
  );
};
