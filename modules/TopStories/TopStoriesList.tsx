import { Article } from '@models';
import { Text } from 'react-native';

type Props = {
  stories: Article[];
};

export const TopStoriesList = ({ stories }: Props) => {
  return <Text>TopStoriesList</Text>;
};
