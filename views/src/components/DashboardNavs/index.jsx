import { logo } from "../../assets";
import Container from "../Container";
import { fakeProfile } from "../../assets";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardNavs = () => {
  const { id } = useParams();

  const [profil, setProfil] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await JSON.parse(localStorage.getItem("accessToken"));

      await axios
        .get(`http://localhost:8080/api/v1/admins/${id}`, {
          headers: {
            access_token: token
          }
        })
        .then((response) => {
          setProfil(response.data.datas.profil_photo);
        })
        .catch((err) => {
          console.log(err);
        });
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
                src={`http://localhost:8080/${profil}`}
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
