import { RouteComponentProps } from 'wouter'

export type TMiddlewareComponent = React.ComponentType<RouteComponentProps<{
  [param: number]: string | undefined;
}> & { children: React.ReactElement; } >;
