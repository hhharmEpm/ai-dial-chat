import { IconChevronDown } from '@tabler/icons-react';
import { MouseEvent, useState } from 'react';

import classNames from 'classnames';

import { PublicationFunctions } from '@/src/types/publication';

import { Menu, MenuItem } from '../../Common/DropdownMenu';

import startCase from 'lodash-es/startCase';
import toLower from 'lodash-es/toLower';

interface FilterTypeProps {
  id: string;
  filters: string[];
  selectedFilter: string;
  capitalizeFirstLetters?: boolean;
  onChangeFilter: (filterType: PublicationFunctions) => void;
  className?: string;
}

export function RulesSelect({
  id,
  filters,
  selectedFilter,
  capitalizeFirstLetters,
  onChangeFilter,
  className,
}: FilterTypeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onChangeHandler = (e: MouseEvent<HTMLButtonElement>) => {
    onChangeFilter(e.currentTarget.value as PublicationFunctions);
    setIsOpen(false);
  };

  return (
    <Menu
      className={classNames('grow', className)}
      onOpenChange={setIsOpen}
      listClassName="rounded-none"
      trigger={
        <div
          data-qa={`filter-selector-${id}`}
          className="size-full min-h-[31px] bg-layer-3 px-2 py-[6.5px] text-xs"
        >
          <div className="flex w-full items-center justify-between gap-2">
            {capitalizeFirstLetters
              ? startCase(toLower(selectedFilter))
              : selectedFilter}
            <IconChevronDown
              data-qa={`open-filter-dropdown-${id}`}
              className={classNames(
                'shrink-0 text-primary transition-all',
                isOpen && 'rotate-180',
              )}
              width={18}
              height={18}
            />
          </div>
        </div>
      }
    >
      <div className="bg-layer-3">
        {filters.map((filterType) => (
          <MenuItem
            key={filterType}
            className="max-w-[350px] text-xs hover:bg-accent-primary-alpha"
            item={
              capitalizeFirstLetters
                ? startCase(toLower(filterType))
                : filterType
            }
            value={filterType}
            onClick={onChangeHandler}
          />
        ))}
      </div>
    </Menu>
  );
}
