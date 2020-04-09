import React, {useState} from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import {Navbar} from './src/Navbar'
import {AddTodo} from './src/AddTodo'
import {Todo} from './src/Todo'

export default function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (title) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now().toString,
        title: title,
      },
    ])
  }

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <View>
      <Navbar title={'Перечень задач'} />
      <View style={styles.container}>
        <AddTodo onSubmit={addTodo} />

        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={todos}
          renderItem={({item}) => <Todo todo={item} removeTodo={removeTodo} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
})
