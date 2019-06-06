<template>
  <div id="app">
    <h1>Todos</h1>
    <input v-model="newTodo"
      placeholder="Was sollte gemacht werden?"
      @keyup.enter="addTodo"
      @keyup.escape="newTodo=''">
      <ul v-if="todos.length !== 0">
        <li v-for="(todo, index) of todos"
          :key="index"
          @click="toggleTodo(todo)"
          :class="{done: todo.done}">
          {{todo.text}}
          <button @click.stop="deleteTodo(index)">x</button>
        </li>
      </ul>
      <p v-else>Keine Todos</p>
      <small>Click um Status zu toggeln</small>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      newTodo: '',
      todos: []
    }
  },
  async created() {
    let response = await axios.get('/api/todo')
    this.todos = response.data
  },
  methods: {
    async addTodo() {
      let todo = {
        text: this.newTodo,
        done: false
      }
      this.todos.push(todo)
      this.newTodo = ''
      let result = await axios.post('/api/todo', {text: todo.text})
      todo.id = result.data[0]
    },
    async toggleTodo(todo) {
      todo.done = !todo.done
      await axios.put(`/api/todo/${todo.id}`, {done: todo.done})
    },
    async deleteTodo(index) {
      let todo_id = this.todos[index].id
      this.todos.splice(index, 1)
      await axios.delete(`/api/todo/${todo_id}`)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 20px;
}
.done {
  text-decoration: line-through;
}
</style>
