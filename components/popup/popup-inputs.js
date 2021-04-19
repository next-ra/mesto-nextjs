import { Fragment } from 'react';
import styles from './popup-inputs.module.css';
const TextField = ({
  label,
  register,
  rules,
  placeholder,
  errors,

  type,
}) => {
  return (
    <Fragment>
      <input
        className={styles.input}
        style={{ borderLeft: errors[label] ? '10px solid red' : '' }}
        autoComplete="off"
        placeholder={placeholder}
        type={type}
        {...register(label, { ...rules })}
      />
      <p className={styles.error}>
        {errors[label] &&
          errors[label].type === 'required' &&
          ` ${placeholder} - обязательное поле`}

        {errors[label] &&
          errors[label].type === 'maxLength' &&
          `${placeholder} - максимум ${rules.maxLength} символа.`}

        {errors[label] &&
          errors[label].type === 'minLength' &&
          `${placeholder} - минимум ${rules.minLength} символа.`}

        {errors[label] &&
          errors[label].type === 'pattern' &&
          `${placeholder} - неправильный формат.`}
      </p>
    </Fragment>
  );
};
export default TextField;
