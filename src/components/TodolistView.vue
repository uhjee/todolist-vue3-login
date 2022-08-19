<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import TodoService from '@/services/todo.service';
import { ResponseStatus } from '@/types/ResponseEntity';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Todo } from '@/types/Todo';

const router = useRouter();
const store = useStore();
const todos = ref<Todo[]>([]);

const loggedIn = computed(() => store.state.auth.status.loggedIn);

onMounted(async () => {
  // [Auth] 로그인되지 않은 유저 navigation guard
  if (!loggedIn.value) {
    router.push('/login');
    return;
  }
  try {
    const { data: resData } = await TodoService.getUserTodos();
    if (resData._statusCode === ResponseStatus.OK) {
      todos.value = resData._data as Todo[];
    }
  } catch (e) {
    todos.value = [];
    console.log(e);
  }
});
</script>

<template>
  <div>
    <div class="todos-container" v-if="todos.length > 0">
      <div class="todo-box" v-for="todo in todos" :key="todo.id">
        <span class="todo-box__item">
          {{ todo.content }}
        </span>
        <span class="todo-box__item">
          {{ todo.content }}
        </span>
        <span class="todo-box__item">
          {{ todo.createAt }}
        </span>
        <span class="todo-box__item">
          {{ todo.status }}
        </span>
        <span class="todo-box__item">
          {{ todo.updatedAt }}
        </span>
      </div>
    </div>
    <div v-else>
      Todo List is Empty.
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todos-container {
  padding: 20px 40px;
  height: calc(100vh - 100px);
  background-color: #42b983;
}

.todo-box {
  box-sizing: border-box;
  padding: 10px 20px;
  background-color: #ffffff;
  font-size: 18px;
  margin-bottom: 20px;

  .todo-box__item {
    margin-right: 12px;
  }
}
</style>
