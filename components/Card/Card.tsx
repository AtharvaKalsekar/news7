import { Box } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';

export const Card = ({ children, ...rest }: InterfaceBoxProps) => {
  return <Box {...rest}>{children}</Box>;
};
