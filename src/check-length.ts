import { TSESLint } from "@typescript-eslint/utils";

export const rule: TSESLint.RuleModule<"someError"> = {
  defaultOptions: [],
  // информация о правиле
  meta: {
    // типы "problem", "suggestion" или "layout"
    type: "suggestion",
    // правило может менять код
    fixable: "code",
    // тут описываются аргументы правила
    schema: undefined,
    // текст ошибки при репорте
    messages: {
      someError: "Нельзя использовать null assert",
    },
  },
  // тело правила
  create(context) {
    return {
      JSXOpeningElement(node: any) {
        const attributes = node.attributes;
        if (attributes) {
          attributes.forEach((attribute) => {
            const value = attribute?.value;
            const expression = value?.expression;
            const obj = expression?.object;
            if (obj?.type === "TSNonNullExpression") {
              const loc = {
                line: obj.loc.start.line,
                column: obj.loc.end.column - 1,
              };

              const range = obj.expression.range;

              context.report({
                loc: loc,
                messageId: "someError",
                // фикс кода
                fix: (fixer) => {
                  return fixer.replaceTextRange([range[1], range[1] + 1], "?");
                },
              });
            }
          });
        }
      },
    };
  },
};
