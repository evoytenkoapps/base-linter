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
          const jsxElement = children.find(
            (el) => el.type === "JSXElement" && el?.openingElement
          );

          if (jsxElement) {
            const x = jsxElement.openingElement;
            const attributes = x.attributes;
            const attribute = attributes[0];
            const value = attribute.value;
            const expression = value.expression;
            const obj = expression.object;
            if (obj?.type === "TSNonNullExpression") {
              const expr = obj.expression;
              const loc = {
                line: obj.loc.start.line,
                column: obj.loc.end.column - 1,
              };

              context.report({
                loc,
                messageId: "someError",
              });
            }
          }
        }
      },
    };
  },
};
