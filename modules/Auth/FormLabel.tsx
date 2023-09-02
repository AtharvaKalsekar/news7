import { Text } from 'native-base';

type Props = {
  label: string;
};
export const FormLabel = ({ label }: Props) => {
  return (
    <Text
      _dark={{ color: "gray.400" }}
      _light={{ color: "black" }}
      fontWeight={700}
      marginBottom={3}
    >
      {label}
    </Text>
  );
};
