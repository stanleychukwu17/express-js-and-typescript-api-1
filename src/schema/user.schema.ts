import { object, string, ref } from "yup";

// userSchema - mostly for registering a new user
export const createUserSchema = object({
    body: object({
        name: string()
            .required("Name is required")
            .min(3, "Name is too short, must be minimum of 3 characters"),
        password: string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "Passwords must match"
        ),
        email: string()
            .email("Must be a valid email")
            .required("Email is required"),
      }),
})

// sessionSchema - mostly for when a user wants to login
export const createUserSessionSchema = object({
    body: object({
      password: string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),

      email: string()
            .email("Must be a valid email")
            .required("Email is required"),
    }),
  });