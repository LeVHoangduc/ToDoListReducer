import { handlerCheckBox } from './../handler/handler'
// import { handlerCheckBox } from './../handler/handler'
import { syncReactToLocal } from './../component/Todolist/Todolist'
import { Todo } from '../@types/todo.type'
import { ActionType, stateType } from './action'
import { handlerAddTodo, handlerDelete, handlerFinish } from '../handler/handler'

export const reducer = (state: stateType, action: ActionType) => {
  switch (action.type) {
    case 'set_Todos':
      return {
        ...state,
        todos: action.payload
      }
    case 'add_todo':
      syncReactToLocal(handlerAddTodo, { type: 'todo', payload: action.payload })
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case 'startEdit_todo': {
      return {
        ...state,
        currentTodo: action.payload
      }
    }
    case 'edit_todo':
      return {
        ...state,
        currentTodo: action.payload
      }
    case 'finishEdit':
      syncReactToLocal(handlerFinish, { type: 'finish', payload: state.currentTodo as Todo })
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === state.currentTodo?.id) return state.currentTodo as Todo
          return todo
        }),
        currentTodo: null
      }

    case 'deleteTodo':
      const currentTodoDelete = state.todos.find((todo) => todo.id === action.payload)
      syncReactToLocal(handlerDelete, { type: 'delete', payload: currentTodoDelete as Todo })
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        currentTodo: null
      }
    case 'onChangeCheckBox':
      const TodoCheckBox = state.todos.find((todo) => todo.id === action.payloadCB.id)
      syncReactToLocal(handlerCheckBox, {
        type: 'checkbox',
        payload: TodoCheckBox as Todo
      })
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payloadCB.id)
            return {
              ...todo,
              done: action.payloadCB.done
            }
          else {
            return todo
          }
        })
      }
    default:
      return state
  }
}
