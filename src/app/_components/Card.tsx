import { useTheme } from '@/context/ThemeContext';
import React, { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children}) => {
    const { theme } = useTheme();
    return (
        <div className={`${theme === 'dark' ? 'bg-dark' : 'bg-white'} ${className && className}`}>
            {children}
        </div>
    );
};

export default Card;
