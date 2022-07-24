import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import s from "./SuperCheckbox.module.css";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (isDone: boolean) => void
    spanClassName?: string
    testOnChange?: (isDone: boolean) => void
    checked: boolean
};

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
        testOnChange,
        checked,
        disabled,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        if(onChangeChecked){
            onChangeChecked(e.currentTarget.checked)
        }
    }
    const finalInputClassName = `${s.checkbox} ${className ? className : ""}`;
    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ""}`

    return (

            <label className={s.form_control}>
                <input type="checkbox"
                       name="checkbox-checked"
                       checked={checked}
                       className={finalInputClassName}
                       disabled={disabled && disabled}
                       onChange={onChangeCallback}
                       {...restProps}
                />
                {children && <span className={finalSpanClassName}>{children}</span>}
            </label>



    );
}

export default SuperCheckbox;
