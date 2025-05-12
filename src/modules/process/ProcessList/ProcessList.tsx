import { TApplicationVacantOverview } from "@app/@types/vacant"
import { ProcessCard } from "../ProcessCard"
import classNames from "classnames"

type Props = {
  data: TApplicationVacantOverview[]
  className?: string
}

const ProcessList = ({ data, className }: Props) => {
  return (
    <ul className={classNames("max-w-[40rem] m-4 md:mx-auto flex flex-col gap-4",className)}>
    {data.map(process => <li key={process.id}>
      <ProcessCard process={process} />
    </li>)}
    </ul>
  )
}

export default ProcessList;

