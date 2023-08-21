import { TSESLint } from "@typescript-eslint/utils";

export const rules: {
  "check-length": TSESLint.RuleModule<"someError", { min: number }[]>;
} = {
  "check-length": {
    defaultOptions: [],
    // информация о правиле
    meta: {
      // типы "problem", "suggestion" или "layout"
      type: "suggestion",
      // правило может менять код
      fixable: "code",
      // тут описываются аргументы правила
      schema: [
        {
          type: "object",
          properties: {
            min: {
              type: "number",
            },
          },
          additionalProperties: false,
        },
      ],
      // текст ошибки при репорте
      messages: {
        someError: "Длина аргумента функции должна быть больше",
      },
    },
    // тело правила
    create(context) {
      return {
        CallExpression(node: any) {
          const { callee } = node;
          //const { arguments } = node;
          if (callee.name === "someFunction") {
            const argument = node.arguments[0].value;
            const firstArgument = node.arguments[0];
            // @ts-ignore
            const min = context.options[0]?.min || 2;
            if (argument.length < min) {
              context.report({
                node,
                messageId: "someError",
                fix(fixer) {
                  return fixer.insertTextAfterRange(
                    [firstArgument.range[0], firstArgument.range[1] - 1],
                    "+"
                  );
                },
              });
            }
          }
        },
      };
    },
  },
};
