import React, {useState} from 'react'
import {StyleSheet, View, Alert} from 'react-native'
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import {Navbar} from './src/components/Navbar'
import {MainActivity} from './src/screens/MainActivity'
import {TodoActivity} from './src/screens/TodoActivity'

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })
}

export default function App() {
  const [todoId, setTodoId] = useState(null)
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
    const nameTodo = todos.find((item) => item.id === id)
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${nameTodo.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            setTodoId(null)
            setTodos((prev) => prev.filter((item) => item.id !== id))
          },
        },
      ],
      {cancelable: false}
    )
  }

  const updateTodo = ({id, title}) => {
    setTodos((oldTodos) =>
      oldTodos.map((item) => {
        if (item.id === id) {
          item.title = title
        }
        return item
      })
    )
  }

  let content = (
    <MainActivity
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      onOpenTodo={(id) => {
        setTodoId(id)
      }}
    />
  )
  if (todoId) {
    const todoScelected = todos.find((todo) => todo.id === todoId)
    content = (
      <TodoActivity
        goBack={() => setTodoId(null)}
        todo={todoScelected}
        removeTodo={removeTodo}
        onSave={updateTodo}
      />
    )
  }

  return (
    <View>
      <Navbar title={'Перечень задач'} />
      <View style={styles.container}>{content}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
})
