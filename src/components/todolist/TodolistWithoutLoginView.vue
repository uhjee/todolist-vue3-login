<template>
  <div>
    <div class="todolist-container">
      <!--      NOT DONE LIST-->
      <TodolistArrayComp
        :list="notDoneList"
        title="Not Done"
        :list-todo-status="TodoStatus.NOT_DONE"
        @moved="onMovedTodo"
        @added="loadData()"
        @deleted="loadData()"
      />
      <!--      DOING LIST-->
      <TodolistArrayComp
        :list="doingList"
        title="Doing"
        :list-todo-status="TodoStatus.DOING"
        @moved="onMovedTodo"
        @deleted="loadData()"
      />
      <!--      DONE LIST-->
      <TodolistArrayComp
        :list="doneList"
        title="Done"
        :list-todo-status="TodoStatus.DONE"
        @moved="onMovedTodo"
        @deleted="loadData()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TodoService from '@/services/todo.service';
import { ResponseStatus } from '@/types/ResponseEntity';
import { AddedEmitPayload, Todo, TodoStatus } from '@/types/Todo';
import TodolistArrayComp from '@/components/todolist/components/TodolistArrayComp.vue';
import Message from 'vue-m-message';

const notDoneList = ref<Todo[]>([]);
const doingList = ref<Todo[]>([]);
const doneList = ref<Todo[]>([]);

const loadData = async () => {
  try {
    const { data } = await TodoService.getAllTodosGroupByStatus();
    if (data._statusCode === ResponseStatus.OK) {
      const { _data: todoByStatusMap } = data;
      if (todoByStatusMap) {
        notDoneList.value = todoByStatusMap.notDone;
        doingList.value = todoByStatusMap.doing;
        doneList.value = todoByStatusMap.done;
      }
    }
  } catch (e) {
    Message.error('Todolist 목록을 조회하지 못했습니다.');
    console.log(e);
  }
};

onMounted(async () => {
  await loadData();
});

const onMovedTodo = async (payload: AddedEmitPayload) => {
  const {
    id,
    status,
  } = payload;
  try {
    const { data } = await TodoService.updateTodo(id, { status });
    if (data._statusCode === ResponseStatus.OK) {
      console.log(`${id} Todo 수정 성공`);
    }
  } catch (e) {
    console.log(e);
  } finally {
    await loadData();
  }
};
</script>

<style lang="scss" scoped>
.todolist-container {
  height: calc(100vh - 300px);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>
