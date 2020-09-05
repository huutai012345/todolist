import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: true,
      action: "Add Task",
    };
  }

  componentDidMount() {
    let itemEdit = this.props.itemEdit;

    if (itemEdit != null) {
      this.setState({
        name: itemEdit.name,
        status: itemEdit.status,
        action: "Edit Task",
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.itemEdit != null) {
      this.setState({
        name: nextProps.itemEdit.name,
        status: nextProps.itemEdit.status,
        action: "Edit Task",
      });
    }
  }

  // static getDerivedStateFromProps(props) {
  //   if (props.itemEdit != null) {
  //     return {
  //       name: props.itemEdit.name,
  //       status: props.itemEdit.status,
  //       action: "Edit Task",
  //     };
  //   }
  //   return null;
  // }

  clearForm = () => {
    this.setState({
      name: "",
      status: true,
    });
  };

  onCloseForm = () => {
    this.clearForm();
    this.props.onCloseForm();
  };

  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (name === "status") {
      value === "true" ? (value = true) : (value = false);
    }

    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.clearForm();

    if (this.state.action === "Add Task") {
      this.props.onSubmit(this.state);
    } else {
      let data = this.state;
      data.id = this.props.itemEdit.id;
      this.props.editData(data);
    }
  };

  render() {
    return (
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">{this.state.action}</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name :</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <label>Status :</label>
              <select
                className="form-control"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
              >
                <option value={true}>Active</option>
                <option value={false}>Set Active</option>
              </select>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  Confirm
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onCloseForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
