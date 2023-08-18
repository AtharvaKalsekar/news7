import { Article } from '@models';
import { useTheme } from 'native-base';
import { useCallback, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import { TopStoriesListItem } from './TopStoriesListItem';

type Props = {
  stories: Article[];
  onRefresh: () => void;
  refreshing: boolean;
};

export const TopStoriesList = ({ stories, refreshing, onRefresh }: Props) => {
  const { colors } = useTheme();

  return (
    <FlatList
      data={stories}
      style={style.container}
      renderItem={({ item }) => {
        return <TopStoriesListItem story={item} key={item.uri} />;
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.orange["500"], "white"]}
        />
      }
    ></FlatList>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
  },
});
