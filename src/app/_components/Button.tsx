import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Props {
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit';
    children?: React.ReactNode;
    className?: string;
    variant?: 'square' | 'circle'
    customTheme?: boolean;
}

const Button: React.FC<Props> = ({
    disabled = false,
    onClick,
    type = 'button',
    children,
    className = '',
    variant = 'square',
    customTheme = false,
    ...rest
}) => {
    const { theme } = useTheme();
    const themeClass = theme === 'dark' ? 'bg-dark' : 'bg-light-100';
    const variantClass = variant === 'circle' ? 'rounded-full' : 'rounded-[20px]';

    return (
        <button
            type={type}
            className={`p-[13px] ${customTheme ? themeClass : ''} ${variantClass} ${className} transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button;