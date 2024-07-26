import classNames from "classnames/bind";
import { ApplicantTemplate } from "@app/template/ApplicantTemplate"
import { AuthSoft } from "../../../middlewares/authSoft.middelware";
import styles from "./Home.module.scss"
import { Drawer } from "@app/components/applicants/drawer";
import { useGetApplicantQuery } from "@app/store/features/applicant";

const cx = classNames.bind(styles)

const Home = () => {
  useGetApplicantQuery()
  return (
    <ApplicantTemplate>
      <main className={cx("home")}>

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
