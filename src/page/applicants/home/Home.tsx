import classNames from "classnames/bind";
import { ApplicantTemplate } from "@app/template/ApplicantTemplate"
import { AuthSoft } from "../../../middlewares/authSoft.middelware";
import styles from "./Home.module.scss"
import { Drawer } from "@app/components/applicants/drawer";
import { useGetApplicantQuery } from "@app/store/features/applicant";
import JobCard from "@app/components/shared/JobCard/JobCard";
import { useGetJobsQuery } from "@app/store/features/job";

const cx = classNames.bind(styles)

const Home = () => {
  useGetApplicantQuery()
  const { data } = useGetJobsQuery({ page: 1, pageSize: 10 })

  return (
    <ApplicantTemplate>
      <main className={cx("home")}>
        <div className={cx("jobs")}>
          {data?.result?.map(job => (
            <div key={job.id}><JobCard {...job} /></div>
          ))}
        </div>
      </main>
    </ApplicantTemplate>
  )
}

Home.propTypes = {}

export const Component = () => {
  return (
    <AuthSoft userType="applicant">
      <Home />
    </AuthSoft>
  );
};
