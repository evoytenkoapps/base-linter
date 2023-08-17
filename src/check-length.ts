import { TSESLint } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/types";

export const rule: TSESLint.RuleModule<"someError", { min: number }[]> = {
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
      JSXElement(node: any) {
        const children = node.children;
        if (children) {
          const jsxElement = children.find((el) => (el.type = "JSXElement"));
          const x = jsxElement;
        }
      },
    };
  },
};
