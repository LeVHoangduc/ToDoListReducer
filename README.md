# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Đưa dữ liệu lên LocalStorage

### Way 1 : chưa phân tách các file handler và action

### File todolist.tsx :

```javascript
export const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const todosString = localStorage.getItem('todos')
  const todosObj = JSON.parse(todosString || '[]')
  const newTodosObj = handleNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}
```

### File action.ts :

```javascript
export type HandleNewTodos = ((todos: Todo[]) => Todo[]) | ((todos: Todo[], todo: Todo) => Todo[])
```

### File reducer.ts : bao gồm những handler

```javascript
// ****** ADD TODO *******
const handler = (TodoObj: Todo[]) => {
  return [...TodoObj, action.payload]
}
syncReactToLocal(handler)
// ****** FINISH EDIT TODO ******
const handlerFinish = (todosObj: Todo[]) => {
  return todosObj.map((todo) => {
    if (todo.id === state.currentTodo?.id) return state.currentTodo as Todo
    return todo
  })
}
```

### Note :

**I.**

```javascript
const handlerDelete = (TodoObj: Todo[]) => {
  return TodoObj.filter((todo: Todo) => todo.id !== id)
}
syncReactToLocal(handlerDelete)
```

Xử lí lưu dữ liệu lên localStorage của method Delete, thì function handler() nằm ở file todolist.tsx thay vì nằm ở file reducer.ts như các method khác !!

**II.**

```javascript
export const handlerCheckBox = (TodoObj: Todo[], action: Todo) => {
  return TodoObj.map((todo: Todo) => {
    if (todo.id === action.id) {
      return { ...todo, done: !action.done } as Todo
    }
    return todo
  })
}

```

Vì bug của việc reducer hiện state prev của reducer , react . Nên trong câu điều kiện if thì nó trả về !action.done thay vì đúng logic đồng bộ sẽ là action.done .
