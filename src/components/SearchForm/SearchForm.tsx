import { useState } from "react";
import {
  Button,
  ButtonToolbar,
  FlexboxGrid,
  Form,
  FormControlProps,
} from "rsuite";

export interface Field {
  label: string;
  name: string;
  props?: FormControlProps;
}

interface SearchFormProps {
  fields: Field[];
  onSearch: (formValue: any) => void;
  defaultFormValue?: any;
}

const SearchForm = ({
  fields,
  onSearch,
  defaultFormValue,
}: SearchFormProps) => {
  const [formValue, setFormValue] = useState(defaultFormValue ?? {});

  const handleSearch = () => {
    onSearch(formValue);
  };

  const onChange = (formValue: any) => {
    setFormValue(formValue);
  };

  const handleReset = () => {
    setFormValue(defaultFormValue ?? {});
  };

  return (
    <Form
      formValue={formValue}
      onChange={onChange}
      style={{
        width: "100%",
      }}
    >
      <FlexboxGrid
        style={{
          width: "100%",
        }}
      >
        {fields.map((field, index) => {
          return (
            <FlexboxGrid.Item
              colspan={12}
              style={{
                marginBottom: 10,
              }}
              key={field.name}
            >
              <Form.Group key={index}>
                <Form.ControlLabel
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {field.label}
                </Form.ControlLabel>
                <Form.Control {...field.props} name={field.name} />
              </Form.Group>
            </FlexboxGrid.Item>
          );
        })}
      </FlexboxGrid>

      <Form.Group>
        <ButtonToolbar>
          <Button appearance="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>
          <Button appearance="default" onClick={handleReset}>
            Reset
          </Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  );
};

export default SearchForm;
