import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleTaskStatus, deleteTask } from "./redux/taskSlice";

const DetailsScreen = () => {
  const tasks = useSelector((state) => state.tasks.list);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Tasks</Text>

      <View style={styles.filterContainer}>
        {["all", "in-progress", "done"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[styles.filterButton, filter === status && styles.activeFilter]}
            onPress={() => setFilter(status)}
          >
            <Text style={[styles.filterText, filter === status && styles.activeFilterText]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={[styles.taskText, item.status === "done" && styles.doneText]}>
              {item.title}
            </Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => dispatch(toggleTaskStatus(item.id))}>
                <Ionicons name="checkmark-outline" size={24} color={item.status === "done" ? "gray" : "green"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(deleteTask(item.id))}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20, width: "100%" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  filterContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 10 },
  filterButton: { padding: 10, marginHorizontal: 5, borderWidth: 1, borderRadius: 5, width: "27%" },
  activeFilter: { backgroundColor: "black" },
  filterText: { fontSize: 14, textAlign: "center" },
  activeFilterText: { color: "white", fontWeight: "bold" },
  taskItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 15, borderWidth: 1, borderRadius: 10, backgroundColor: "#f9f9f9", marginBottom: 5, width: "90%", margin: "auto" },
  taskText: { fontSize: 16, flex: 1 },
  doneText: { textDecorationLine: "line-through", color: "gray" },
  iconContainer: { flexDirection: "row", gap: 15, paddingRight: 10 },
});

export default DetailsScreen;
