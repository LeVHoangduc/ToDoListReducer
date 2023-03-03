import { Todo } from './../@types/todo.type'

export const handlerAddTodo = (TodoObj: Todo[], action: Todo) => {
  return [...TodoObj, action]
}

export const handlerFinish = (todosObj: Todo[], action: Todo) => {
  return todosObj.map((todo) => {
    if (todo.id === action?.id) return action as Todo
    return todo
  })
}

export const handlerDelete = (TodoObj: Todo[], action: Todo) => {
  return TodoObj.filter((todo: Todo) => todo.id !== action.id)
}
export const handlerCheckBox = (TodoObj: Todo[], action: Todo) => {
  return TodoObj.map((todo: Todo) => {
    if (todo.id === action.id) {
      return { ...todo, done: !action.done } as Todo
    }
    return todo
  })
}
