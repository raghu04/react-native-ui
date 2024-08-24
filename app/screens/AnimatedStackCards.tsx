import { StyleSheet, View } from "react-native"
import React from "react"
import { colors } from "app/theme"
import { StatusBar } from "expo-status-bar"
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

type CardProps = {
  index: number
  progress: SharedValue<number>
}

const Card: React.FC<CardProps> = ({ index, progress }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, index * 25], Extrapolation.CLAMP)
    const translateY = interpolate(progress.value, [0, 1], [0, -index * 5], Extrapolation.CLAMP)
    const rotate = interpolate(
      progress.value,
      [0, 1],
      [-index * 10, index * 10],
      Extrapolation.CLAMP,
    )

    return {
      transform: [
        {
          translateX, // 0 -> index * 25
        },
        {
          translateY, // 0 -> -index * 5
        },
        {
          rotate: `${rotate}deg`, // `0deg` -> `${index * 10}deg`
        },
      ],
    }
  })

  return (
    <Animated.View
      key={index}
      style={[
        styles.box,
        animatedStyle,
        {
          zIndex: -index,
        },
      ]}
    />
  )
}

export const AnimatedStackCards = () => {
  const progress = useSharedValue(0)

  return (
    <View
      style={styles.container}
      onTouchStart={() => {
        progress.value = withSpring(1, {
          mass: 2,
        })
      }}
      onTouchEnd={() => {
        progress.value = withSpring(0)
      }}
    >
      <StatusBar style="auto" />

      {new Array(4).fill(null).map((_, index) => (
        <Card key={index} index={index} progress={progress} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    aspectRatio: 3 / 4,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderCurve: "continuous",
    borderRadius: 25,
    borderWidth: 0.25,
    elevation: 5,
    height: 180,
    position: "absolute",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.lightGray,
    flex: 1,
    justifyContent: "center",
  },
})
