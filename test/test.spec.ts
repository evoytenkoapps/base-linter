import { RuleTester } from "@typescript-eslint/rule-tester";
import { rules } from "../src";

const ruleTester = new RuleTester();

// передаем название правила, само правило, тесты
ruleTester.run("check-length", rules["check-length"], {
  // успешный тест
  valid: [
    {
      code: `someFunction('123');`,
    },
  ],
  // не успешный тест
  invalid: [
    // тест аргумента по умолчанию
    {
      code: `someFunction('e');`,
      errors: [
        {
          messageId: "someError",
        },
      ],
      output: `someFunction('e+');`,
    },
    // тест аргумента переданного в options
    {
      code: `someFunction('1234');`,
      errors: [
        {
          messageId: "someError",
        },
      ],
      options: [{ min: 5 }],
      output: `someFunction('1234+');`,
    },
  ],
});
