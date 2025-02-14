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
}

const SearchForm = ({ fields }: SearchFormProps) => {
  return (
    <Form>
      <FlexboxGrid>
        {fields.map((field, index) => {
          return (
            <FlexboxGrid.Item
              colspan={12}
              style={{
                marginBottom: 10,
              }}
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
          <Button appearance="primary">Tìm kiếm</Button>
          <Button appearance="default">Reset</Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  );
};

export default SearchForm;
