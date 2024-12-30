import { Icon } from "lucide-react";
import Link from "next/link";
interface PathCompactViewProps {
  title: string;
  detail: string;
  Icon: any;
  href: string;
  button: string;
  children?: React.ReactNode;
}

export default function PathCompactView(props: PathCompactViewProps) {
  const { title, detail, Icon, href, button, children } = props;
  return (
    <section>
      <div>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p className="flex ">{detail}</p>
          <Icon size={96} className="m-4" />
          {children}
          <div className="card-actions">
            <Link href={href}>
              <button className="btn btn-warning btn-xs">{button}</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
