import React, { useState } from "react";
import './App.css';
import {Button, TextField, MenuItem,Select } from "@mui/material";

const App = () => {
  const schemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(schemaOptions);
  const [selectedSchema, setSelectedSchema] = useState("");
  

  const handleSaveSegment = () => {
    setShowPopup(true);
  };

  const handleAddSchema = () => {
    if (selectedSchema) {
      const selectedOption = availableOptions.find(option => option.value === selectedSchema);
      setSelectedSchemas([...selectedSchemas, selectedOption]);

      // Remove selected schema from available options
      setAvailableOptions(availableOptions.filter(option => option.value !== selectedSchema));

      // Reset the selected schema
      setSelectedSchema("");
    }
  };

  const handleSubmit = () => {
    const schema = selectedSchemas.reduce((acc, item) => {
      acc.push({ [item.value]: item.label });
      return acc;
    }, []);

    const data = {
      segment_name: segmentName,
      schema
    };


    console.log("Submitted Data: ", data);

    // Here you would send the data to the server using fetch or axios.
    // Example: fetch('api/endpoint', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
    reset();
    
  };

  const reset = ()=>{
    setSegmentName("");
    setSelectedSchemas([]);
    setAvailableOptions(schemaOptions);
    setSelectedSchema("")
    setShowPopup(false); // Close popup after submission
  }

  return (
    <div className="App">
      <Button variant="contained" className="Button" onClick={handleSaveSegment}>Save Segment</Button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Saving Segment</h3>

            <p className="seg">Enter Name of the Segment</p>
           
            <TextField
              id="outlined-size-small"
              size="small"
              type="text"
              sx={{marginBottom:"10px"}}
              value={segmentName}
              placeholder="Name of the Segment"
              onChange={(e) => setSegmentName(e.target.value)}
            />

           
            <p className="seg">Add schema to segment:</p>
          
            <Select
              value={selectedSchema}
              onChange={(e) => setSelectedSchema(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
            <MenuItem value="">
              <em>Select an option</em>
            </MenuItem>
              {availableOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem >
              ))}
            </Select>
              
            <Button onClick={handleAddSchema}>+ Add New Schema</Button>

            <div className="schema-container">
              {selectedSchemas.map((schema, index) => (
                <div key={index}>
                  {/* <label>{schema.label}</label> */}
                  <Select
                    value={schema.value}
                    onChange={(e) => {
                      const updatedSchema = selectedSchemas.map((item, i) =>
                        i === index ? { ...item, value: e.target.value, label: availableOptions.find(option => option.value === e.target.value).label } : item
                      );
                      setSelectedSchemas(updatedSchema);
                    }}
                    sx={{textAlign:"left",width:"85%", marginTop:"10px",marginBottom:"10px"}}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                  <MenuItem value="">
                    <em>Select an option</em>
                  </MenuItem>
                    {availableOptions
                      .concat(schema) // Add the current schema back to available options
                      .map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                      ))}
                  </Select>
                </div>
              ))}
            </div>

            <Button variant="contained" color="success" sx={{marginRight:"20px", marginTop:"10px"}} onClick={handleSubmit}>Save Segment</Button>
            <Button variant="outlined" color="error" sx={{marginTop:"10px"}} onClick={() => reset()}>Close</Button>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default App;
