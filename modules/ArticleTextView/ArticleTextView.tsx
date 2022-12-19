import * as WebBrowser from 'expo-web-browser';
import { Text } from 'native-base';
import { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';

type Props = {
  title: string;
  abstract: string;
  byline: string;
  url: string;
};

export const ArticleTextView = ({ title, abstract, byline, url }: Props) => {
  const onPress = useCallback(async () => {
    await WebBrowser.openBrowserAsync(url);
  }, [url]);

  return (
    <>
      <Pressable
        style={({ pressed }) => pressed && { backgroundColor: "#ccc" }}
        onPress={onPress}
      >
        <Text
          style={styles.title}
          _light={{ color: "black" }}
          _dark={{ color: "white" }}
        >
          {title}
        </Text>
      </Pressable>
      <Text
        style={styles.abstract}
        _light={{ color: "black" }}
        _dark={{ color: "white" }}
      >
        {abstract}
      </Text>
      <Text
        style={styles.byline}
        _light={{ color: "black" }}
        _dark={{ color: "white" }}
      >
        {" "}
        - {byline}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
  },
  abstract: {
    fontSize: 16,
    marginBottom: 14,
  },
  byline: {
    fontSize: 12,
    marginBottom: 5,
    fontStyle: "italic",
  },
});
