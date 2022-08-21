<template>
  <Teleport to="#modal-destination">
    <MyModal ref="myModal" @close="onCloseModal">
      <template #title>Add Todo</template>
      <template #content>
        <div class="add-todo-modal--content">
          <Form @submit="onCreateTodo">
            <Field name="todo" type="text" :rules="todoRules" ref="todoField"/>
            <ErrorMessage class="error-message" name="todo"/>
            <button>Add</button>
          </Form>
        </div>
      </template>
    </MyModal>
  </Teleport>
</template>

<script setup lang="ts">
import { defineEmits, defineExpose, onMounted, ref } from 'vue';
import { ErrorMessage, Field, Form } from 'vee-validate';
import MyModal from '@/teleport/MyModal.vue';
import * as yup from 'yup';
import TodoService from '@/services/todo.service';
import { ResponseStatus } from '@/types/ResponseEntity';
import Message from 'vue-m-message';

interface Emits {
  (e: 'close'): void;

  (e: 'added'): void;
}

const emit = defineEmits<Emits>();

const myModal = ref<InstanceType<typeof MyModal> | null>(null);
const hide = () => {
  myModal.value?.hide();
  // emit('close');
};
const show = () => {
  myModal.value?.show();
};

const todoField = ref<InstanceType<typeof Field> | null>(null);
onMounted(() => {
  console.log(todoField.value);
});
// const todoContent = ref<string>('');
const onCloseModal = () => {
  // todoContent.value = '';
};

const todoRules = yup.string()
  .required('할 일을 입력해주세요.')
  .min(2, '2글자 이상 입력해주세요.');

const onCreateTodo = async ({ todo }: { todo: string }) => {
  const shortTodo = `${todo.substring(0, 5)}...`;
  try {
    const { data } = await TodoService.createTodoWithoutLogin({ content: todo });
    if (data._statusCode === ResponseStatus.OK) {
      console.log(`[todo 생성 완료]:: ${data._data}`);
      Message.success(`'${shortTodo}' 를 추가하였습니다.`);
      hide();
      emit('added');
    }
  } catch (e) {
    Message.error(`'${shortTodo}' 를 추가하지 못했습니다.`);
    console.log(e);
  }
};

defineExpose({
  hide,
  show,
});

</script>

<style scoped lang="scss">

.add-todo-modal--content {
  position: relative;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    input {
      width: 100%;
      border: 1px solid #aaaaaa;
      border-radius: 4px;
      height: 30px;
      outline: none;
      margin-right: 6px;
    }

    .error-message {
      position: absolute;
      top: 41px;
      left: 0;
      width: 100%;
      font-size: 14px;
      color: #da4545;
    }
  }

  button {
    height: 30px;
    box-sizing: border-box;
    padding: 0 12px;
    margin-right: 8px;
    font-size: 22px;
    background-color: #fff;
    border: 2px solid #42b983;
    border-radius: 5px;
    cursor: pointer;
    color: #555;

    &:active {
      background-color: rgba(#42b983, 0.7);
    }
  }
}
</style>
