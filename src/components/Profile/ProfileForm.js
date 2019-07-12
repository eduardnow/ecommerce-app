import React from "react";
import { withFormik, Field, FieldArray, getIn } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import MaskedInput from "react-text-mask";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const ErrorMessageMetadata = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);

      return touch && error ? (
        <div className="invalid-feedback d-block">{error}</div>
      ) : null;
    }}
  />
);

// Input feedback
const InputFeedback = ({ error }) =>
  error ? <div className="invalid-feedback d-block">{error}</div> : null;

// Checkbox input
const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id}>{label}</label>
      {touched[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};

const phoneNumberMask = [
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/
];

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum of 3 characters")
    .matches(/^[a-zA-Z\s]*$/, "First name can only contain Latin letters.")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Minimum of 3 characters")
    .matches(/^[a-zA-Z\s]*$/, "Last name can only contain Latin letters.")
    .required("Last name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
  metadata: Yup.array()
    .of(
      Yup.object().shape({
        key: Yup.string()
          .min(4, "too short")
          .required("Key is required"), // these constraints take precedence
        value: Yup.string()
          .min(3, "too short")
          .required("Value is required") // these constraints take precedence
      })
    )
    .required("Must have metadata") // these constraints are shown if and only if inner constraints are satisfied
    .min(3, "Minimum of 3 metadata"),
  consent: Yup.bool()
    .test(
      "consent",
      "You have to agree with our Terms and Conditions!",
      value => value === true
    )
    .required("You have to agree with our Terms and Conditions!")
});

const formik = withFormik({
  mapPropsToValues: ({
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    phone,
    country,
    state,
    city,
    address,
    metadata,
    consent
  }) => ({
    firstName: firstName || "",
    lastName: lastName || "",
    password: password || "",
    confirmPassword: confirmPassword || "",
    email: email || "",
    phone: phone || "",
    country: country || "",
    state: state || "",
    city: city || "",
    address: address || "",
    metadata: metadata || [
      { key: "name", value: "joe" },
      { key: "name", value: "joe" }
    ],
    consent: consent || false
  }),
  validationSchema: schema,
  handleSubmit: values => {
    console.log(values);
  },
  displayName: "MyForm"
});

const MyForm = props => {
  const {
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = props;
  return (
    <Card
      className="justify-content-md-center mt-5 mb-5"
      as={Col}
      md={{ span: 10, offset: 1 }}
      lg={{ span: 6, offset: 3 }}
    >
      <Card.Body>
        <Card.Title>Profile</Card.Title>
        <hr />
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First name</Form.Label>
              <Field
                name="firstName"
                type={"firstName"}
                className="form-control"
              />
              <div className="invalid-feedback d-block">
                {errors.firstName && touched.firstName ? (
                  <div>{errors.firstName}</div>
                ) : null}
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last name</Form.Label>
              <Field
                name="lastName"
                type={"lastName"}
                className="form-control"
              />
              <div className="invalid-feedback d-block">
                {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null}
              </div>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Field
                name="password"
                type={"password"}
                className="form-control"
              />
              <div className="invalid-feedback d-block">
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridconfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Field
                name="confirmPassword"
                type={"password"}
                className="form-control"
              />
              <div className="invalid-feedback d-block">
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div>{errors.confirmPassword}</div>
                ) : null}
              </div>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Field name="email" type={"email"} className="form-control" />
              <div className="invalid-feedback d-block">
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPhone">
              <Form.Label>Phone</Form.Label>
              <Field
                name="phone"
                render={({ field }) => (
                  <MaskedInput
                    {...field}
                    mask={phoneNumberMask}
                    id="phone"
                    type="text"
                    className={
                      errors.phone && touched.phone
                        ? "form-control error"
                        : "form-control"
                    }
                  />
                )}
              />
              <div className="invalid-feedback d-block">
                {errors.phone && touched.phone ? (
                  <div>{errors.phone}</div>
                ) : null}
              </div>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCoutry">
              <Form.Label>Country</Form.Label>
              <CountryDropdown
                name="country"
                value={values.country}
                onChange={(_, e) => handleChange(e)}
                onBlur={handleBlur}
                className="custom-select"
              />
              <div className="invalid-feedback d-block">
                {errors.country && touched.country ? (
                  <div>{errors.country}</div>
                ) : null}
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCoutry">
              <Form.Label>State</Form.Label>
              <RegionDropdown
                name="state"
                country={values.country}
                value={values.state}
                onChange={(_, e) => handleChange(e)}
                onBlur={handleBlur}
                className="custom-select"
              />
              <div className="invalid-feedback d-block">
                {errors.state && touched.state ? (
                  <div>{errors.state}</div>
                ) : null}
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Field name="city" type={"city"} className="form-control" />
              <div className="invalid-feedback d-block">
                {errors.city && touched.city ? <div>{errors.city}</div> : null}
              </div>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Field name="address" type={"address"} className="form-control" />
              <div className="invalid-feedback d-block">
                {errors.address && touched.address ? (
                  <div>{errors.address}</div>
                ) : null}
              </div>
            </Form.Group>
          </Form.Row>

          <br />

          <Form.Row>
            <Card>
              <FieldArray
                name="metadata"
                render={arrayHelpers => (
                  <div>
                    <Card.Header>
                      <Row>
                        <Col md="8">
                          <h4>Metadata</h4>
                          <InputFeedback
                            error={
                              typeof errors.metadata === "string" ? (
                                <div>{errors.metadata}</div>
                              ) : null
                            }
                          />
                        </Col>
                        <Col md="3">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              arrayHelpers.push({ key: "", value: "" })
                            }
                          >
                            <i className="fas fa-plus" /> Add
                          </Button>
                        </Col>
                      </Row>
                    </Card.Header>

                    <Card.Body>
                      {values.metadata.map((meta, index) => (
                        <Form.Row key={index}>
                          <Form.Group
                            as={Col}
                            controlId="formGridMetadataKey"
                            className="align-middle"
                          >
                            <Form.Label>Key</Form.Label>
                            <Field
                              name={`metadata[${index}].key`}
                              type={"key"}
                              className="form-control"
                            />
                            <ErrorMessageMetadata
                              name={`metadata[${index}].key`}
                            />
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            controlId="formGridMetadataValue"
                            className="align-middle"
                          >
                            <Form.Label>Value</Form.Label>
                            <Field
                              name={`metadata.${index}.value`}
                              type={"value"}
                              className="form-control"
                            />
                            <ErrorMessageMetadata
                              name={`metadata[${index}].value`}
                            />
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            controlId="formGridMetadataCheck"
                            className="d-flex align-items-center"
                          >
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="mt-4"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <i className="fas fa-minus" />
                            </Button>
                          </Form.Group>
                        </Form.Row>
                      ))}
                    </Card.Body>
                  </div>
                )}
              />
            </Card>
          </Form.Row>

          <br />

          <Form.Group id="formGridCheckbox">
            <Field
              component={Checkbox}
              name="consent"
              id="consent"
              label="Agree to something"
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const ProfileForm = formik(MyForm);
