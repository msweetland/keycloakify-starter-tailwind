import React, { KeyboardEvent, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';

interface DropdownProps {
  buttonIconLeft?: React.ReactNode;
  items: string[];
  onSelect: (item: string) => void;
  itemTransformer?: (item: string) => string;
  defaultSelectedItem?: string;
  dropdownClassName?: string;
  buttonClassName?: string;
  dropdownBodyClassName?: string;
  itemButtonClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
                                             buttonIconLeft,
                                             items,
                                             onSelect,
                                             itemTransformer,
                                             defaultSelectedItem,
                                             dropdownClassName,
                                             buttonClassName,
                                             dropdownBodyClassName,
                                             itemButtonClassName,
                                           }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultSelectedItem || items[0]);
  const [highlightedIndex, setHighlightedIndex] = useState(items.indexOf(defaultSelectedItem || items[0]));
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleDropdown = (e?: ReactMouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const handleItemClick = (item: string, e: ReactMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex(prevIndex => Math.min(prevIndex + 1, items.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex(prevIndex => Math.max(prevIndex - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        handleItemClick(items[highlightedIndex], event as unknown as ReactMouseEvent<HTMLButtonElement>);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleBlur = (event: React.FocusEvent) => {
    if (!dropdownRef.current?.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex]?.scrollIntoView({
        behavior: 'instant',
        block: 'nearest',
      });
    }
  }, [isOpen, highlightedIndex]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      itemRefs.current.forEach(ref => ref?.blur());
      setHighlightedIndex(items.indexOf(defaultSelectedItem || items[0]));
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`${dropdownClassName}`}>
      <button
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`py-2 px-3 flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-white/10 dark:hover:text-white ${buttonClassName} focus:outline-none focus:ring-0 focus:bg-gray-100 focus:text-gray-800 dark:focus:bg-white/10 dark:focus:text-white`}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      >
        {buttonIconLeft && <span className="mr-2">{buttonIconLeft}</span>}
        <span>{itemTransformer ? itemTransformer(selectedItem) : selectedItem}</span>
        <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
      </button>
      <div className={`flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 z-[1] menu mr-1 mt-1 bg-base-100 rounded-box w-52 p-2 max-h-80 ${dropdownBodyClassName} ${isOpen ? "" : "hidden"}`}>
        <div className="overflow-y-scroll scrollbar scrollbar-track-rounded-full dark:scrollbar-track-neutral-900 dark:scrollbar-thumb-gray-200 pr-2">
          <ul role="menu" aria-label="Dropdown list" className="flex flex-col space-y-1">
            {items.map((item, index) => (
              <li key={index} role="menuitem">
                <button
                  ref={el => (itemRefs.current[index] = el)}
                  onClick={e => handleItemClick(item, e)}
                  onMouseMove={() => setHighlightedIndex(index)}
                  onFocus={(_) => setHighlightedIndex(index)}
                  onBlur={handleBlur}
                  className={`w-full flex justify-between py-2 px-3 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-0 focus:bg-gray-100 focus:text-gray-800 dark:focus:bg-white/10 dark:focus:text-white ${
                    highlightedIndex === index ? 'bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800 dark:bg-white/10 dark:hover:bg-white/10 dark:text-white dark:hover:text-white' : ''
                  } ${itemButtonClassName}`} // Added padding-right
                  onMouseDown={e => e.preventDefault()}
                >
                  {itemTransformer ? itemTransformer(item) : item}
                  {selectedItem === item && <FontAwesomeIcon icon={faCheck} className="ml-2" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
