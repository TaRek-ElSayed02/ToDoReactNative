import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({ route }) => {
  const [tasks, setTasks] = useState(route.params.tasks || []);
  const [filter, setFilter] = useState("all"); 

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: task.status === "done" ? "in-progress" : "done" } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };


  const filteredTasks = tasks.filter(task =>
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
              <TouchableOpacity onPress={() => toggleTaskStatus(item.id)}>
                <Ionicons name="checkmark-outline" size={24} color={item.status === "done" ? "gray" : "green"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity >
                <AntDesign name="edit" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    width: "100%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    width:"27%"
  },
  activeFilter: {
    backgroundColor: "black",
  },
  filterText: {
    fontSize: 14,
    
    textAlign:"center"
  },
  activeFilterText: {
    color: "white",
    fontWeight: "bold",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 5,
    width: "90%",
    margin:"auto"
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  doneText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 15,
    paddingRight: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 5,
    flex: 1,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default DetailsScreen;
