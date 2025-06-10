import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalUser.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import "bootstrap/dist/css/bootstrap.min.css";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPass: false,
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      phonenumber: "",
      gender: "",
      roleId: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("hu hu", () => {
      this.resetForm();
    });
  }

  toggle = () => {
    this.props.handleIsOpenModle();
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      phonenumber: "",
      gender: "",
      roleId: "",
    });
  };

  handleShowHidePass = () => {
    this.setState({
      isShowPass: !this.state.isShowPass,
    });
  };

  handelOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  checkvalidateInput = () => {
    let isValue = true;
    const arrInput = [
      "email",
      "password",
      "firstname",
      "lastname",
      "address",
      "phonenumber",
      "gender",
      "roleId",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValue = false;
        alert("Field cannot be empty: " + arrInput[i]);
        break;
      }
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (isValue && !emailPattern.test(this.state.email)) {
      alert("Invalid email format");
      isValue = false;
    }
    return isValue;
  };

  handleAddNewUser = () => {
    if (this.checkvalidateInput()) {
      const userData = {
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
      };
      this.props.createNewUser(userData);
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle} centered>
        <ModalHeader toggle={this.toggle}>Create User</ModalHeader>
        <ModalBody>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleAddNewUser}>
            Create
          </Button>
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect()(ModalUser);
