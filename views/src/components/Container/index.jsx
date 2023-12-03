import PropTypes from "prop-types";

const Container = ({ children }) => {
  Container.propTypes = {
    children: PropTypes.any
  }

  return (
    <div className="px-2 lg:px-48">
      {children}
    </div>
  )
}

export default Container