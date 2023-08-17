import { RuleTester } from "@typescript-eslint/rule-tester";
import { rule } from "./src/check-length";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
});

ruleTester.run("nonnull", rule, {
  valid: [
    {
      code: `function App() {
  const data: undefined | { data: string } = f1();
  return (
    <div>
      <Welcome name={data!.data} />
    </div>
  );
}`,
    },
  ],

  invalid: [
    {
      code: `function App() {
  const data: undefined | { data: string } = f1();
  return (
    <div>
      <Welcome name={data!.data} />
    </div>
  );
}`,
      errors: [
        {
          messageId: "someError",
        },
      ],
    },
  ],
});
