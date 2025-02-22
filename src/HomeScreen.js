import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Platform
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; 

const HomeScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([
        { id: "1", title: "First Item" },
        { id: "2", title: "Second Item" },
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.input} placeholder="Enter Title" />
            <TextInput style={styles.input} placeholder="Enter Description" />

            <TouchableOpacity style={styles.submitbtn}>
                <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.dividerLine} />

            <FlatList
                data={tasks}
                style={styles.taskList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <TouchableOpacity
                            style={styles.taskTextContainer}
                            onPress={() => navigation.navigate("Details", { id: item.id, title: item.title })}
                        >
                            <Text style={styles.taskText}>{item.title}</Text>
                        </TouchableOpacity>

                        <View style={styles.iconContainer}>
                            <TouchableOpacity>
                                {Platform.OS === "ios" ? (
                                    <Ionicons name="checkmark" size={24} color="green" />
                                ) : (
                                    <MaterialIcons name="check" size={24} color="green" />
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity>
                                {Platform.OS === "ios" ? (
                                    <Ionicons name="ios-trash" size={24} color="red" />
                                ) : (
                                    <MaterialIcons name="delete" size={24} color="red" />
                                )}
                            </TouchableOpacity>

                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 20,
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "90%",
        borderRadius: 8,
    },
    submitbtn: {
        width: "50%",
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
    },
    text: {
        color: "white",
        fontSize: 16,
    },
    dividerLine: {
        height: 1,
        width: "90%",
        backgroundColor: "#aeaeae",
        marginVertical: 15,
    },
    taskList: {
        width: "90%",
    },
    taskItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#f9f9f9",
        marginBottom: 5,
        marginTop: 10,
    },
    taskTextContainer: {
        flex: 1,
    },
    taskText: {
        fontSize: 16,
    },
    iconContainer: {
        flexDirection: "row",
        gap: 10,
    },
});

export default HomeScreen;
