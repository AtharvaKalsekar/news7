import { Card, Text } from "@components";
import { Article } from "@models";
import { useNavigation } from "@react-navigation/native";
import { Box } from "native-base";
import { useCallback } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { StackNavProps } from "StackNavigation";

import { Screens } from "../../utils/constants";

type Props = {
  story: Article;
};

export const TopStoriesListItem = ({ story }: Props) => {
  const { navigate } = useNavigation<StackNavProps>();

  const onPress = useCallback(() => {
    navigate(Screens.ARTICLE, { ...story });
  }, [navigate, story]);

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
      >
        <Box>
          <Image
            source={{
              uri: story.multimedia?.[0]?.url,
            }}
            style={style.image}
          />
        </Box>
        <Box
          style={style.textContainer}
          _light={{ backgroundColor: "white" }}
          _dark={{ backgroundColor: "gray.800" }}
        >
          <Text style={style.title}>{story.title}</Text>
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
    borderWidth: 1,
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
