import { TMiddlewareComponent } from "./middleware";


export type TSchemaRouter = {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  middleware: Array<TMiddlewareComponent>;
}