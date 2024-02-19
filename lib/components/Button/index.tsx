import { ButtonHTMLAttributes, FC } from 'react';
import styles from './styles.module.css';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = '',
  ...props
}) => {
  return <button className={`${styles.button} ${className}`} {...props} />;
};
