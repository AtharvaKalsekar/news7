import { Article } from '@models';
import { FlatList, StyleSheet } from 'react-native';

import { TopStoriesListItem } from './TopStoriesListItem';

type Props = {
  stories: Article[];
};

export const TopStoriesList = ({ stories }: Props) => {
  return (
    <FlatList
      data={stories}
      style={style.container}
      renderItem={({ item }) => {
        return <TopStoriesListItem story={item} key={item.uri} />;
      }}
    ></FlatList>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
  },
});
