interface SearchbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Searchbar({
  searchQuery,
  onSearchChange,
}: SearchbarProps) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="input input-bordered w-full max-w-xs hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    />
  );
}
