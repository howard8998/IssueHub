import * as Yup from "yup";

export const taskSchema = Yup.object({
  title: Yup.string()
    .required("Title is required"),
  body: Yup.string()
    .required("Body is required")
    .min(30, "Body must be at least 30 characters"),
});
