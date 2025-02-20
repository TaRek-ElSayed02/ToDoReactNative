
import { StyleSheet, Text, View, TextInput , TouchableOpacity , FlatList } from 'react-native';


export default function App() {
  const tasks = [
    { id: "1", title: "First Item" },
    { id: "2", title: "Second Item" },
      ];
  return (
    <View style={styles.container}>
      <Text style={styles.appHeader}>ToDo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Title"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Description"
      />
      <TouchableOpacity style={styles.submitbtn}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.dividerLine} />

      <Text style={styles.filterContainer}>
      <TouchableOpacity style={styles.activeFilterBtn}>
        <Text style={styles.activeFilterText}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterBtn}>
        <Text style={styles.filterText}>InProgress</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterBtn}>
        <Text style={styles.filterText}>Done</Text>
      </TouchableOpacity>
      </Text>

      <FlatList
        data={tasks}
        style={styles.taskList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.title}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  appHeader: {
    fontSize: 40,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 400
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
  },
  dividerLine: {
    height: 1,
    width: "90%",
    backgroundColor: "#aeaeae",
    marginVertical: 15,
  },
  filterContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  filterBtn: {
    width: "30%",
    backgroundColor: "#ffffff",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    marginStart: 15,
  },
  filterText: {
    color: "black",
    fontSize: 15,
  },
  activeFilterBtn: {
    width: "30%",
    backgroundColor: "black",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
  },
  activeFilterText: {
    color: "white",
    fontSize: 15,
  },
  taskList: {
    width: "90%",
  },
  taskItem: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 5,
    marginTop: 10
  },
});
