import { Card, Text } from '@components';
import { Article } from '@models';
import { useNavigation } from '@react-navigation/native';
import { Box } from 'native-base';
import { useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, Text as RNText } from 'react-native';
import { StackNavProps } from 'StackNavigation';

import { Screens } from '../../utils/constants';

// import ImagePlaceholder from '../../assets/news_item_placeholder.png';

type Props = {
  story: Article;
};

export const TopStoriesListItem = ({ story }: Props) => {
  const { navigate } = useNavigation<StackNavProps>();

  const onPress = useCallback(() => {
    navigate(Screens.ARTICLE, { ...story });
  }, [navigate, story]);

  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Pressable onPress={onPress}>
      <Card
        style={style.itemContainer}
        _light={{
          backgroundColor: "white",
          _text: { color: "black" },
          borderColor: "gray.400",
        }}
        _dark={{
          backgroundColor: "gray.700",
          _text: { color: "white" },
          borderColor: "gray.600",
        }}
        shadow={"5"}
      >
        <Box>
          <Image
            onLoad={() => setImgLoaded(true)}
            source={
              imgLoaded
                ? {
                    uri: story.multimedia?.[0]?.url,
                  }
                : require("../../assets/news_item_placeholder.png")
            }
            style={style.image}
            alt="image"
          />
        </Box>
        <Box
          style={style.textContainer}
          _light={{ backgroundColor: "white" }}
          _dark={{ backgroundColor: "gray.800" }}
          padding={2}
          flexWrap={"wrap"}
        >
          <RNText>
            <Text
              fontSize={18}
              fontWeight={"bold"}
              fontFamily={"Roboto"}
              lineHeight={"sm"}
            >
              {story.title}
            </Text>
          </RNText>
          <Text style={{ fontSize: 10, fontWeight: "normal" }}>
            {new Date(story.published_date).toDateString()}
          </Text>
        </Box>
      </Card>
    </Pressable>
  );
};

const style = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    borderRadius: 15,
    marginVertical: 3,
    overflow: "hidden",
  },
  image: {
    width: 150,
    height: 150,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    padding: 3,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 3,
  },
});
