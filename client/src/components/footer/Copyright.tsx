const currentYear = new Date().getFullYear();

export default function Copyright() {
  return (
    <div className="col-span-2 lg:order-1 order-last">
      <h1 className="text-3xl uppercase font-bold">veritas</h1>
      <p className="my-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi ea
        explicabo, ullam nam consectetur rerum unde laudantium ut illum placeat?
      </p>
      <p className="text-gray-300">&copy; {currentYear} Veritas Co., Ltd.</p>
    </div>
  );
}
