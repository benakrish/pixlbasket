import { ReactNode, ButtonHTMLAttributes } from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const classNames = [
    'button',
    `button-${variant}`,
    `button-${size}`,
    fullWidth ? 'button-full-width' : '',
    isLoading ? 'button-loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={classNames} 
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="button-spinner" />}
      {icon && <span className="button-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
