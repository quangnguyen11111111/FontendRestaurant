import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "bootstrap/dist/css/bootstrap.min.css";

class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      currentPage: 1,
      usersPerPage: 2,
    };
  }

  componentDidMount() {
    this.props.getFirstName();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userData !== this.props.userData) {
      this.setState({
        arrUser: this.props.userData,
      });
    }
  }

  editUser = (item) => {
    this.props.handleEditUser(item);
  };

  handleDeleteUser = async (data) => {
    await this.props.deleteUser(data);
    this.componentDidMount();
  };

  // Xử lý sự kiện chuyển trang
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { arrUser, currentPage, usersPerPage } = this.state;

    // Tính toán dữ liệu cho trang hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = arrUser.slice(indexOfFirstUser, indexOfLastUser);

    // Tạo các nút trang
    const totalPages = Math.ceil(arrUser.length / usersPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    console.log(pageNumbers);
    
    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Address</th>
              <th>PhoneNumber</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.address}</td>
                <td>{item.phonenumber}</td>
                <td>{item.gender}</td>
                <td>{item.roleId}</td>
                <td>{item.positionId}</td>
                <td>
                  <i
                    className="fas fa-user-edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.editUser(item)}
                  ></i>
                  <i
                    className="fas fa-trash px-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.handleDeleteUser(item.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Điều khiển phân trang */}
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`btn ${number === currentPage ? "btn-primary" : "btn-light"}`}
              onClick={() => this.handlePageChange(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.admin.firstname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFirstName: () => dispatch(actions.fetchGenderStart()),
    deleteUser: (data) => dispatch(actions.deleteUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
