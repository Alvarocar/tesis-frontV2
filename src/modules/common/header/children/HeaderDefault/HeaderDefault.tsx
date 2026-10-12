import { Link } from "wouter";
import { JobSearch } from "@app/modules/job/JobSearch";
import { AppTitle } from "@app/modules/common/AppTitle";
import { Button } from "@app/components/ui/button";

interface HeaderDefaultProps {
  hideSearch?: boolean;
}

const HeaderDefault = ({ hideSearch }: HeaderDefaultProps) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/80 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-brand focus:px-3 focus:py-1.5 focus:text-on-brand"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <AppTitle />
        {!hideSearch ? <JobSearch className="mx-auto max-w-xl flex-1" /> : <div className="flex-1" />}
        <nav aria-label="Cuenta" className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/sign-in">Ingresar</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/sign-up">Registrarse</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default HeaderDefault;
