import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      isDisplayForm: false,
      btName: "Add Task",
      editItem: null,
      filter: null,
      sort: {
        by: "id",
        value: 1,
      },
    };
  }

  componentDidMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }

  onChangeForm = () => {
    let temp = this.state.isDisplayForm;
    if (temp) {
      this.setState({
        isDisplayForm: false,
        btName: "Add Task",
      });
    } else {
      this.setState({
        isDisplayForm: true,
        btName: "Home",
      });
    }
  };

  crateID() {
    let tasks = this.state.tasks;
    if (tasks.length === 0) {
      return 1;
    }

    return (
      Math.max.apply(
        Math,
        tasks.map(function (o) {
          return o.id;
        })
      ) + 1
    );
  }

  onSubmit = (data) => {
    let tasks = this.state.tasks;
    data.id = this.crateID();
    tasks.push(data);
    this.setState({
      tasks: tasks,
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  changeStatusTask = (id) => {
    let tasks = this.state.tasks;
    tasks.forEach((task) => {
      if (task.id === id) {
        task.status ? (task.status = false) : (task.status = true);
        this.setState({
          tasks: tasks,
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    });
  };

  deleteData = (id) => {
    let tasks = this.state.tasks;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        tasks.splice(index, 1);
        this.setState({
          tasks: tasks,
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    });
  };

  setEditItem = (id) => {
    this.setState({
      isDisplayForm: true,
      btName: "Home",
    });

    let tasks = this.state.tasks;
    tasks.forEach((task) => {
      if (task.id === id) {
        this.setState({
          editItem: task,
        });
      }
    });
  };

  editData = (data) => {
    let tasks = this.state.tasks;
    tasks.forEach((task) => {
      if (task.id === data.id) {
        task.name = data.name;
        task.state = data.status;
        this.setState({
          tasks: tasks,
          editItem: null,
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    });
    this.onCloseForm();
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      btName: "Add Work",
    });
  };

  setFilterData = (data) => {
    this.setState({
      filter: data,
    });
  };

  setSort = (data) => {
    this.setState({
      sort: data,
    });
  };

  sortData = (tasks) => {
    let sort = this.state.sort;
    if (this.state.sort.by === "name") {
      tasks = tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else {
      tasks = tasks.sort((a, b) => {
        if (a.id > b.id) return sort.value;
        else if (a.id < b.id) return -sort.value;
        else return 0;
      });
    }

    return tasks;
  };

  filterData = () => {
    let tasks = this.state.tasks;
    let status;

    if (this.state.filter != null) {
      let filter = this.state.filter;
      if (filter.status !== "All") {
        filter.status === "Active" ? (status = true) : (status = false);

        tasks = tasks.filter((task) => task.status === status);
      }

      if (filter.name !== "") {
        filter.name = filter.name.toLowerCase();
        tasks = tasks.filter(
          (task) => task.name.toLowerCase().indexOf(filter.name) !== -1
        );
      }
    }
    return tasks;
  };

  render() {
    let tasks = this.sortData(this.filterData());

    return (
      <div className="container">
        <div className="text-center">
          <h1>Task Management</h1>
          <hr />
        </div>
        <div className="row">
          {this.state.isDisplayForm ? (
            <TaskForm
              onSubmit={this.onSubmit}
              onCloseForm={this.onCloseForm}
              itemEdit={this.state.editItem}
              editData={this.editData}
            />
          ) : (
            ""
          )}
          <div
            className={
              this.state.isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onChangeForm}
            >
              <span className="fa fa-plus mr-5"></span>
              {this.state.btName}
            </button>
            <TaskList
              tasks={tasks}
              changeStatus={this.changeStatusTask}
              deleteData={this.deleteData}
              setEditItem={this.setEditItem}
              filter={this.state.filter}
              setFilterData={this.setFilterData}
              sort={this.state.sort}
              setSort={this.setSort}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
