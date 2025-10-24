import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li className="p-1 font-medium text-sm">
        <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
          Pages
        </a>
      </li>
      <li className="p-1 font-medium text-sm">
        <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
          Account
        </a>
      </li>
      <li className="p-1 font-medium text-sm">
        <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
          Blocks
        </a>
      </li>
      <li className="p-1 font-medium text-sm">
        <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
          Docs
        </a>
      </li>
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <nav className="mx-auto max-w-screen-xl px-2 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <a
          href="#"
          className="mr-4 cursor-pointer py-1.5 text-lg font-semibold"
        >
          Vantage AI
        </a>

        <div className="hidden lg:block">
          <NavList />
        </div>

        <button
          type="button"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </button>
      </div>
      <div className={openNav ? 'block' : 'hidden'}>
        <NavList />
      </div>
    </nav>
  );
}

export default NavbarSimple;