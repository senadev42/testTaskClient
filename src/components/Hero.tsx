//react hero section
const Hero: React.FC = () => {
  return (
    //black border
    <div className="mt-14 | flex flex-col gap-x-2 p-4">
      <div className="w-[20rem]">
        <h1 className="text-center mb-4 text-2xl">WanderLust</h1>
      </div>

      <hr className="mt-2 mb-2"></hr>

      <div className=" flex flex-row justify-center ">
        <div className="border-black border-2 px-4 py-1 m-2">Login</div>
        <div className="border-black border-2 px-4 py-1 m-2">Register</div>
      </div>
    </div>
  );
};
export default Hero;
