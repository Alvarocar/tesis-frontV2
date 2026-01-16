import { Card } from "@app/modules/common/card";
import { Header } from "@app/modules/common/header";
import { RecruiterForm } from "@app/modules/signin/Recruiter/RecruiterForm";

const Recruiter = () => {
  return (
    <>
      <Header hideSearch />
      <div className="w-screen h-screen grid place-content-center">
        <Card>
          <RecruiterForm />
        </Card>
      </div>
    </>
  );
};

export default Recruiter;
