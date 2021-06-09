import React from "react";


// https://reactjs.org/docs/forwarding-refs.html

const UploadWidget = React.forwardRef((props, ref) => {
  // In this component we foward the ref of the input type file in order to deal with it in the parent component.

  const handleFileSelect = (event) => {
    // This feature allows us to create a "fake URL" of the file that the user wants to upload
    // In order to display the output to the user.
    // See <FormProfile /> or <ItemForm />
    const file = event.target.files[0];
    const tempURL = URL.createObjectURL(file);
    props.onFileSelect && props.onFileSelect(tempURL);
    // ^------------------------ You can use guard operators in your normal javascript too !
    // This means that the prop onFileSelect isn't mandatory in order to use this component.
  };

  return (
    <React.Fragment>
      <label className="UploadWidget label" htmlFor={props.name}>
        {props.children}
      </label>
      <input
        onChange={handleFileSelect}
        ref={ref}
        className="UploadWidget input"
        id={props.name}
        name={props.name}
        type="file"
      />
    </React.Fragment>
  );
});

export default UploadWidget;
