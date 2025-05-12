"use client"

import { useEffect, useState } from "react"
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command"

type Option = {
  label: string
  value: string
}

type TypeaheadProps = {
  placeholder?: string
  onSearch: (query: string) => Promise<Option[]> // API call
  onSelect: (selected: Option) => void
  minQueryLength?: number
}

export function Typeahead({
  placeholder = "Search...",
  onSearch,
  onSelect,
  minQueryLength = 4,
}: TypeaheadProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Option[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      console.log(query, "I ran?")
      if (query.length >= minQueryLength) {
        const data = await onSearch(query)
        setResults(data)
        setOpen(true)
      } else {
        setResults([])
        setOpen(false)
      }
    }
    fetchData()
  }, [query, onSearch, minQueryLength])

  return (
    <div className="relative w-full max-w-md">
      <Command shouldFilter={false}>
        <CommandInput
          value={query}
          onValueChange={(val) => setQuery(val)}
          placeholder={placeholder}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
        {open && (
          <CommandList className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-y-auto">
            {results.length > 0 ? (
              results.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => {
                    onSelect(item)
                    setQuery(item.label)
                    setOpen(false)
                  }}
                >
                  {item.label}
                </CommandItem>
              ))
            ) : (
              <CommandEmpty>No results</CommandEmpty>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  )
}
