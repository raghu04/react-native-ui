import { StyleSheet, Text, View } from "react-native"
import React from "react"

export const AnimatedStackCards = () => {
  return (
    <View style={styles.container}>
      <Text>AnimatedStackCards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})
