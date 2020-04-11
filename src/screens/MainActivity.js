import React from 'react'
import {StyleSheet, View, FlatList, Image} from 'react-native'
import {AddTodo} from '../components/AddTodo'
import {Todo} from '../components/Todo'

export const MainActivity = ({addTodo, todos, removeTodo, onOpenTodo}) => {
  let content = (
    <FlatList
      data={todos}
      renderItem={({item}) => (
        <Todo todo={item} removeTodo={removeTodo} onOpenTodo={onOpenTodo} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  )

  if (todos.length === 0) {
    content = (
      <View style={styles.imageWrap}>
        <Image style={styles.image} source={require('../../assets/original.png')} />
      </View>
    )
  }
  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
})
