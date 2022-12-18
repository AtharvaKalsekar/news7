import { Card } from '@components';
import { Article } from '@models';
import { Box } from 'native-base';
import { Image, StyleSheet, Text } from 'react-native';

type Props = {
  story: Article;
};

export const TopStoriesListItem = ({ story }: Props) => {
  return (
    <Card style={style.itemContainer}>
      <Box>
        <Image
          source={{
            uri: story.multimedia[0]?.url,
          }}
          style={style.image}
        />
      </Box>
      <Box style={style.textContainer}>
        <Text style={style.title}>{story.title}</Text>
      </Box>
    </Card>
  );
};

const style = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    borderRadius: 15,
    marginVertical: 3,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "white",
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    padding: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 3,
  },
});
