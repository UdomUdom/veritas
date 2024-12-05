interface CardProps {
  Header: string;
  Body: string;
  className?: string;
  color?: string;
}

export default function Card({ Header, Body, className, color = "base-100" }: CardProps) {
  return (
    <section className={`card ${color} shadow-xl ${className}`}>
      <div className="card-body items-center text-center">
        <h3 className="card-title">{Header}</h3>
        <p>{Body}</p>
      </div>
    </section>
  )
}