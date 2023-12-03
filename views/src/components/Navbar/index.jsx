import { logo } from "../../assets";
import Container from "../Container";

const Navbar = () => {
  return (
    <div className="p-1 bg-indigo-950 shadow-[0_0_5px_#1E1B4B] absolute top-0 w-full">
      <Container>
        <div>
          <a href="/" className="flex items-center">
            <img src={logo} alt="ITM Logo" className="w-16 rounded-full mr-5" />
            <div>
              <h1 className="text-2xl tracking-widest font-bold leading-none text-indigo-100">ITM</h1>
              <h3 className="text-md leading-none text-indigo-300">Inventory Tracking Master</h3> 
            </div>
          </a>
        </div>        
      </Container>
    </div>
  );
};

export default Navbar;
