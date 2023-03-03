import { Todo } from '../@types/todo.type'

export type stateType = {
  todos: Todo[]
  currentTodo: Todo | null
}
export type HandleNewTodos =
  // | ((todos: Todo[]) => Todo[])
  | ((todos: Todo[], todo: Todo) => Todo[])
  | ((todos: Todo[], todo: Todo) => Todo[])
  | ((todos: Todo[], todo: Todo) => Todo[])

export type setTodosAction = { type: 'set_Todos'; payload: Todo[] }
export type addTodoAction = { type: 'add_todo'; payload: Todo }
export type startEditTodoAction = { type: 'startEdit_todo'; payload: Todo }
export type editTodoAction = { type: 'edit_todo'; payload: Todo }
export type finishEditAction = { type: 'finishEdit' }
export type deleteTodoAction = { type: 'deleteTodo'; payload: string }
export type onChangeCheckBoxAction = { type: 'onChangeCheckBox'; payloadCB: { id: string; done: boolean } }
export type ActionType =
  | setTodosAction
  | addTodoAction
  | startEditTodoAction
  | editTodoAction
  | finishEditAction
  | deleteTodoAction
  | onChangeCheckBoxAction

/***** ACTION FOR HANDLER *****/
export type actionSyn =
  | { type: 'todo'; payload: Todo }
  | { type: 'finish'; payload: Todo }
  | { type: 'delete'; payload: Todo }
  | { type: 'checkbox'; payload: Todo }
/***** END *****/

export const initialArg: stateType = {
  todos: [],
  currentTodo: null
}

export const SetTodos = (payload: Todo[]) => {
  return { type: 'set_Todos', payload } as setTodosAction
}

export const AddTodoAction = (payload: Todo) => {
  return { type: 'add_todo', payload } as addTodoAction
}
export const StartEditTodo = (payload: Todo) => {
  return { type: 'startEdit_todo', payload } as startEditTodoAction
}
export const EditTodo = (payload: Todo) => {
  return { type: 'edit_todo', payload } as editTodoAction
}

export const FinishEdit = () => {
  return { type: 'finishEdit' } as finishEditAction
}
// export const DeleteTodo = (payload: Todo[]) => {
//   return { type: 'deleteTodo', payload } as deleteTodo
// }
export const DeleteTodo = (payload: string) => {
  return { type: 'deleteTodo', payload } as deleteTodoAction
}
// export const OnChangeCheckBox = (payload: Todo[]) => {
//   return { type: 'onChangeCheckBox', payload } as onChangeCheckBox
// }

// export const OnChangeCheckBox = (payload: { id: string; done: boolean }) => {
//   return { type: 'onChangeCheckBox', payload } as onChangeCheckBox
// }
export const OnChangeCheckBox = (payloadCB: { id: string; done: boolean }) => {
  return { type: 'onChangeCheckBox', payloadCB } as onChangeCheckBoxAction
}
