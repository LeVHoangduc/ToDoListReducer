import { useState } from 'react'
import styles from './taskinput.module.scss'
import { Todo } from '../../@types/todo.type'

interface TaskinputProps {
  currentTodo: Todo | null
  addTodo: (name: string) => void
  editTodo: (value: string) => void
  finishEdit: () => void
}
export default function Taskinput(props: TaskinputProps) {
  const { currentTodo, addTodo, editTodo, finishEdit } = props
  const [name, setName] = useState<string>('')
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTodo) {
      editTodo(event.target.value)
    }
    setName(event.target.value)
  }
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEdit()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }
  return (
    <div className='mb-2'>
      {/* <Title address={address} /> */}
      <h1 className={styles.title}>To do list</h1>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : name}
          // value={name}
          onChange={handleOnChange}
        />
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}
