import React from "react";

const TransactionList = () => {
  return (
    <div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Refence No.</th>
            <th>Total Transfer Amount(Rp)</th>
            <th>Total Transfer Record</th>
            <th>From Account No.</th>
            <th>Maker</th>
            <th>Transfer Date</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>F</td>
            <td>E</td>
            <td>#</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
