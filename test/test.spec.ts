import { RuleTester } from "@angular-eslint/utils";
import { rule } from "../src/async-assert";

const ruleTester = new RuleTester({
  parser: "@angular-eslint/template-parser",
});

const validCode = `<ng-container *ngIf="(accounts$ | async)?.status === 'COMPLETE'"></ng-container>`;

// @ts-ignore
ruleTester.run("async-assert", rule, {
  valid: [
    {
      code: validCode,
    },
  ],
  invalid: [
    {
      code: `<ng-container *ngIf="(accounts$ | async)!.status === 'COMPLETE'"></ng-container>`,
      errors: [
        {
          messageId: "someError",
        },
      ],
      output: validCode,
    },
    {
      code: `<div></div>
<ng-container *ngIf="(accounts$ | async)!.status === 'COMPLETE'"></ng-container>`,
      errors: [
        {
          messageId: "someError",
        },
      ],
      output:
        `<div></div>
` + validCode,
    },
  ],
});
