import { Center } from 'native-base';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

export const ScreenContainer = ({ children }: Props) => {
  return (
    <Center
      flex={1}
      paddingX={5}
      _dark={{ bg: "black" }}
      _light={{ bg: "white" }}
    >
      {children}
    </Center>
  );
};
