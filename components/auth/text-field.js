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
        placeholder={placeholder}
        type={type}
        {...register(label, { ...rules })}
      />
      {errors[label] && errors[label].type === 'required' && (
        <p className={styles.error}>{label} - обязательное поле.</p>
      )}
      {errors[label] && errors[label].type === 'maxLength' && (
        <p className={styles.error}>
          {label} - максимум {rules.maxLength} символа.
        </p>
      )}
      {errors[label] && errors[label].type === 'minLength' && (
        <p className={styles.error}>
          {label} - минимум {rules.minLength} символа.
        </p>
      )}
      {errors[label] && errors[label].type === 'pattern' && (
        <p className={styles.error}>{label} - неправильный формат.</p>
      )}
    </div>
  );
};
export default TextField;
