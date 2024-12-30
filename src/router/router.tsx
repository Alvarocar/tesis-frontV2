import React from "react";
import { Route } from "wouter";
import { TSchemaRouter } from "@app/@types/schema";

const compound = (
  Page: TSchemaRouter["component"],
  middlewares: TSchemaRouter["middleware"],
  name: string
) => {
  const Component: React.FC = (props) =>
    middlewares.reduce((WrappedComponent, middleware) => {
      return React.createElement(middleware, {
        children: WrappedComponent,
        params: {},
        ...props,
      });
    }, React.createElement(Page));

  Component.displayName = name;
  return Component;
};

export const CustomRouter: React.FC<{ schema: TSchemaRouter[] }> = ({
  schema,
}) => {
  return (
    <>
      {schema.map(({ component, path, middleware }) => (
        <Route
          key={path}
          path={path}
          component={compound(component, middleware, path)}
        />
      ))}
    </>
  );
};
