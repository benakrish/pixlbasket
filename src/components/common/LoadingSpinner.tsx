import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'light' | 'dark';
  fullPage?: boolean;
  text?: string;
}

export const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  fullPage = false,
  text
}: LoadingSpinnerProps) => {
  const containerClassName = `spinner-container ${fullPage ? 'full-page' : ''}`;
  const spinnerClassName = `spinner spinner-${size} spinner-${color}`;

  return (
    <div className={containerClassName}>
      <div className={spinnerClassName}></div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};
