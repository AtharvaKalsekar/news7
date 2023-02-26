import { Alert } from '@components';
import { useToast } from 'native-base';
import { useCallback } from 'react';

export const useAlertToast = () => {
  const toast = useToast();

  const showSuccessToast = useCallback((message: string) => {
    toast.show({
      render: () => (
        <Alert message={message} variant={"left-accent"} status={"success"} />
      ),
    });
  }, []);

  const showErrorToast = useCallback((message: string) => {
    toast.show({
      render: () => (
        <Alert message={message} variant={"left-accent"} status={"error"} />
      ),
    });
  }, []);

  return { showSuccessToast, showErrorToast };
};
