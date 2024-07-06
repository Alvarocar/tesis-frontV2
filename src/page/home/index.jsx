import { PublicTemplate } from "@app/template/PublicTemplate";
import { default as Home } from "./Home";

export function Component() {
  return (
    <PublicTemplate>
      <Home />
    </PublicTemplate>
  );
}
