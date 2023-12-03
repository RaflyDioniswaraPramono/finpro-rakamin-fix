import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Container, DashboardNavs, TopMenu } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../services/state.service";
import {
  distributorIcon,
  productIcon,
  stockIcon,
  supplierIcon,
} from "../../assets";

// eslint-disable-next-line react-refresh/only-export-components
const Dashboard = (props) => {
  Dashboard.propTypes = {
    logOut: PropTypes.func,
    openAlert: PropTypes.func,
    closeAlert: PropTypes.func,
    openBackdrop: PropTypes.func,
    closeBackdrop: PropTypes.func,
  };

  const navigate = useNavigate();
  const { id } = useParams();

  const [datas, setDatas] = useState([]);
  const [productDatas, setProductDatas] = useState([]);
  const [totalOnStock, setTotalOnStock] = useState(0);
  const [supplierDatas, setSupplierDatas] = useState([]);
  const [distributorsDatas, setDistributorDatas] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      const token = await JSON.parse(localStorage.getItem("accessToken"));

      await axios
        .get(`http://localhost:8080/api/v1/admins/${id}`, {
          headers: {
            access_token: token,
          },
        })
        .then((response) => {
          setDatas([response.data.datas]);
        })
        .catch(async (err) => {
          const token = await JSON.parse(localStorage.getItem("accessToken"));
          if (token === null) {
            props.openBackdrop();
            props.openAlert({
              alertType: "error",
              alertTitle: "Error!",
              alertMessage: err.response.data.message,
            });

            setTimeout(() => {
              props.closeAlert();
              props.closeBackdrop();

              navigate("/login");
            }, 1000);
          }
        });

      await axios
        .get("http://localhost:8080/api/v1/products")
        .then((response) => {
          setProductDatas([...response.data.datas]);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get("http://localhost:8080/api/v1/onstock")
        .then((response) => {
          setTotalOnStock(response.data.total_on_stock.total_on_stock);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get("http://localhost:8080/api/v1/suppliers")
        .then((response) => {
          setSupplierDatas([...response.data.datas]);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get("http://localhost:8080/api/v1/distributors")
        .then((response) => {
          setDistributorDatas([...response.data.datas]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchDatas();
  }, [id, navigate, props]);

  return (
    <React.Fragment>
      <DashboardNavs />
      <TopMenu id={id} />
      <div className="absolute bg-indigo-100 w-full h-72 -z-[1] top-[7rem]"></div>
      <Container>
        {datas.map((data) => {
          const { id, Role, admin_name } = data;

          return (
            <div key={id}>
              <div className="mb-14">
                <div>
                  <p className="text-xl font-medium tracking-wider leading-1 mb-1">
                    Welcome{" "}
                    <span className="font-semibold">{Role.role_name}</span>,
                  </p>
                  <p className="text-3xl font-bold tracking-wider leading-1 mb-1">
                    {admin_name}
                  </p>
                  <p className="text-md tracking-wide">
                    Join at - 28 November 2023, 21:15 WIB
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-10">
          <div>
            <div className="grid grid-cols-3 bg-slate-50 p-5 rounded-md items-center shadow-md">
              <div className="col-span-1">
                <img
                  src={productIcon}
                  alt="Products Icon"
                  className="w-10 h-10"
                />
              </div>
              <div className="col-span-2 flex items-center flex-col">
                <h2 className="text-3xl font-bold mr-2 text-[#005EDF]">
                  {productDatas.length}
                </h2>
                <h3 className="font-medium tracking-wider">Products Total</h3>
              </div>
            </div>
            <button
              onClick={() => (location.href = `/dashboard/${id}/products`)}
              className="text-sm p-2 w-full text-center mt-2 bg-[#005EDF] hover:bg-[#2a2aa9] text-slate-50 rounded-sm">
              Product Detail
            </button>
          </div>
          <div>
            <div className="grid grid-cols-3 bg-slate-50 p-5 rounded-md items-center shadow-md">
              <div className="col-span-1">
                <img
                  src={stockIcon}
                  alt="Products On Stock Icon"
                  className="w-10 h-10"
                />
              </div>
              <div className="col-span-2 flex items-center flex-col">
                <h2 className="text-3xl font-bold mr-2 text-[#08816D]">
                  {totalOnStock ? totalOnStock : 0}
                </h2>
                <h3 className="font-medium tracking-wider">Product On Stock</h3>
              </div>
            </div>
            <button
              onClick={() =>
                (location.href = `/dashboard/${id}/reports/suppliers`)
              }
              className="text-sm p-2 w-full text-center mt-2 bg-[#08816D] hover:bg-[#276359] text-slate-50 rounded-sm">
              Product On Stock Detail
            </button>
          </div>
          <div>
            <div className="grid grid-cols-3 bg-slate-50 p-5 rounded-md items-center shadow-md">
              <div className="col-span-1">
                <img
                  src={supplierIcon}
                  alt="Suppliers icon"
                  className="w-10 h-10"
                />
              </div>
              <div className="col-span-2 flex items-center flex-col">
                <h2 className="text-3xl font-bold mr-2 text-[#DD636E]">
                  {supplierDatas.length}
                </h2>
                <h3 className="font-medium tracking-wider">Our Suppliers</h3>
              </div>
            </div>
            <button
              onClick={() => (location.href = `/dashboard/${id}/suppliers`)}
              className="text-sm w-full p-2 mt-2 bg-[#DD636E] hover:bg-[#b14b53] text-slate-50 rounded-sm">
              Suppliers detail
            </button>
          </div>
          <div>
            <div className="grid grid-cols-3 bg-slate-50 p-5 rounded-md items-center shadow-md">
              <div className="col-span-1">
                <img
                  src={distributorIcon}
                  alt="Distributors Icon"
                  className="w-10 h-10"
                />
              </div>
              <div className="col-span-2 flex items-center flex-col">
                <h2 className="text-3xl font-bold mr-2 text-[#A0D468]">
                  {distributorsDatas.length}
                </h2>
                <h3 className="font-medium tracking-wider">Our Distributors</h3>
              </div>
            </div>
            <button
              onClick={() => (location.href = `/dashboard/${id}/distributors`)}
              className="text-sm w-full p-2 mt-2 bg-[#A0D468] hover:bg-[#87b457] text-slate-50 rounded-sm">
              Distributor detail
            </button>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
