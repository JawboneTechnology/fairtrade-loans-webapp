import {
    useRef,
    useState,
    useEffect,
    FocusEvent,
    ChangeEvent,
    KeyboardEvent,
  } from "react";
  
  interface ChatInputProps {
    value: string;
    onChange: (event: ChangeEvent<{ value: string }>) => void;
    onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
    inputSize?: string;
    placeholder?: string;
    maxHeight?: string;
    className?: string;
  }
  
  const TextareaInput = ({
    value,
    onChange,
    onFocus,
    className,
    maxHeight = "200px",
    inputSize = "100%",
    placeholder = "Type your message...",
  }: ChatInputProps) => {
    const inputRef = useRef<HTMLDivElement | null>(null);
    const [isFocused, setIsFocused] = useState(false);
  
    // Handle input change
    const onInputChange = () => {
      if (inputRef.current) {
        const htmlContent = inputRef.current.innerHTML;
        onChange({ target: { value: htmlContent } } as ChangeEvent<{
          value: string;
        }>);
        adjustHeight();
      }
    };
  
    // Adjust the height of the input
    const adjustHeight = () => {
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      }
    };
  
    // Sync the inner content with the value prop
    useEffect(() => {
      if (inputRef.current && inputRef.current.innerHTML !== value) {
        inputRef.current.innerHTML = value;
        adjustHeight();
      }
    }, [value]);
  
    const handleKeyDown = (ev: KeyboardEvent<HTMLDivElement>) => {
      if (ev.key === "Enter" && !ev.shiftKey) {
        ev.preventDefault();
        document.execCommand("insertParagraph", false);
      }
    };
  
    const handleFocus = (e: FocusEvent<HTMLDivElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
    };
  
    return (
      <div className="relative flex-grow">
        {!value && !isFocused && (
          <div
            className="absolute inset-0 px-4 py-3 text-gray-400 pointer-events-none text-sm"
            style={{ maxWidth: inputSize }}
          >
            {placeholder}
          </div>
        )}
        <div
          ref={inputRef}
          contentEditable
          className={`${className} w-full h-[100px] outline-none border border-gray-200 rounded-md p-3 placeholder:text-sm`}
          onInput={onInputChange}
          onKeyDown={handleKeyDown}
          suppressContentEditableWarning={true}
          style={{
            maxHeight: maxHeight,
            overflowY: "auto",
            maxWidth: inputSize,
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    );
  };
  
  export default TextareaInput;
  