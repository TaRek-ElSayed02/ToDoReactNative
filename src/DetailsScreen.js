import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailsScreen = ({ route }) => {
  const { id, title } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task ID: {id || "N/A"}</Text>
      <Text style={styles.taskTitle}>Task Title: {title || "No Title"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  taskTitle: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default DetailsScreen;
