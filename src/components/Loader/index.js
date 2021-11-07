import React from "react";
import BarLoader from "react-spinners/BarLoader";

const DEFAULT_LOADER_WIDTH = 350;
const MAX_LOADER_WIDTH_VW = 60;

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderWidth: DEFAULT_LOADER_WIDTH,
    };
    this.updateLoaderWidth = this.updateLoaderWidth.bind(this);
  }
  componentDidMount() {
    this.updateLoaderWidth();
    window.addEventListener("resize", this.updateLoaderWidth);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateLoaderWidth);
  }
  updateLoaderWidth() {
    const loaderWidth = Math.min(
      DEFAULT_LOADER_WIDTH,
      window.innerWidth * (MAX_LOADER_WIDTH_VW / 100)
    );
    this.setState({ loaderWidth });
  }
  render() {
    return (
      <div className="w-full h-48 flex flex-col justify-center align-center">
        <h1 className="mb-4 text-blue-600 text-md uppercase tracking-widest font-semibold text-center">
          Loading Results...
        </h1>
        <BarLoader
          css="display: block; margin: 0 auto;"
          color={"#2563eb"}
          loading={true}
          width={this.state.loaderWidth}
          height={8}
        />
      </div>
    );
  }
}
