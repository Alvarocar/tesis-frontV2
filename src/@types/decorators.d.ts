
export type TDecoratorContext = {
  kind: "method" | "class";
  name: string | symbol;
  access: { get(): unknown };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void
}