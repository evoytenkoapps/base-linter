import { TSESLint, TSESTree } from "@typescript-eslint/utils";

// пример правила берем от сюда https://typescript-eslint.io/custom-rules
// и от сюда https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin-template
export const rule: TSESLint.RuleModule<"someError"> = {
  meta: {
    messages: { someError: "Нельзя использовать ! в async" },
    type: "suggestion",
    fixable: "code",
    schema: undefined,
  },
  defaultOptions: [],
  create(
    context: Readonly<TSESLint.RuleContext<"someError", []>>
  ): TSESLint.RuleListener {
    // селектор https://eslint.org/docs/latest/extend/selectors
    return {
      "BoundAttribute[name=/^(ngIf)$/],[value=ASTWithSource]>[ast=Binary],[left=PropertyHead],[receiver=NonNullAssert],[type=NonNullAssert]"(
        element: any
      ) {
        // на всякий случай фильтр, т.к. попадают родительские ноды
        if (element.type === "NonNullAssert") {
          const baseParent = element.parent.parent.parent.parent.parent;
          // вычисляем позицию символа, в которой будем менять символ
          const loc: TSESTree.Position = {
            line: baseParent.loc.start.line,
            column: element.sourceSpan.end - 1,
          };

          // TODO для дебага
          console.log(JSON.stringify(loc));

          // Сам репорт об ошибке
          context.report({
            messageId: "someError",
            loc,
            // фикс кода
            fix: (fixer: TSESLint.RuleFixer) => {
              const range: TSESTree.Range = [loc.column, loc.column + 1];
              const fixers: Array<TSESLint.RuleFix> = [
                fixer.replaceTextRange(range, "?"),
              ];
              return fixers;
            },
          });
        }
        // если другая нода element.type !== "NonNullAssert", то ничего и не делаем
      },
    };
  },
};
