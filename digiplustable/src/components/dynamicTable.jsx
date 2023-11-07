import React, { useState } from 'react';

const DynamicTable = () => {
  const [data, setData] = useState([]);
  const [newRow, setNewRow] = useState({ name: '', age: '', cgpa: '' });
  const [selectedRow, setSelectedRow] = useState(null); // To store the index of the row being edited

  // Add a new state variable to keep track of SR numbers
  const [srNumber, setSrNumber] = useState(1);

  const handleAddRow = () => {
    if (newRow.name && newRow.age && newRow.cgpa) {
      // Add SR number to the new row
      const newRowWithSR = { sr: srNumber, ...newRow };
      setSrNumber(srNumber + 1);

      // Add the new row to the data
      setData([...data, newRowWithSR]);
      setNewRow({ name: '', age: '' , cgpa: ''});
    }
  };

  const handleUpdateRow = (index) => {
    // Set the selectedRow to the index of the row being edited
    setSelectedRow(index);
  };

  const handleSaveRow = () => {
    if (selectedRow !== null) {
      const updatedData = [...data];
      updatedData[selectedRow] = { sr: data[selectedRow].sr, ...newRow };
      setData(updatedData);
      setSelectedRow(null); // Clear selectedRow to exit edit mode
      setNewRow({ name: '', age: '', cgpa:'' });
    }
  };

  const handleCancelEdit = () => {
    setSelectedRow(null); // Clear selectedRow to exit edit mode
    setNewRow({ name: '', age: '', cgpa: '' });
  };

  const handleDeleteRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>SR</th>
            <th>Name</th>
            <th>Age</th>
            <th>cgpa</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.sr}</td>
              <td>
                {selectedRow === index ? (
                  <input
                    type="text"
                    value={newRow.name}
                    onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
                  />
                ) : (
                  row.name
                )}
              </td>
              <td>
                {selectedRow === index ? (
                  <input
                    type="text"
                    value={newRow.age}
                    onChange={(e) => setNewRow({ ...newRow, age: e.target.value })}
                  />
                ) : (
                  row.age
                )}
              </td>
              <td>
                {selectedRow === index ? (
                  <input
                    type="text"
                    value={newRow.cgpa}
                    onChange={(e) => setNewRow({ ...newRow, cgpa: e.target.value })}
                  />
                ) : (
                  row.cgpa
                )}
              </td>
              <td>
                {selectedRow === index ? (
                  <div>
                    <button onClick={handleSaveRow}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleUpdateRow(index)}>Update</button>
                )}
                <button onClick={() => handleDeleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newRow.name}
          onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Age"
          value={newRow.age}
          onChange={(e) => setNewRow({ ...newRow, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cgpa"
          value={newRow.cgpa}
          onChange={(e) => setNewRow({ ...newRow, cgpa: e.target.value })}
        />
        <button id="add-row-button" onClick={handleAddRow}>
          Add Row
        </button>
      </div>
    </div>
  );
};

export default DynamicTable;
