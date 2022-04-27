import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Page from "./components/Page";

export default function App() {
  const words = ["Whats", "up", "Mobile", "App", "?"];

  const translatex = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translatex.value = event.contentOffset.x;
    console.log(event.contentOffset.x);
  });
  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      horizontal
      pagingEnabled
      style={styles.container}
    >
      {words.map((word, index) => {
        return (
          <Page key={index} word={word} index={index} translatex={translatex} />
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
