import { JobList } from "@app/modules/job/JobList";
import { Header } from "@app/modules/common/header";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1 focus:outline-none" tabIndex={-1}>
        <JobList />
      </main>
    </div>
  )
}

export default Home;
