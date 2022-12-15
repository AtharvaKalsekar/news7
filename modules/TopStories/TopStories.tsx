import { useGetTopStoriesQuery } from '../../store/apis';
import { TopStoriesList } from './TopStoriesList';

export const TopStories = () => {
  const { data, isError, isFetching, isLoading } =
    useGetTopStoriesQuery("arts");

  console.log({ data, isError, isFetching, isLoading });

  return <TopStoriesList stories={data} />;
};
