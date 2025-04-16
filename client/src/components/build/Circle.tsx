interface CircleProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Circle({ children, className }: CircleProps) {
  return (
    <div className="flex space-x-4">
      <div
        className={`w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-md ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
