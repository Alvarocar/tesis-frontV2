import { TMiddlewareComponent } from "./middleware";


export type TSchemaRouter = {
  path: string;
  component: React.ComponentType<any>;
  middleware: Array<TMiddlewareComponent>;
}