import EyeCloseIcon from "@rsuite/icons/EyeClose";
import VisibleIcon from "@rsuite/icons/Visible";
import React from "react";
import { Input, InputGroup } from "rsuite";

const PasswordField = ({ name, value, onChange }) => {
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };

  return (
    <InputGroup inside>
      <Input
        type={visible ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
      />
      <InputGroup.Button onClick={handleChange}>
        {visible ? <VisibleIcon /> : <EyeCloseIcon />}
      </InputGroup.Button>
    </InputGroup>
  );
};

export default PasswordField;
