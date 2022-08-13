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

// mounted() {
//   UserService.getPublicContent().then(
//     (response) => {
//       this.content = response.data;
//     },
//     (error) => {
//       this.content =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//     }
//   );
// },
const loggedIn = computed(() => store.state.auth.status.loggedIn);

onMounted(async () => {
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
    console.log(e);
  }
});
</script>

<template>
  <div>
    <ul v-if="todos.length > 0">
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.content }}
      </li>
    </ul>
    <div v-else>
      Todo List is Empty.
    </div>
  </div>
</template>
