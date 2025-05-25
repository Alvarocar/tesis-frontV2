import { JobList } from "@app/modules/job/JobList";
import { Header } from "@app/modules/common/header";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <JobList />
    </div>
  )
}

export default Home;
