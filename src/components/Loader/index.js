import BarLoader from "react-spinners/BarLoader";

export default function Loader() {
  return (
    <div className="w-full h-48 flex flex-col justify-center align-center">
      <h1 className="mb-4 text-blue-600 text-md uppercase tracking-widest font-semibold text-center">
        Loading Results...
      </h1>
      <BarLoader
        css="display: block; margin: 0 auto;"
        color={"#2563eb"}
        loading={true}
        width={350}
        height={8}
      />
    </div>
  );
}
