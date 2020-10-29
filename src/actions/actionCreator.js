export function defaultActionCreator(type, ...argNames) {
    return function (...args) {
        const action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    }
}

export function advancedActionCreator(type, definedValuesObj, ...argNames) {
    return function (...args) {
        const action = { type, ...definedValuesObj };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    }
}