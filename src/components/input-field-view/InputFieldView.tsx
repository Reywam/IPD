import * as React from "react";
import "./InputFieldView.scss";
import { IInputFieldViewProps } from "./IInputFieldViewProps";
import { SFC } from "react";
import { observer } from "mobx-react";
import * as classNames from "classnames";

export const InputFieldView = observer<SFC<IInputFieldViewProps>>((
    {
        type,
        placeholder,
        isReadonly,
        isRequired,
        isClear,
        value,
        className,
        maxLength,
        error,
        isFocused,
        onChange,
        onBlur,
        onFocus
    }) => {
    return (
        <div className={classNames("input", className)}>
            <input
                type={type}
                readOnly={isReadonly}
                className={classNames("input__field", error !== "" && isFocused && "input__field--error")}
                required={isRequired}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={maxLength}
                value={value}
            />
            <div
                className={"input__placeholder"}
                data-focused={isFocused}
            >
                {placeholder}
                {isRequired && <span className={"required"}>*</span>}
                {error !== "" && isFocused && <span className="error">{`(${error})`}</span>}
            </div>

        </div>
    );
});
