import { JobCard } from "../JobCard";

const cards = new Array(8).fill(JobCard)

const JobList = () => {
  return (
    <div className="max-w-screen-2xl min-w- mx-auto grid gap-y-10 gap-x-5 justify-center py-10 px-5 grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] ">
      {cards.map((Card, index) => <Card key={index} className="justify-self-center" />)}
    </div>
  )
}

export default JobList;
