import { Badge as NativeBadge, IBadgeProps } from 'native-base';

export const Badge = ({ children, ...rest }: IBadgeProps) => {
  return <NativeBadge {...rest}>{children}</NativeBadge>;
};
