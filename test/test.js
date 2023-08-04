const { RuleTester } = require("eslint");
const rule = require("../src/check-length");

const ruleTester = new RuleTester();

// передаем название правила, само правило, тесты
ruleTester.run("check-length", rule.rules["check-length"], {
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
      errors: [rule.rules["check-length"].meta.messages.someError],
    },
    // тест аргумента переданного в options
    {
      code: `someFunction('1234');`,
      errors: [rule.rules["check-length"].meta.messages.someError],
      options: [{ min: 5 }],
    },
  ],
});
