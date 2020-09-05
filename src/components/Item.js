import React, { Component } from "react";

class Item extends Component {
  changeStatus = () => {
    this.props.changeStatus(this.props.task.id);
  };

  setEditItem = () => {
    this.props.setEditItem(this.props.task.id);
  };

  deleteData = () => {
    this.props.deleteData(this.props.task.id);
  };

  render() {
    let task = this.props.task;
    return (
      <tr>
        <td>{task.id}</td>
        <td>{task.name}</td>
        <td className="text-center" onClick={this.changeStatus}>
          <span
            className={
              task.status ? "label label-success" : "label label-danger"
            }
          >
            {task.status ? "Active" : "Set Active"}
          </span>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.setEditItem}
          >
            <span className="fa fa-edit mr-5"></span>Edit
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.deleteData}
          >
            <span className="fa fa-trash mr-5"></span>Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Item;
