'use client'

import React, { useEffect, useRef, useState } from 'react'
import { IGetCustomerContent } from '@/types'

export type Option = {
  label: string
  value: string
  raw: IGetCustomerContent
}

type TypeaheadProps = {
  placeholder?: string
  onSearch: (query: string) => Promise<Option[]>
  onSelect: (selected: Option) => void
  minQueryLength?: number
}

export function Typeahead({
  placeholder = 'Search...',
  onSearch,
  onSelect,
  minQueryLength = 3,
}: TypeaheadProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Option[]>([])
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Fetch results on query change
  useEffect(() => {
    const fetchResults = async () => {
      if (query.length >= minQueryLength) {
        const data = await onSearch(query)
        setResults(data)
        setOpen(true)
      } else {
        setResults([])
        setOpen(false)
      }
    }
    fetchResults()
  }, [query, onSearch, minQueryLength])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (item: Option) => {
    setQuery(item.label)
    setOpen(false)
    onSelect(item)
  }

  return (
    <div className="relative w-full max-w-md" ref={wrapperRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto border border-gray-200 rounded-md bg-white shadow-lg">
          {results.map((item) => (
            <li
              key={item.value}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}

      {open && results.length === 0 && (
        <div className="absolute z-50 mt-1 w-full border border-gray-200 rounded-md bg-white shadow-lg p-2 text-gray-500">
          No customers found. Please register customer.
        </div>
      )}
    </div>
  )
}
