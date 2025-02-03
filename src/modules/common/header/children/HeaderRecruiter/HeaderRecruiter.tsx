import { ENV } from "@app/constants";
import { RecruiterMenuDrawer } from "@app/modules/common/drawer/RecruiterMenuDrawer";

const HeaderRecruiter = () => {
  return (
    <header className="w-screen bg-white py-5 px-3 flex items-center">
      <section className="flex-1 pl-2 flex gap-2 items-center">
        <RecruiterMenuDrawer />
        <h2>
          {ENV.APP_NAME}
        </h2>
      </section>
    </header>
  )
}

export default HeaderRecruiter;
