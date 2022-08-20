<template>
  <div :class="['todo-list-box', todolistClass]">
    <div class="header">
      {{ title }}.
      <button v-if="listTodoStatus === TodoStatus.NOT_DONE"
              @click="showModal"
              class="add-todo-btn">
        <font-awesome-icon color="#42b983" size="lg" icon="plus"/>
      </button>
    </div>
    <div class="draggable-box">
      <DraggableComp
        :list="list"
        group="todoList"
        :animation="200"
        :component-data="{
              tag: 'ul',
              type: 'transition-group',
              name: !drag ? 'flip-list' : null
            }"
        ghostClass="ghost"
        @start="drag=true"
        @end="drag=false"
        @change="(event) => onMovedTodo(event)"
        item-key="id"
      >
        <template #item="{element}">
          <li class="draggable-item">
            {{ element.content }}
            <font-awesome-icon @click="onDeleteTodo(element)" color="#7c7a76"
                               icon="delete-left" class="item-delete-btn"/>
          </li>
        </template>
      </DraggableComp>
    </div>
  </div>
  <!--  ADD MODAL-->
  <AddTodoModal ref="addTodoModal" @added="emit('added')"/>

</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, withDefaults } from 'vue';
import DraggableComp from 'vuedraggable';
import { AddedEmitPayload, Todo, TodoStatus } from '@/types/Todo';
import AddTodoModal from '@/components/todolist/components/AddTodoModal.vue';
import TodoService from '@/services/todo.service';
import { ResponseStatus } from '@/types/ResponseEntity';
import Message from 'vue-m-message';

interface Props {
  list: Todo[];
  title: string;
  listTodoStatus: TodoStatus;
}

/**
 * [props & emits]
 */
const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  title: '',
  listTodoStatus: TodoStatus.NOT_DONE,
});

interface Emits {
  (e: 'moved', payload: AddedEmitPayload): void;

  (e: 'added'): void;

  (e: 'deleted'): void;
}

const emit = defineEmits<Emits>();

/**
 * [move Todo list ]
 */
type OnChangeEvent = {
  [key in 'removed' | 'moved' | 'added']: { element: Todo; };
};
const onMovedTodo = async (event: OnChangeEvent) => {
  if (('added' in event)) {
    const {
      id,
    } = event.added.element;

    emit('moved', {
      id,
      status: props.listTodoStatus,
    });
  }
};

const drag = ref<boolean>(false);
const todolistClass = computed<string>(() => {
  switch (props.listTodoStatus) {
    case TodoStatus.NOT_DONE:
      return 'not-done';
    case TodoStatus.DOING:
      return 'doing';
    case TodoStatus.DONE:
      return 'done';
    default:
      return 'not-done';
  }
});

const onDeleteTodo = async ({
  content,
  id,
}: Partial<Todo>) => {
  const shortTodo = `${content?.substring(0, 5)}...`;
  try {
    const { data } = await TodoService.deleteTodoWithoutLogin(id);
    if (data._statusCode === ResponseStatus.OK) {
      Message.success(`'${shortTodo}' 를 삭제하였습니다.`);
      emit('deleted');
      console.log(`[Todo 삭제 성공]:: ${id}`);
    }
  } catch (e) {
    Message.error(`'${shortTodo}' 를 삭제하지 못했습니다.`);
    console.log(e);
  }
};

/**
 * [Add modal]
 */
const addTodoModal = ref<InstanceType<typeof AddTodoModal>>(null);
const showModal = () => {
  addTodoModal.value?.show();
};

</script>

<style lang="scss" scoped>
.todo-list-box {
  border: 1px solid #666;
  border-radius: 5px;
  width: 31%;
  height: 94%;

  &.not-done {
    .header {
      border-bottom: 1px solid #666;
      justify-content: space-between;

      .add-todo-btn {
        height: 30px;
        width: 30px;
        box-sizing: border-box;
        margin-right: 8px;
        font-size: 14px;
        background-color: #fff;
        border: 2px solid #42b983;
        border-radius: 5px;

        &:active {
          background-color: rgba(#42b983, 0.2);
        }
      }
    }

  }

  &.doing {
    .header {
      background-color: #42b983;
    }

  }

  &.done {
    .header {
      color: #fff;
      background-color: #333;
    }
  }

  .header {
    padding: 10px;
    font-size: 28px;
    display: flex;
    align-items: center;
  }

  .draggable-box {
    padding: 20px 20px 20px 24px;

    .draggable-item {
      width: 100%;
      border-radius: 0 8px 8px 0;
      padding: 10px 16px 10px 12px;
      margin-bottom: 2px;
      display: flex;
      justify-content: space-between;
      background-color: #f4f3f1;
      border-left: 4px solid #666666;
      cursor: move;

      &:last-child {
        margin-bottom: 0;
      }

      &.ghost {
        opacity: 0.5;
        background-color: #dde3dd;
      }

      .item-delete-btn {
        cursor: pointer;
      }
    }
  }
}

</style>
