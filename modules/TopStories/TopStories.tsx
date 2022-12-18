import { Section } from '@models';
import { Center } from 'native-base';
import { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { useGetTopStoriesQuery } from '../../store/apis';
import { SectionsMenu } from './SectionsMenu';
import { TopStoriesList } from './TopStoriesList';

export const TopStories = () => {
  const [selectedSection, setSelectedSection] = useState<Section>(Section.ARTS);

  const { data, isError, isFetching, isLoading } =
    useGetTopStoriesQuery(selectedSection);

  const onSelectSection = useCallback((section: Section) => {
    setSelectedSection(section);
  }, []);

  return (
    <>
      <SectionsMenu
        selectedSection={selectedSection}
        onSelectSection={onSelectSection}
      />
      {isLoading || isFetching ? (
        <Center h="full" w="full">
          <ActivityIndicator size={30} />
        </Center>
      ) : (
        <TopStoriesList stories={data.results} />
      )}
    </>
  );
};
