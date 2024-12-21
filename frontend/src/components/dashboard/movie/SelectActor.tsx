import React, {Dispatch, SetStateAction} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {Actor} from "@/types/Actor";
import useActor from "@/hooks/actor/useActor";

interface SelectActorProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    actors: Actor[];
}


const SelectActor = ({
                         setValue,
                         actors,
                         open,
                         setOpen,
                         value
                     }: SelectActorProps) => {

    const {actors: allActors} = useActor();

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
                        ? allActors.length > 0 && allActors
                        .filter((actor) => !actors.some((a) => a.id === actor.id))
                        .find((actor) => actor.id === value)?.fullName
                        : "Select an actor..."}
                    <ChevronsUpDown className="opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search actors..." className="h-9"/>
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {
                                allActors.length > 0 && allActors
                                    .filter((actor) => !actors.some((a) => a.id === actor.id))
                                    .map((actor) => (
                                        <CommandItem
                                            key={actor.id}
                                            value={actor.id}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {actor.fullName}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    value === actor.id ? "opacity-100" : "opacity-0"
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

export default SelectActor;