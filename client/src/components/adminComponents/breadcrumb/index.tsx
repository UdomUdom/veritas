import Link from "next/link";

interface BreadcrumbProps {
  paths: { name: string; href: string }[];
}

export default function Breadcrumb({ paths }: BreadcrumbProps) {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {paths.map((path, index) => (
          <li key={index}>
            <Link href={path.href} className="text-primary">
              {path.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
