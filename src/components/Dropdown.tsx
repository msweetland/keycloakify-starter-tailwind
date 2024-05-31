import React, {KeyboardEvent, MouseEvent as ReactMouseEvent, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown, faCheck} from '@fortawesome/free-solid-svg-icons';

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

  const toggleDropdown = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`dropdown ${dropdownClassName}`}>
      <button
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`btn m-1 flex items-center ${buttonClassName}`}
        onKeyDown={handleKeyDown}
      >
        {buttonIconLeft && <span className="mr-2">{buttonIconLeft}</span>}
        <span>{itemTransformer ? itemTransformer(selectedItem) : selectedItem}</span>
        <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
      </button>
      <div className={`dropdown-content z-[1] menu mr-1 mt-1 shadow bg-base-100 rounded-box w-52 p-2 max-h-80 ${dropdownBodyClassName} ${isOpen ? "" : "hidden"}`}>
        <div className="overflow-y-scroll scrollbar scrollbar-track-rounded-full scrollbar-track-base-100 scrollbar-thumb-base-content pr-2">
          <ul role="menu" aria-label="Dropdown list">
            {items.map((item, index) => (
              <li key={index} role="menuitem">
                <button
                  ref={el => (itemRefs.current[index] = el)}
                  onClick={e => handleItemClick(item, e)}
                  onMouseMove={() => setHighlightedIndex(index)}
                  className={`btn btn-ghost w-full text-left flex items-center justify-between hover:bg-transparent ${
                    highlightedIndex === index ? 'btn-active hover:btn-active' : ''
                  } ${itemButtonClassName}`} // Added padding-right
                  onMouseDown={e => e.preventDefault()}
                  tabIndex={-1}
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
