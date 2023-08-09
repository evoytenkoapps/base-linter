// https://eslint.org/docs/latest/extend/custom-rules
module.exports = {
  rules: {
    // название правила
    "check-length": {
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
          // селектор
          CallExpression(node) {
            const { callee } = node;
            const { arguments } = node;
            // логика правила, работа с js
            if (callee.name === "someFunction") {
              const argument = arguments[0].value;
              const firstArgument = arguments[0];
              const min = context.options[0]?.min || 2;
              if (argument.length < min) {
                context.report({
                  node,
                  // текст ошибки, свойство из meta.messages
                  messageId: "someError",
                  // фикс кода
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
  },
};
