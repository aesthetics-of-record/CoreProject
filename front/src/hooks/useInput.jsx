import {useState} from "react";

/**
 * input에 조건을 추가할 수 있는 hook
 * @param initialValue {string}
 * @param validator {callback}
 * @returns {{value: unknown, onChange: onChange}}
 */
export const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
        const value = event.target.value;
        let willUpdate = true;

        if (typeof validator === "function") {
            willUpdate = validator(value);
        }
        if (willUpdate) {
            setValue(value);
        }
    };

    return { value, onChange }; // 이거는 {value: value}를 줄여쓴거다.
};