import Link from "next/link";
interface NavParentProps {
  parent: string;
  navMenu: Array<{ title: string; href: string }>;
}

export default function NavParent(props: NavParentProps) {
  const { parent, navMenu } = props;
  return (
    <li>
      <details>
        <summary>{parent}</summary>
        <ul className="bg-base-300 rounded-t-none p-2">
          {navMenu.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
}
