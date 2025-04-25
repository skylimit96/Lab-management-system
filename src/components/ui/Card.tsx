import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  icon, 
  children, 
  footer,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      {(title || icon) && (
        <div className="px-4 py-3 border-b border-gray-100 flex items-center">
          {icon && <div className="mr-2">{icon}</div>}
          {title && <h3 className="font-medium text-gray-700">{title}</h3>}
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;