import React from "react";

export default function Results({ data }) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
