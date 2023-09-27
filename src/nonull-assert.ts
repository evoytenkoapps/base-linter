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
      "JSXExpressionContainer > MemberExpression > TSNonNullExpression"(
        node: TSESTree.TSNonNullExpression
      ) {
        const loc = {
          line: node.loc.start.line,
          column: node.loc.end.column - 1,
        };

        const range: TSESTree.Range = node.expression.range;

        context.report({
          loc: loc,
          messageId: "someError",
          // фикс кода
          fix: (fixer: TSESLint.RuleFixer) => {
            return fixer.replaceTextRange([range[1], range[1] + 1], "?");
          },
        });
      },
    };
  },
};
