import Logo from './Logo';

function Header() {
  return (
    <header className="flex items-center">
      <div className="block lg:hidden">
        <Logo />
      </div>

      <div className="ml-auto flex items-center">
        {/* <div className="border rounded-full w-[40px] sm:w-[50px]">
          <img
            className="w-[40px] sm:w-[50px] rounded-full"
            src="./notion-avatar-1699487912354.png"
            alt="notion avatar"
          />
        </div> */}

        <span className="text-base">
          Hello, <span className="font-bold text-green-500">Long Nguyen</span>
        </span>
      </div>
    </header>
  );
}

export default Header;
