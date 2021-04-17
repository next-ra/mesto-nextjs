import styles from './text-field.module.css';

const TextField = ({
  label,
  register,
  rules,
  placeholder,
  errors,
  name,
  type,
}) => {
  return (
    <div className={styles.control}>
      <label htmlFor={name}>{label}</label>
      <input
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
    </div>
  );
};
export default TextField;
