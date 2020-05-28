// import React, { Component } from "react";
// // import { connect } from 'react-redux';
// // import { changeCount } from '../redux/actions/counter';

// class Counter extends Component {
//   changeCount(operate) {
//     this.props.changeCount(operate);
//   }
//   render() {
  
//     return (
//       <div>
//         <span onClick={this.changeCount.bind(this, "minus")}>-</span>
//         <span>{this.props.count}</span>
//         <span onClick={this.changeCount.bind(this, "add")}>+</span>
//       </div>
//     )
//   }
// }


// const mapStateToProps = state => {
//   console.log('state', state);
//   return ({
//   count: state.home.count,
// })
// };

// const mapDispatchToProps = dispatch => ({
//   changeCount: (operate) => dispatch(changeCount(operate)),
// })

// export default Counter;


// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Counter)