import React, { Component } from "react";
import Item from "./Item";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.filter ? this.props.filter.name : "",
      status: this.props.filter ? this.props.filter.status : "All",
      sort: this.props.sort,
    };
  }

  sortID = () => {
    let sort = this.state.sort;
    sort.by = "id";
    sort.value === 1 ? (sort.value = -1) : (sort.value = 1);

    this.props.setSort(sort);
  };

  sortName = () => {
    let sort = this.state.sort;
    sort.by = "name";
    sort.value === 1 ? (sort.value = -1) : (sort.value = 1);

    this.props.setSort(sort);
  };

  onChange = (event) => {
    let target = event.target;

    let filter = this.state;
    if (target.name === "name") {
      filter.name = target.value;
    } else {
      filter.status = target.value;
    }

    this.props.setFilterData(filter);

    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    let tasks = this.props.tasks;
    let task = tasks.map((task) => {
      return (
        <Item
          key={task.id}
          task={task}
          changeStatus={this.props.changeStatus}
          deleteData={this.props.deleteData}
          setEditItem={this.props.setEditItem}
        />
      );
    });

    return (
      <div className="row mt-15">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover ">
            <thead>
              <tr>
                <th className="th-sm">
                  ID
                  <span
                    className="fa fa-sort ml-5"
                    onClick={this.sortID}
                  ></span>
                </th>
                <th className="text-center">
                  Name{" "}
                  <span
                    className="fa fa-sort ml-5"
                    onClick={this.sortName}
                  ></span>
                </th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value={"All"}>All</option>
                    <option value={"Set Active"}>Set Active</option>
                    <option value={"Active"}>Active</option>
                  </select>
                </td>
                <td></td>
              </tr>
              {task}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TaskList;
