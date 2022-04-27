import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");
const SIZE = width * 0.7;

const Page = (props) => {
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      props.translatex.value,
      [
        (props.index - 1) * width,
        props.index * width,
        (props.index + 1) * width,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      props.translatex.value,
      [
        (props.index - 1) * width,
        props.index * width,
        (props.index + 1) * width,
      ],
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
      borderRadius,
    };
  });

  const rText = useAnimatedStyle(() => {
    const translateY = interpolate(
      props.translatex.value,
      [
        (props.index - 1) * width,
        props.index * width,
        (props.index + 1) * width,
      ],
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      props.translatex.value,
      [
        (props.index - 1) * width,
        props.index * width,
        (props.index + 1) * width,
      ],
      [-2, 1, -2],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });
  return (
    <View
      style={[
        styles.pageContainer,
        { backgroundColor: `rgba(0,0,256,0.${props.index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]}></Animated.View>
      <Animated.View style={[{ position: "absolute" }, rText]}>
        <Text style={[styles.text]}>{props.word}</Text>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgba(0,0,256,0.4)",
  },
  text: {
    fontSize: 70,
    color: "white",
    fontWeight: "bold",
  },
});
