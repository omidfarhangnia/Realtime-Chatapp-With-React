function Header({ currentUser }) {
  const messageHeader = "RealTime chatapp";

  return (
    <>
      <div className="flex justify-between items-center bg-customWhite/25 py-3 px-5 rounded-lg">
        <h1 className="font-bold font-lumonosimo text-[25px] text-white">
          {messageHeader.split("").map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </h1>
        <div className="flex items-center gap-3 text-white">
          <h1 className="text-[30px] font-poppins">{currentUser.name}</h1>
          {currentUser.imgPath !== "" ? (
            <img src={currentUser.imagePath} alt="" />
          ) : (
            <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full bg-gray-200/40"></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
