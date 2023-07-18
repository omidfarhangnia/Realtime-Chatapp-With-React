function Header({ currentUser }) {
  const messageHeader = "RealTime chatapp";

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold font-lumonosimo text-[25px]">
          {messageHeader.split("").map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </h1>
        {/* <h1 className="text-[30px] font-bold italic">{currentUser.userName}</h1> */}
        <div>
          <h1 className="text-[30px] font-poppins">myName</h1>
          {currentUser.imgPath !== "" ? (
            <img
              src={currentUser.imgPath}
              alt={`this is an image for ${currentUser.name} account`}
            />
          ) : (
            <span className="w-[30px] h-[30px] bg-gray-300"></span>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
