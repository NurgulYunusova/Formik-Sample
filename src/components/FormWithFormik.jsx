import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function FormWithFormik() {
  const addProductValidationSchema = Yup.object().shape({
    companyName: Yup.string().required("Company Name field cannot be empty!"),
    contactName: Yup.string().required("Contact Name field cannot be empty!"),
    contactTitle: Yup.string().required("Contact Title field cannot be empty!"),
    address: Yup.object().shape({
      city: Yup.string().required("City field cannot be empty!"),
      country: Yup.string().required("Country field cannot be empty!"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      contactName: "",
      contactTitle: "",
      address: {
        city: "",
        country: "",
      },
    },
    validationSchema: addProductValidationSchema,
    onSubmit: (values) => {
      console.log(values);

      axios
        .post("https://northwind.vercel.app/api/customers", values)
        .then((response) => {
          console.log(response);
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <>
          <div>
            <label htmlFor="companyName">Company Name</label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.companyName}
            />
            <p style={{ color: "red" }}>{formik.errors?.companyName}</p>
          </div>

          <div>
            <label htmlFor="contactName">Contact Name</label>
            <input
              id="contactName"
              name="contactName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.contactName}
            />
            <p style={{ color: "red" }}>{formik.errors?.contactName}</p>
          </div>

          <div>
            <label htmlFor="contactTitle">Contact Title</label>
            <input
              id="contactTitle"
              name="contactTitle"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.contactTitle}
            />
            <p style={{ color: "red" }}>{formik.errors?.contactTitle}</p>
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="address.city"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address.city}
            />
            <p style={{ color: "red" }}>{formik.errors?.address?.city}</p>
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              name="address.country"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address.country}
            />
            <p style={{ color: "red" }}>{formik.errors?.address?.country}</p>
          </div>

          <button type="submit">Add</button>
        </>
      </form>
    </>
  );
}

export default FormWithFormik;
