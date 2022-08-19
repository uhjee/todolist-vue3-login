<template>
  <div>
    <div class="todolist-container">
      <!--      NOT DONE LIST-->
      <div class="not-done-list-box">
        <div class="header">
          TODO.
        </div>
        <div class="draggable-box">
          <DraggableComponent
            :list="notDoneList"
            group="todoList"
            @start="drag=true"
            @end="drag=false"
            @change="(event) => onAddedTodo(event, TodoStatus.NOT_DONE)"
            item-key="id"
          >
            <template #item="{element}">
              <div class="draggable-item">{{ element.content }}</div>
            </template>
          </DraggableComponent>
        </div>
      </div>
      <!--      DOING LIST-->
      <div class="doing-list-box">
        <div class="header">
          DOING.
        </div>
        <div class="draggable-box">
          <DraggableComponent
            :list="doingList"
            group="todoList"
            @start="drag=true"
            @end="drag=false"
            @change="(event) => onAddedTodo(event, TodoStatus.DOING)"
            item-key="id"
          >
            <template #item="{element}">
              <div class="draggable-item">{{ element.content }}</div>
            </template>
          </DraggableComponent>
        </div>
      </div>
      <!--      DONE LIST-->
      <div class="done-list-box">
        <div class="header">
          DONE.
        </div>
        <div class="draggable-box">
          <DraggableComponent
            :list="doneList"
            group="todoList"
            @start="drag=true"
            @end="drag=false"
            @change="(event) => onAddedTodo(event, TodoStatus.DONE)"
            item-key="id"
          >
            <template #item="{element}">
              <div class="draggable-item">{{ element.content }}</div>
            </template>
          </DraggableComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TodoService from '@/services/todo.service';
import { ResponseStatus } from '@/types/ResponseEntity';
import { Todo, TodoStatus } from '@/types/Todo';
import DraggableComponent from 'vuedraggable';

const notDoneList = ref<Todo[]>([]);
const doingList = ref<Todo[]>([]);
const doneList = ref<Todo[]>([]);
const drag = ref<boolean>(false);

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
    console.log(e);
  }
};

onMounted(async () => {
  await loadData();
});

type OnChangeEvent = {
  [key in 'removed' | 'moved' | 'added']: { element: Todo; };
};

const onAddedTodo = async (event: OnChangeEvent, status: TodoStatus) => {
  if (('added' in event)) {
    const {
      id,
    } = event.added.element;
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
  }
};
</script>

<style lang="scss" scoped>
.todolist-container {
  width: 100%;
  height: calc(100vh - 300px);
  padding: 20px 36px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > * {
    border: 1px solid #666;
    border-radius: 5px;
    width: 31%;
    height: 94%;

    .header {
      padding: 10px;
      font-size: 28px;
    }

    .draggable-box {
      padding: 20px;

      .draggable-item {
        width: 100%;
        border-radius: 0 8px 8px 0;
        padding: 6px 16px 6px 12px;
        margin-bottom: 2px;
        background-color: #f4f3f1;
        border-left: 4px solid #666666;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .not-done-list-box {
    .header {
      border-bottom: 1px solid #666;
    }

    .draggable-box {
      .draggable-item {
      }
    }
  }

  .doing-list-box {
    .header {
      background-color: #42b983;

    }

    .draggable-box {
      .draggable-item {
      }
    }
  }

  .done-list-box {
    .header {
      color: #fff;
      background-color: #333;
    }

    .draggable-box {
      .draggable-item {
      }
    }
  }
}

</style>
