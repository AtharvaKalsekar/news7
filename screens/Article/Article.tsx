import { Article as TArticle } from '@models';
import { ArticleTextView } from '@modules';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box } from 'native-base';
import { useLayoutEffect } from 'react';
import { Image, StyleSheet } from 'react-native';

export const Article = () => {
  const { params } = useRoute() as Partial<{ params: TArticle }>;

  const { setOptions } = useNavigation();

  const { abstract, title, byline, multimedia, url } = params!;

  return (
    <Box
      style={styles.container}
      _light={{ background: "white" }}
      _dark={{ background: "black" }}
    >
      <Image
        style={styles.image}
        source={{
          uri: multimedia[0].url,
        }}
      />
      <Box style={styles.textContainer}>
        <ArticleTextView
          abstract={abstract}
          title={title}
          byline={byline}
          url={url}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "50%",
  },
  textContainer: {
    marginTop: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  headerActionsContainer: {
    flexDirection: "row",
    marginRight: 10,
    padding: 3,
  },
});
