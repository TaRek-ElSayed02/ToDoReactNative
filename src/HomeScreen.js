import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./redux/taskSlice";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {
    if (!title || !description) return;

    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      title,
      description,
      status: "in-progress",
    };

    dispatch(addTask(newTask));
    setTitle("");
    setDescription("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.input} placeholder="Enter Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Enter Description" value={description} onChangeText={setDescription} />

      <TouchableOpacity style={styles.submitbtn} onPress={handleAddTask}>
        <Text style={styles.text}>Add Task</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.submitbtn, { backgroundColor: "blue", marginTop: 10 }]}
        onPress={() => navigation.navigate("Details")}
      >
        <Text style={styles.text}>View All Tasks</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 20 },
  input: { height: 50, margin: 12, borderWidth: 1, padding: 10, width: "90%", borderRadius: 8 },
  submitbtn: { width: "50%", backgroundColor: "#000", justifyContent: "center", alignItems: "center", padding: 15, borderRadius: 10 },
  text: { color: "white", fontSize: 16 },
});

export default HomeScreen;
