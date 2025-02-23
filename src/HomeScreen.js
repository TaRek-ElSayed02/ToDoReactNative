import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [taskId, setTaskId] = useState(1);

    const saveTasks = async (tasks) => {
        try {
            await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error("Error saving tasks:", error);
        }
    };

    const loadTasks = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@tasks');
            const loadedTasks = jsonValue ? JSON.parse(jsonValue) : [];
            setTasks(loadedTasks);
            setTaskId(loadedTasks.length > 0 ? Math.max(...loadedTasks.map(task => task.id)) + 1 : 1);
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const addTask = () => {
        if (!title || !description) return;

        const newTask = { id: taskId, title, description, status: "in-progress" };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);

        setTitle("");
        setDescription("");
        setTaskId(taskId + 1);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.input} placeholder="Enter Title" value={title} onChangeText={setTitle} />
            <TextInput style={styles.input} placeholder="Enter Description" value={description} onChangeText={setDescription} />
            
            <TouchableOpacity style={styles.submitbtn} onPress={addTask}>
                <Text style={styles.text}>Add Task</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.submitbtn, { backgroundColor: "blue", marginTop: 10 }]}
                onPress={() => navigation.navigate("Details", { tasks })}
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
