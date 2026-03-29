import React from 'react';

interface ListItemProps {
  icon?: React.ReactNode;
  iconContainerClassName?: string;
  label: React.ReactNode;
  description?: string;
  href?: string;
  trailingContent?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  icon,
  iconContainerClassName,
  label,
  description,
  href,
  trailingContent,
  onClick,
  className = '',
}) => {
  const content = (
    <>
      {icon && (
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconContainerClassName}`}>
          {icon}
        </div>
      )}
      <div className="flex-1">
        <p className={`font-medium text-gray-900 dark:text-white ${description ? 'text-lg leading-tight' : ''}`}>{label}</p>
        {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
      </div>
      {trailingContent && (
        <div className="flex-shrink-0">{trailingContent}</div>
      )}
    </>
  );

  const baseClasses = `flex items-center gap-3 p-4 transition-colors ${className}`;
  const clickableClasses = `group hover:bg-gray-50 dark:hover:bg-gray-800/50`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${clickableClasses}`}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
        <button onClick={onClick} className={`${baseClasses} ${clickableClasses} w-full text-left`}>
            {content}
        </button>
    )
  }

  return <div className={baseClasses}>{content}</div>;
};
