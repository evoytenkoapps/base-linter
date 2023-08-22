import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../src";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
});

const filenameToCheck = "./file.ts"; // Adjust this to the actual path

ruleTester.run("check-unhandled-rejection", rule, {
  valid: [
    {
      code: `
        process.on("unhandledRejection", (reason, promise) => {
          console.error("Unhandled Rejection at:", promise, "reason:", reason);
        });
      `,
      filename: filenameToCheck,
    },
  ],
  invalid: [
    {
      code: `
        console.log("Some code here");
      `,
      filename: filenameToCheck,
      errors: [
        {
          messageId: "someError",
        },
      ],
      options: [
        {
          filename: "./file.ts", // Укажите фактический путь к файлу
        },
      ],
    },
    {
      code: `
        process.on("rejectionHandled", (promise) => {
          console.log("Rejection handled:", promise);
        });
      `,
      filename: filenameToCheck,
      errors: [
        {
          messageId: "someError",
        },
      ],
      options: [
        {
          filename: "./file.ts", // Укажите фактический путь к файлу
        },
      ],
    },
  ],
});
