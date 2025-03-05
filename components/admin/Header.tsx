

const Header = () => {
  const user = {
    name: "John Doe",
    email: "h7A7o@example.com",
    role: "Admin",
  }
  return (
    <header className="flex lg:items-end items-start justify-between lg:flex-row flex-col gap-5 sm:mb-10 mb-5">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">
          {user?.name}
        </h2>
        <p className="text-base text-slate-500">
          Monitor all of your users and Orders here
        </p>
      </div>

    
    </header>
  );
};
export default Header;