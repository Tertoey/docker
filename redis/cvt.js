function hexToFloat(hex) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
  
    // Convert the hexadecimal string to a 32-bit integer
    const intVal = parseInt(hex, 16);
  
    // Set the 32-bit integer to the DataView
    view.setUint32(0, intVal, false);
  
    // Retrieve the float value from the DataView
    return view.getFloat32(0, false);
  }
  
  const hexValue = "402779DA"; // Hexadecimal representation of the 4-byte floating-point number
  const floatValue = hexToFloat(hexValue);
  
  console.log('Hexadecimal value:', hexValue);
  console.log('Floating-point value:', floatValue);
  