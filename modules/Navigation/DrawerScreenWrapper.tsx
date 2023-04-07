import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

import { DrawerButton } from "./DrawerButton";

type Props = {
  children: React.ReactElement;
};

export const DrawerScreenWrapper = ({ children }: Props) => {
  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => <DrawerButton />,
    });
  }, []);

  return <>{children}</>;
};
