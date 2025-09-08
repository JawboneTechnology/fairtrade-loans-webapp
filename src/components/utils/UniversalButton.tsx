interface UniversalButtonProps {
  className: string;
  title: string | React.ReactNode;
  handleClick: () => void;
  isCustomIcon?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const UniversalButton = ({
  className,
  title,
  handleClick,
  isCustomIcon,
  icon = null,
  disabled = false,
}: UniversalButtonProps) => {
  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center justify-center gap-1 py-2 ${className} transform transition duration-300 ease-in-out`}
        disabled={disabled}
      >
        {icon && !isCustomIcon && <span>{icon}</span>}
        {title}
        {icon && isCustomIcon && <span>{icon}</span>}
      </button>
    </>
  );
};

export default UniversalButton;
