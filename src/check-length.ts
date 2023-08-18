import { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

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
      someError: "Нельзя использовать nonull assert в шаблоне",
    },
  },
  // тело правила
  create(context) {
    return {
      JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
        const attributes = node.attributes as TSESTree.JSXAttribute[];
        if (attributes) {
          attributes.forEach((attribute: TSESTree.JSXAttribute) => {
            const value = attribute.value as TSESTree.JSXExpressionContainer;
            const expression =
              value.expression as TSESTree.Expression as TSESTree.MemberExpression;
            const obj = expression?.object as TSESTree.TSNonNullExpression;
            if (obj?.type === AST_NODE_TYPES.TSNonNullExpression) {
              const loc = {
                line: obj.loc.start.line,
                column: obj.loc.end.column - 1,
              };

              const range: TSESTree.Range = obj.expression.range;

              context.report({
                loc: loc,
                messageId: "someError",
                // фикс кода
                fix: (fixer: TSESLint.RuleFixer) => {
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
