function Header({ currentUser }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-[30px] font-bold">realtime chatapp</h1>
        <h1 className="text-[30px] font-bold italic">{currentUser.userName}</h1>
      </div>
    </>
  );
}

export default Header;
