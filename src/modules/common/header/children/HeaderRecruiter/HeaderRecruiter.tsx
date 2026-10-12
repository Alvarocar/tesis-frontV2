import { RecruiterMenuDrawer } from "@app/modules/common/drawer/RecruiterMenuDrawer";
import { AccountOptionsDropDown } from "../AccountOptionsDropDown";
import { JobSearch } from "@app/modules/job/JobSearch";
import { AppTitle } from "@app/modules/common/AppTitle";

interface HeaderRecruiterProps {
  hideSearch?: boolean;
}

const HeaderRecruiter = ({ hideSearch }: HeaderRecruiterProps) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/80 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-brand focus:px-3 focus:py-1.5 focus:text-on-brand"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <RecruiterMenuDrawer />
        <AppTitle />
        {!hideSearch ? (
          <JobSearch className="mx-auto max-w-xl flex-1" />
        ) : (
          <div className="flex-1" />
        )}
        <div className="flex items-center gap-2">
          <AccountOptionsDropDown />
        </div>
      </div>
    </header>
  );
};

export default HeaderRecruiter;
