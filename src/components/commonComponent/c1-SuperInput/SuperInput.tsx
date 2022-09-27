import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
} from "react";
import s from "./SuperInput.module.css";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    value: string | number
    onChangeText: (value: any ) => void
    label: string
    onEnter?: () => void
    error?: string
    spanClassName?: string
    errorClassName?: string

};

const SuperInput: React.FC<SuperInputTextPropsType> = (props) => {
    const {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName, errorClassName,
        value, placeholder,
        label,
        ...restProps// все остальные пропсы попадут в объект restProps
    } = props


    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e); // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value);
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        e.key === "Enter" // если нажата кнопка Enter
        && onEnter // и есть пропс onEnter
        && onEnter(); // то вызвать его
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ""}`;
    const finalInputClassName = ` ${s.form__field} ${className} ${errorClassName}`; // need to fix with (?:) and s.superInput


    return (
        <div>
            <div className={s.form__group}>
                <input
                    type={type}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputClassName}
                    placeholder={placeholder || 'title'}
                    value={value}
                    onChange={onChangeCallback}/>
                <label className={value === '' ? s.form__label : s.form__label2}>{label || 'title'}</label>
            </div>
            {error && <span className={finalSpanClassName} style={{marginTop: '20px'}}>{error}</span>}
        </div>

    );
}

export default SuperInput;
