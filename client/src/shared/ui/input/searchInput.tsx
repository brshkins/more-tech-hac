import { Search } from "lucide-react";
import { InputHTMLAttributes, forwardRef } from "react";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
  iconClassName?: string;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    { className = "", containerClassName = "", iconClassName = "", ...props },
    ref
  ) => {
    return (
      <div className={`relative rounded-xl ${containerClassName}`}>
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 ${iconClassName}`}
        />
        <input
          ref={ref}
          type="text"
          className={`pl-10 pr-4 py-2 w-full placeholder:text-[13px] text-[13px] text-zinc-300 rounded-xl  bg-gray-mode-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent ${className}`}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
