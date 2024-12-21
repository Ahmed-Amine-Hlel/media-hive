import React, { Dispatch, SetStateAction } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Genre } from '@/types/Genre';
import useGenre from '@/hooks/genre/useGenre';

interface SelectGenreProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  genres: Genre[];
}

const SelectGenre = ({
  setValue,
  genres,
  open,
  setOpen,
  value,
}: SelectGenreProps) => {
  const { genres: allGenres } = useGenre();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? allGenres.length > 0 &&
              allGenres
                .filter((genre) => !genres.some((g) => g.id === genre.id))
                .find((genre) => genre.id === value)?.name
            : 'Select a genre...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search genres..." className="h-9" />
          <CommandList>
            <CommandEmpty>No genre found.</CommandEmpty>
            <CommandGroup>
              {allGenres.length > 0 &&
                allGenres
                  .filter((genre) => !genres.some((g) => g.id === genre.id))
                  .map((genre) => (
                    <CommandItem
                      key={genre.id}
                      value={genre.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      {genre.name}
                      <Check
                        className={cn(
                          'ml-auto',
                          value === genre.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectGenre;
