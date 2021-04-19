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
          ` ${label} - обязательное поле`}

        {errors[label] &&
          errors[label].type === 'maxLength' &&
          `${label} - максимум ${rules.maxLength} символа.`}

        {errors[label] &&
          errors[label].type === 'minLength' &&
          `${label} - минимум ${rules.minLength} символа.`}

        {errors[label] &&
          errors[label].type === 'pattern' &&
          `${label} - неправильный формат.`}
      </p>
    </Fragment>
  );
};
export default TextField;
