import { IoMdAddCircleOutline } from 'react-icons/io'
import Rocket from './assets/rocket.svg'
import Clipboard from './assets/clipboard.svg'
import { Task } from './components/task'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface Task {
  content: string
  finishedAt: Date | null
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks')

    return storedTasks ? JSON.parse(storedTasks) : []
  })

  const [formData, setFormData] = useState({
    task: '',
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const finishedTasks = tasks.filter((task) => task.finishedAt !== null)

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setTasks([
      ...tasks,
      {
        content: formData.task,
        finishedAt: null,
      },
    ])
    setFormData({
      task: '',
    })
  }

  function handleFinishTask(taskIndexToFinish: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task, index) => {
        if (index !== taskIndexToFinish) {
          return task
        }

        return {
          ...task,
          finishedAt: task.finishedAt ? null : new Date(),
        }
      }),
    )
  }

  function handleDeleteTask(taskIndexToDelete: number) {
    setTasks((prevTasks) =>
      prevTasks.filter((_, index) => index !== taskIndexToDelete),
    )
  }

  return (
    <main>
      <header className="flex h-[200px] items-center justify-center bg-gray-700">
        <div className="flex items-center gap-3">
          <img src={Rocket} alt="Rocket logo" />
          <div className="text-[40px] [&_strong]:font-black">
            <strong className="text-blue-500">to</strong>
            <strong className="text-purple-600">do</strong>
          </div>
        </div>
      </header>
      <form className="mx-auto max-w-[736px]" onSubmit={handleCreateTask}>
        <div className="-mt-[calc(54px/2)] mb-16 flex h-[54px] items-center gap-2">
          <input
            className="grow rounded-lg border border-gray-700 bg-gray-500 p-4"
            type="text"
            name="task"
            required
            onChange={handleChangeInput}
            value={formData.task}
            placeholder="Adicione uma nova tarefa"
          />
          <button
            type="submit"
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 p-4 transition hover:bg-blue-500"
          >
            Criar
            <IoMdAddCircleOutline size={20} />
          </button>
        </div>
        <div>
          <header className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-bold text-blue-500">Tarefas criadas</p>
              <span className="rounded-xl bg-gray-400 px-3 font-bold text-gray-200">
                {tasks.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-purple-500">Concluídas</p>
              <span className="rounded-xl bg-gray-400 px-3 font-bold text-gray-200">
                {finishedTasks.length}
              </span>
            </div>
          </header>
          <div className="flex flex-col gap-4">
            {tasks ? (
              tasks.map((task, index) => (
                <Task
                  key={task.content}
                  content={task.content}
                  finishedAt={task.finishedAt}
                  onFinishTask={() => handleFinishTask(index)}
                  onDeleteTask={() => handleDeleteTask(index)}
                />
              ))
            ) : (
              <div className="flex flex-col items-center rounded-lg border-t border-t-gray-400 px-4 pt-16 [&_p]:text-gray-300">
                <img src={Clipboard} alt="Clipboard logo" />
                <p className="font-bold">
                  Você ainda não tem tarefas cadastradas
                </p>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </main>
  )
}

export default App
