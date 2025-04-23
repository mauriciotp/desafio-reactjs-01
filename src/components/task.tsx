import { FaRegTrashAlt } from 'react-icons/fa'

interface TaskProps {
  content: string
  finishedAt: Date | null
  onFinishTask: () => void
  onDeleteTask: () => void
}

export function Task({
  content,
  finishedAt,
  onFinishTask,
  onDeleteTask,
}: TaskProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg bg-gray-500 p-4">
      <div className="grow">
        <label className="flex gap-3 text-sm">
          <input
            type="checkbox"
            name="task"
            checked={finishedAt ? true : false}
            onChange={onFinishTask}
            className="peer relative size-5 cursor-pointer appearance-none rounded-full border-2 border-blue-500 transition before:absolute before:top-0.5 before:left-[5px] before:h-2.5 before:w-1.5 before:scale-0 before:rotate-45 before:border-r-2 before:border-b-2 before:content-[''] checked:border-purple-600 checked:bg-purple-600 checked:before:scale-100 not-checked:hover:border-blue-600 not-checked:hover:bg-blue-600/10 focus:shadow-none focus:outline-none"
          />
          <span className="max-w-[600px] break-words peer-checked:text-gray-300 peer-checked:line-through">
            {content}
          </span>
        </label>
      </div>
      <button
        onClick={onDeleteTask}
        className="group cursor-pointer rounded-sm p-2 transition hover:bg-gray-400"
      >
        <FaRegTrashAlt
          size={16}
          className="text-gray-300 transition group-hover:text-red-500"
        />
      </button>
    </div>
  )
}
