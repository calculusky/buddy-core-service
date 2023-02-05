import * as Yup from "yup";

import { LoginOptions, RegistrationOptions } from "./interfaces";

export const LoginSchema: Yup.SchemaOf<LoginOptions> = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});

export const RegistrationSchema: Yup.SchemaOf<RegistrationOptions> =
    Yup.object().shape({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    });
