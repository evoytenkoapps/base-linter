import { Rule } from "eslint";
import { TSESTree } from "@typescript-eslint/typescript-estree";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Check for missing unhandledRejection event subscription",
      category: "Best Practices",
      recommended: true,
    },
    messages: {
      someError: "Нельзя использовать nonull assert в шаблоне",
    },
    schema: [
      {
        type: "object",
        properties: {
          filename: {
            type: "string",
          },
        },
        additionalProperties: false,
      },
    ],
    fixable: null, // We won't provide an automatic fix
  },
  create(context) {
    const filenameToCheck = context.options[0]?.filename;

    return {
      Program(node: TSESTree.Program) {
        const filename = context.getFilename();
        if (filename !== filenameToCheck) {
          return; // Skip files that are not the target
        }

        let hasUnhandledRejectionListener = false;

        node.body.forEach((statement) => {
          if (
            statement.type === "ExpressionStatement" &&
            statement.expression.type === "CallExpression"
          ) {
            const callee = statement.expression.callee;
            if (
              callee.type === "MemberExpression" &&
              callee.object.type === "Identifier" &&
              callee.object.name === "process" &&
              callee.property.type === "Identifier" &&
              callee.property.name === "on" &&
              statement.expression.arguments.length >= 2
            ) {
              const eventArg = statement.expression.arguments[0];
              if (
                eventArg.type === "Literal" &&
                typeof eventArg.value === "string" &&
                eventArg.value === "unhandledRejection"
              ) {
                hasUnhandledRejectionListener = true;
              }
            }
          }
        });

        if (!hasUnhandledRejectionListener) {
          context.report({
            node,
            messageId: "someError",
          });
        }
      },
    };
  },
};

export = rule;
