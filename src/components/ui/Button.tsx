import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface BaseButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
}

type ButtonAsButton = BaseButtonProps & {
  href?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = BaseButtonProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  href,
  ...props
}: ButtonProps) {
  const classNames = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;

  if (href) {
    const linkProps = props as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
    return (
      <Link href={href} className={classNames} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={classNames}
      disabled={buttonProps.disabled || isLoading}
      {...buttonProps}
    >
      {isLoading ? <span className={styles.loader}></span> : null}
      <span className={isLoading ? styles.loadingText : ''}>{children}</span>
    </button>
  );
}
