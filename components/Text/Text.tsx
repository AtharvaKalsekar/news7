import { ITextProps, Text as NativeText } from 'native-base';

export const Text = ({ children, ...rest }: ITextProps) => {
  return (
    <NativeText
      _light={{ color: "black" }}
      _dark={{ color: "white" }}
      {...rest}
    >
      {children}
    </NativeText>
  );
};
