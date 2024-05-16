import { PropTypes } from "prop-types";
import { logo } from "../../assets";
import Container from "../Container";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardNavs = ({id}) => {
  DashboardNavs.propTypes = {
    id: PropTypes.string
  }

  const [profil, setProfil] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await JSON.parse(localStorage.getItem("accessToken"));

      try {
        const response = await axios.get(`admins/${id}`, {
          headers: {
            access_token: token
          }
        })
  
        setProfil(response?.data?.profil_photo);
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-2 lg:p-1 bg-indigo-950 shadow-[0_0_5px_#1E1B4B] mb-5">
      <Container>
        <div className="grid grid-cols-3 lg:grid-cols-2 items-center">
          <div className="col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center">
              <img
                src={logo}
                alt="ITM Logo"
                className="w-12 lg:w-16 rounded-full mr-5"
              />
              <div>
                <h1 className="text-xl lg:text-2xl tracking-widest font-bold leading-none text-indigo-100">
                  ITM
                </h1>
                <h3 className="text-md leading-none text-indigo-300">
                  Inventory Tracking Master
                </h3>
              </div>
            </a>
          </div>
          <div className="flex justify-end">
            <a href={`/profile/${id}`}>
              <img
                src={`http://localhost:3001/${profil}`}
                alt="Profil Image"
                className="w-12 rounded-full hover:shadow-[0_0_5px_#95C4EE]"
              />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardNavs;
