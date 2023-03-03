import { Todo } from '../../@types/todo.type'
import styles from './tasklist.module.scss'
interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  // handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
  onChangeCheckBox: (id: string, done: boolean) => void
}
export default function Tasklist(props: TaskListProps) {
  const { doneTaskList, todos, startEditTodo, deleteTodo, onChangeCheckBox } = props
  return (
    <div>
      <h2 className={styles.title}>{doneTaskList ? 'Done' : 'not done'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={todo.done}
              onChange={(event) => onChangeCheckBox(todo.id, event?.target.checked)}
            />
            <span
              className={`${styles.taskName}
             ${todo.done ? styles.taskNameDone : ''} `}
            >
              {todo.name}
            </span>
            <div className={styles.taskAction}>
              <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
                ✏️
              </button>
              <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
