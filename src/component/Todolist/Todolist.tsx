import styles from './todolist.module.scss'
import { Todo } from '../../@types/todo.type'
import { useEffect, useReducer } from 'react'
import Taskinput from '../Taskinput'
import Tasklist from '../Tasklist'
import {
  AddTodoAction,
  DeleteTodo,
  EditTodo,
  FinishEdit,
  HandleNewTodos,
  OnChangeCheckBox,
  SetTodos,
  StartEditTodo,
  initialArg,
  actionSyn
} from '../../reducer/action'
import { reducer } from '../../reducer/reducer'

export const syncReactToLocal = (handleNewTodos: HandleNewTodos, actionSyn: actionSyn) => {
  const todosString = localStorage.getItem('todos')
  const todosObj = JSON.parse(todosString || '[]')

  if (actionSyn.type === 'todo') {
    const newTodosObj = handleNewTodos(todosObj, actionSyn.payload)
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
  }
  if (actionSyn.type === 'finish') {
    const newTodosObj = handleNewTodos(todosObj, actionSyn.payload)
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
  }
  if (actionSyn.type === 'delete') {
    const newTodosObj = handleNewTodos(todosObj, actionSyn.payload)
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
  }
  if (actionSyn.type === 'checkbox') {
    const newTodosObj = handleNewTodos(todosObj, actionSyn.payload)
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
  }
}

export default function Todolist() {
  const [state, dispatch] = useReducer(reducer, initialArg)
  const doneTodos = state.todos.filter((todo: Todo) => todo.done)
  const notDoneTodos = state.todos.filter((todo: Todo) => !todo.done)

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    dispatch(AddTodoAction(todo))
  }
  const startEditTodo = (id: string) => {
    const findTodo = state.todos.find((todo: Todo) => todo.id === id)
    if (findTodo) {
      dispatch(StartEditTodo(findTodo))
    }
  }

  //******* Notice That : setting attribute same name*** */
  const editTodo = (value: string) => {
    const editTodo = { ...(state.currentTodo as Todo), name: value }
    dispatch(EditTodo(editTodo))
  }

  const finishEdit = () => {
    dispatch(FinishEdit())
  }
  const deleteTodo = (id: string) => {
    dispatch(DeleteTodo(id))
  }
  const onChangeCheckBox = (id: string, done: boolean) => {
    dispatch(OnChangeCheckBox({ id: id, done: done }))
  }

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    dispatch(SetTodos(todosObj))
  }, [])
  return (
    <div>
      <div className={styles.todoList}>
        <div className={styles.todoListContainer}>
          <Taskinput currentTodo={state.currentTodo} addTodo={addTodo} editTodo={editTodo} finishEdit={finishEdit} />
          <Tasklist
            todos={notDoneTodos}
            startEditTodo={startEditTodo}
            deleteTodo={deleteTodo}
            onChangeCheckBox={onChangeCheckBox}
          />
          <Tasklist
            doneTaskList
            todos={doneTodos}
            startEditTodo={startEditTodo}
            deleteTodo={deleteTodo}
            onChangeCheckBox={onChangeCheckBox}
          />
        </div>
      </div>
    </div>
  )
}

// 270 line
