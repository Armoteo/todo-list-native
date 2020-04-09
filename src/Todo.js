import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'

export const Todo = (todo, removeTodo) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => console.log('press')}
      onLongPress={() => removeTodo(todo.id)}
    >
      <View style={styles.todo}>
        <Text>{todo.titles}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
})
