import React, { Component } from "react";
import "./tab.scss";

export class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ["sex", "name", "school"],
      choice: "sex"
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        choice: 'name'
      })
    }, 3000)
  }
  clickOption(item) {
    this.setState({
      choice: item
    });
    console.log(item);
  }
  render() {
    console.log("renders")
    const { options = [] } = this.state;
    return (
      <div className="tab">
        {options.map(item => (
          <span
            key={item}
            className={this.state.choice === item ? "tab-selected" : ""}
            onClick={this.clickOption.bind(this, item)}
          >
            {item}
          </span>
        ))}
      </div>
    );
  }
}
