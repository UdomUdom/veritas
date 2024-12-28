import Link from "next/link";

interface PathCompactViewProps {
  title: string;
  detail: string;
  href: string;
  button: string;
  children?: React.ReactNode;
}

export default function PathCompactView(props: PathCompactViewProps) {
  const { title, detail, href, button, children } = props;
  return (
    <section>
      <div className="">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p className="flex ">{detail}</p>
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
