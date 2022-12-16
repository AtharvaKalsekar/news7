import { HStack as NativeHStack } from 'native-base';
import { InterfaceHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack';

export const HStack = ({ children, ...rest }: InterfaceHStackProps) => {
  return <NativeHStack {...rest}>{children}</NativeHStack>;
};
