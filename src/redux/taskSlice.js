import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Save to AsyncStorage
const saveTasksToStorage = async (tasks) => {
  try {
    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    completeTasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.list = action.payload;
      state.completeTasks = action.payload.filter(task => task.status === "done");
    },
    addTask: (state, action) => {
      state.list.push(action.payload);
      saveTasksToStorage(state.list);
    },
    toggleTaskStatus: (state, action) => {
      const task = state.list.find((task) => task.id === action.payload);
      if (task) {
        task.status = task.status === "done" ? "in-progress" : "done";
        
       
        if (task.status === "done") {
          state.completeTasks.push(task);
        } else {
          state.completeTasks = state.completeTasks.filter((t) => t.id !== task.id);
        }

        saveTasksToStorage(state.list);
      }
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
      state.completeTasks = state.completeTasks.filter((task) => task.id !== action.payload);
      saveTasksToStorage(state.list);
    },
  },
});

export const { setTasks, addTask, toggleTaskStatus, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
