const currentYear = new Date().getFullYear();

export default function Copyright() {
  return (
    <div className="col-span-2 lg:order-1 order-last">
      <h1 className="text-base text-3xl uppercase font-bold">veritas</h1>
      <p className="mt-4 font-semibold">Veritas Co., Ltd.</p>
      <p className="mt-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi ea
        explicabo, ullam nam consectetur rerum unde laudantium ut illum placeat?
      </p>
      <p className="mt-4 text-gray-300">
        &copy; {currentYear} Veritas Co., Ltd.
      </p>
    </div>
  );
}
