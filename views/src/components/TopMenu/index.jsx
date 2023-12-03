import { PropTypes } from "prop-types";
import Container from "../Container";

const TopMenu = ({ id }) => {
  TopMenu.propTypes = {
    id: PropTypes.any,
  };

  const contents = [
    {
      id: 1,
      contentName: "Dashboard",
      url: `/dashboard/${id}`,
    },
    {
      id: 2,
      contentName: "Products",
      url: `/dashboard/${id}/products`,
    },
    {
      id: 3,
      contentName: "Suppliers",
      url: `/dashboard/${id}/suppliers`,
    },
    {
      id: 4,
      contentName: "Distributors",
      url: `/dashboard/${id}/distributors`,
    },
    {
      id: 5,
      contentName: "Supplier Reports",
      url: `/dashboard/${id}/reports/suppliers`,
    },
    {
      id: 6,
      contentName: "Distributor Reports",
      url: `/dashboard/${id}/reports/distributors`,
    },    
  ];

  return (
    <Container>
      <div className="flex justify-between items-center bg-slate-100 shadow-lg mb-8">
        {contents.map((content) => {
          const { id, contentName, url } = content;

          return (
            <a
              key={id}
              href={url}
              className="py-4 px-5 text-center leading-none w-full uppercase text-xs tracking-wide font-semibold hover:bg-slate-200 border-r-2">
              {contentName}
            </a>
          );
        })}
      </div>
    </Container>
  );
};

export default TopMenu;
