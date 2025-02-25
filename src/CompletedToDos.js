import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const CompletedToDos = () => {
    const completedTasks = useSelector((state) => state.tasks.completeTasks);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Completed Tasks</Text>
            {completedTasks.length === 0 ? (
                <Text style={styles.emptyText}>No completed tasks yet!</Text>
            ) : (
                <FlatList
                    data={completedTasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.taskItem}>
                            <Text style={styles.taskText}>{item.title}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: "center" },
    header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    emptyText: { fontSize: 16, color: "gray" },
    taskItem: { padding: 15, borderWidth: 1, borderRadius: 8, marginBottom: 5, width: "300px", backgroundColor: "#f9f9f9" },
    taskText: { fontSize: 16 },
});

export default CompletedToDos;
