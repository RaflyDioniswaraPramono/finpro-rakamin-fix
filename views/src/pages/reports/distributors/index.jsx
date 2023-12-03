import React, { useEffect, useState } from "react";
import Dashboard from "../../dashboard";
import { Alerts, Backdrops, Container } from "../../../components";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";
import axios from "axios";
import { deleteIcon } from "../../../assets";

const DistributorReports = () => {
  const [distributorReportDatas, setDistributorReportDatas] = useState([]);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [deletedId, setDeletedId] = useState(0);
  const [shortType, setShortType] = useState("ASC");

  useEffect(() => {
    const fetchDatas = async () => {
      if (shortType.length > 0) {
        await axios
          .post("http://localhost:8080/api/v1/search/reports/distributors", {
            shortType: shortType,
          })
          .then((response) => {
            setDistributorReportDatas([...response.data.datas]);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        await axios
          .get("http://localhost:8080/api/v1/reports/distributors")
          .then((response) => {
            setDistributorReportDatas([...response.data.datas]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    fetchDatas();
  }, [shortType]);

  const showDeleteDialog = (ids) => {
    setDeletedId(ids);
    setOpenDeleteForm(true);
  };

  return (
    <React.Fragment>
      <Dashboard />
      <Alerts />
      <Backdrops />
      <Container>
        <div className="mb-5">
          <div className="grid grid-cols-2 items-center mb-5 bg-[#08816D] shadow-xl p-4 rounded-md">
            <p className="text-slate-50 text-3xl font-bold tracking-wider leading-1">
              Distributor Report Details
            </p>
            <div className="flex justify-end">
              <select
                value={shortType}
                onChange={(event) => setShortType(event.target.value)}
                className="w-1/2 p-2 text-sm cursor-pointer rounded-sm">
                <option disabled>SORT BY DATE</option>
                <option value="ASC">OLD</option>
                <option value="DESC">NEW</option>
              </select>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Bought By</TableCell>
                  <TableCell align="right">Product Shipped Name</TableCell>
                  <TableCell align="right">Bought Total</TableCell>
                  <TableCell align="right">Sending Date</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {distributorReportDatas.map((distributorReport) => {
                  const options = {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };

                  const {
                    id,
                    Product,
                    Distributor,
                    amount_distributor_product,
                    sending_date,
                  } = distributorReport;

                  const formattedDate = new Date(
                    sending_date
                  ).toLocaleDateString("en-EN", options);

                  return (
                    <TableRow
                      key={id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell component="th" scope="row">
                        {Distributor?.distributor_name}
                      </TableCell>
                      <TableCell align="right">
                        {Product?.product_name}
                      </TableCell>
                      <TableCell align="right">
                        {amount_distributor_product}
                      </TableCell>
                      <TableCell align="right">{formattedDate}</TableCell>
                      <TableCell align="right">
                        <button onClick={() => showDeleteDialog(id)}>
                          <img
                            src={deleteIcon}
                            alt="Delete Icon"
                            className="w-7 h-7"
                          />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="mb-10">
          <button
            onClick={() => setOpenAddForm(true)}
            className="p-3 text-sm bg-green-300 rounded-md hover:bg-green-400">
            Add Distributor Report
          </button>
        </div>
        <AddForm openAddForm={openAddForm} setOpenAddForm={setOpenAddForm} />
        <DeleteForm
          deletedId={deletedId}
          openDeleteForm={openDeleteForm}
          setOpenDeleteForm={setOpenDeleteForm}
        />
      </Container>
    </React.Fragment>
  );
};

export default DistributorReports;
