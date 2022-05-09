import DateTimePicker from "react-widgets/lib/DateTimePicker";

export const validate = (values) => {
    const errors = {};
    if (!values.first_name) {
        errors.first_name = "Required";
    }
    if (!values.last_name) {
        errors.last_name = "Required";
    }
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 8) {
        errors.password = "Must be 8 characters or more";
    }
    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }
    return errors;
};

export const renderField = ({
    input,
    label,
    type,
    className,
    meta: { touched, error, warning },
}) => (
    <div>
    <input {...input} className={className} placeholder={label} type={type} />
    {touched &&
      ((error && <div style={{ color: "red", fontSize: "10px" }}>{error}</div>) ||
        (warning && <div>{warning}</div>))}
  </div>
);


export const checkoutRenderField = ({
    input,
    placeholder,
    type,
    className,
    meta: { touched, error },
}) => {
    return (
        <div>
      <input {...input} type={type} className={className} placeholder={placeholder} />
      {touched && error && <p style={{ color: "red", fontSize: "10px" }}>{error}</p>}
    </div>
    );
};

export const renderInput = ({ input, type, meta, mime }) => {
    return (
        <div>
      <input
        name={input.name}
        type={type}
        accept={mime}
        onChange={(event) => handleChange(event, input)}
      />
      {meta && meta.invalid && meta.error && (
        <p style={{ color: "red", fontSize: "10px" }}>{meta.error}</p>
      )}
    </div>
    );
};
export const handleChange = (event, input) => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    if (imageFile) {
        const localImageUrl = URL.createObjectURL(imageFile);
        const imageObject = new window.Image();

        imageObject.onload = () => {
            imageFile.width = imageObject.naturalWidth;
            imageFile.height = imageObject.naturalHeight;
            input.onChange(imageFile);
            URL.revokeObjectURL(imageFile);
        };
        imageObject.src = localImageUrl;
    }
};

export const renderDateTimePicker = ({ input: { onChange, value }, showTime }) => (
    <DateTimePicker
    onChange={onChange}
    format="YYYY-MM-DD"
    time={false}
    value={!value ? null : new Date(value)}
  />
);

export const validateBilling = (values) => {
    const errors = {};
    if (!values.first_name) {
        errors.first_name = "Required";
    }
    if (!values.last_name) {
        errors.last_name = "Required";
    }
    if (!values.street_address) {
        errors.street_address = "Required";
    }
    if (!values.state_name) {
        errors.state_name = "Required";
    }
    if (!values.city_name) {
        errors.city_name = "Required";
    }
    if (!values.store_name) {
        errors.store_name = "Required";
    }
    if (!values.zip) {
        errors.zip = "Required";
    }
    if (!values.phone) {
        errors.phone = "Required";
    }
    return errors;
};
export const validateShipping = (values) => {
    const errors = {};
    if (!values.first_name) {
        errors.first_name = "Required";
    }
    if (!values.last_name) {
        errors.last_name = "Required";
    }
    if (!values.street_address) {
        errors.address = "Required";
    }
    if (!values.state_name) {
        errors.state_name = "Required";
    }
    if (!values.city_name) {
        errors.city_name = "Required";
    }
    return errors;
};

// import React from "react";
// import PropTypes from "prop-types";
// import { Field, reduxForm } from "redux-form";
// import { Button, Form, Message, Card, Image, Grid } from "semantic-ui-react";

// class SimpleForm extends React.Component {
//   static propTypes = {
//     previewLogoUrl: PropTypes.string,
//     mimeType: PropTypes.string,
//     maxWeight: PropTypes.number,
//     maxWidth: PropTypes.number,
//     maxHeight: PropTypes.number,
//     // redux-form porps
//     handleSubmit: PropTypes.func.isRequired
//   };
//   static defaultProps = {
//     previewLogoUrl: "https://imgplaceholder.com/400x300",
//     mimeType: "image/jpeg, image/png",
//     maxWeight: 100,
//     maxWidth: 100,
//     maxHeight: 100
//   };
//   validateImageWeight = imageFile => {
//     if (imageFile && imageFile.size) {
//       // Get image size in kilobytes
//       const imageFileKb = imageFile.size / 1024;
//       const { maxWeight } = this.props;

//       if (imageFileKb > maxWeight) {
//         return `Image size must be less or equal to ${maxWeight}kb`;
//       }
//     }
//   };
//   validateImageWidth = imageFile => {
//     if (imageFile) {
//       const { maxWidth } = this.props;

//       if (imageFile.width > maxWidth) {
//         return `Image width must be less or equal to ${maxWidth}px`;
//       }
//     }
//   };
//   validateImageHeight = imageFile => {
//     if (imageFile) {
//       const { maxHeight } = this.props;

//       if (imageFile.height > maxHeight) {
//         return `Image height must be less or equal to ${maxHeight}px`;
//       }
//     }
//   };
//   validateImageFormat = imageFile => {
//     if (imageFile) {
//       const { mimeType } = this.props;

//       if (!mimeType.includes(imageFile.type)) {
//         return `Image mime type must be ${mimeType}`;
//       }
//     }
//   };
//   handlePreview = imageUrl => {
//     const previewImageDom = document.querySelector(".preview-image");
//     previewImageDom.src = imageUrl;
//   };
//   handleChange = (event, input) => {
//     event.preventDefault();
//     let imageFile = event.target.files[0];
//     if (imageFile) {
//       const localImageUrl = URL.createObjectURL(imageFile);
//       const imageObject = new window.Image();

//       imageObject.onload = () => {
//         imageFile.width = imageObject.naturalWidth;
//         imageFile.height = imageObject.naturalHeight;
//         input.onChange(imageFile);
//         URL.revokeObjectURL(imageFile);
//       };
//       imageObject.src = localImageUrl;
//       this.handlePreview(localImageUrl);
//     }
//   };
//   renderFileInput = ({ input, type, meta }) => {
//     const { mimeType } = this.props;
//     return (
//       <div>
//         <input
//           name={input.name}
//           type={type}
//           accept={mimeType}
//           onChange={event => this.handleChange(event, input)}
//         />
//         {meta && meta.invalid && meta.error && (
//           <p style={{color:"red", fontSize:"10px"}}>{error}</p>
//         )}
//       </div>
//     );
//   };
//   handleSubmitForm = values => {
//     console.log("Form Values: ", values);
//   };
//   render() {
//     const {
//       previewLogoUrl,
//       maxWidth,
//       maxHeight,
//       maxWeight,
//       handleSubmit
//     } = this.props;
//     return (
//       <Grid centered style={{ height: "100%" }} verticalAlign="middle" padded>
//         <Grid.Column style={{ maxWidth: 400 }}>
//           <Card fluid>
//             <Image
//               src={previewLogoUrl}
//               alt="preview"
//               className="preview-image"
//               style={{ height: "300px", objectFit: "cover" }}
//             />
//             <Card.Content>
//               <Card.Header>Redux Form: Image Validation</Card.Header>
//               <Card.Meta>Form Meta</Card.Meta>
//               <Card.Description>
//                 Image has to:
//                 <ul>
//                   <li>be JPEG or PNG</li>
//                   <li>have Width ≤ {maxWidth}px</li>
//                   <li>have Height ≤ {maxHeight}px</li>
//                   <li>have Size ≤ {maxWeight}kb</li>
//                 </ul>
//               </Card.Description>
//             </Card.Content>
//             <Card.Content>
//               <Form>
//                 <Form.Field>
//                   <Field
//                     name="image"
//                     type="file"
//                     validate={[
//                       this.validateImageWeight,
//                       this.validateImageWidth,
//                       this.validateImageHeight,
//                       this.validateImageFormat
//                     ]}
//                     component={this.renderFileInput}
//                   />
//                 </Form.Field>
//                 <Button
//                   primary
//                   type="submit"
//                   className="form-submit-button"
//                   onClick={handleSubmit(this.handleSubmitForm)}
//                 >
//                   Submit
//                 </Button>
//               </Form>
//             </Card.Content>
//           </Card>
//         </Grid.Column>
//       </Grid>
//     );
//   }
// }

// export default reduxForm({
//   form: "simple"
// })(SimpleForm);