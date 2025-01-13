import { Card } from "@app/modules/common/card";
import { RecruiterForm } from "@app/modules/signin/Recruiter/RecruiterForm";

const Recruiter = () => {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <Card>
        <RecruiterForm />
      </Card>
    </div>
  );
};

export default Recruiter;
