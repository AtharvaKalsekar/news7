import { useAlertToast } from '@hooks';
import { Section } from '@models';
import { AuthState, RootState } from '@store';
import { Box, Center, useColorMode, useTheme } from 'native-base';
import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { useGetTopStoriesQuery } from '../../store/apis';
import { SectionsMenu } from './SectionsMenu';
import { TopStoriesList } from './TopStoriesList';

export const TopStories = () => {
  const [selectedSection, setSelectedSection] = useState<Section>(Section.ARTS);
  const { token } = useSelector<RootState, AuthState>((state) => state.auth);
  const { showErrorToast } = useAlertToast();

  const { data, isError, isFetching, isLoading, refetch } =
    useGetTopStoriesQuery({
      section: selectedSection,
      token,
    });

  const onSelectSection = useCallback((section: Section) => {
    setSelectedSection(section);
  }, []);

  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
      .then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        showErrorToast("Unable to refresh");
      });
  }, []);

  return (
    <Box
      style={styles.container}
      _light={{
        backgroundColor: "white",
      }}
      _dark={{
        backgroundColor: "black",
      }}
    >
      <SectionsMenu
        selectedSection={selectedSection}
        onSelectSection={onSelectSection}
      />
      {isLoading || isFetching ? (
        <Center h="full" w="full">
          <ActivityIndicator size={50} color={colors.orange[600]} />
          <Text style={{ color: "orange" }}>{"Fetching news ..."}</Text>
        </Center>
      ) : (
        <TopStoriesList
          refreshing={refreshing}
          onRefresh={onRefresh}
          stories={data}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
