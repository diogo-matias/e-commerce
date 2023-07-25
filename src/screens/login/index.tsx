import { BaseButton } from "../../components/base-button";
import { BaseInput } from "../../components/base-input";
import { Header } from "../../components/header";
import { Formik, Form, useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../../hooks/redux";
import { UserActions } from "../../store/modules/user";
import { useState } from "react";

export function LoginScreen() {
    const dispatch = useAppDispatch();

    const [buttonHover, setButtonHover] = useState(false);

    const registerValidationSchema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup
            .string()
            .email("Enter a valid email")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "Password should be of minimum 8 characters length")
            .required("Password is required"),
    });

    const loginValidationSchema = yup.object({
        email: yup
            .string()
            .email("Enter a valid email")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "Password should be of minimum 8 characters length")
            .required("Password is required"),
    });

    const registerFormik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            dispatch(UserActions.createUser(values));
        },
        validationSchema: registerValidationSchema,
    });

    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
        validationSchema: loginValidationSchema,
    });

    return (
        <div>
            <Header shouldUseCustomStyle={false} />
            <div className="container p-44 h-screen mx-auto flex">
                <div className="w-1/2 h-full border-r p-10">
                    <p className="text-center text-xl font-bold tracking-widest mb-10">
                        LOGIN
                    </p>

                    <form onSubmit={loginFormik.handleSubmit}>
                        <div className="flex-col space-y-5">
                            <BaseInput
                                className="h-12"
                                name="email"
                                placeholder="Email"
                                value={loginFormik.values.email}
                                onChange={loginFormik.handleChange}
                                onBlur={loginFormik.handleBlur}
                                hasError={loginFormik.touched.email}
                                errorMessage={loginFormik.errors.email}
                                containerStyle="h-20"
                            />
                            <BaseInput
                                className="h-12"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginFormik.values.password}
                                onChange={loginFormik.handleChange}
                                onBlur={loginFormik.handleBlur}
                                hasError={loginFormik.touched.password}
                                errorMessage={loginFormik.errors.password}
                                containerStyle="h-20"
                            />
                            <BaseButton
                                type="submit"
                                className="rounded-full text-sm"
                                label="Submit"
                            />
                        </div>
                    </form>
                </div>
                <div className="w-1/2 h-full p-10">
                    <p className="text-center text-xl font-bold tracking-widest mb-10">
                        REGISTER
                    </p>

                    <form onSubmit={registerFormik.handleSubmit}>
                        <div className="flex-col space-y-5">
                            <BaseInput
                                className="h-12"
                                name="name"
                                placeholder="Name"
                                value={registerFormik.values.name}
                                onChange={registerFormik.handleChange}
                                onBlur={registerFormik.handleBlur}
                                hasError={registerFormik.touched.name}
                                errorMessage={registerFormik.errors.name}
                                containerStyle="h-20"
                            />
                            <BaseInput
                                className="h-12"
                                name="email"
                                placeholder="Email"
                                value={registerFormik.values.email}
                                onChange={registerFormik.handleChange}
                                onBlur={registerFormik.handleBlur}
                                hasError={registerFormik.touched.email}
                                errorMessage={registerFormik.errors.email}
                                containerStyle="h-20"
                            />
                            <BaseInput
                                className="h-12"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={registerFormik.values.password}
                                onChange={registerFormik.handleChange}
                                onBlur={registerFormik.handleBlur}
                                hasError={registerFormik.touched.password}
                                errorMessage={registerFormik.errors.password}
                                containerStyle="h-20"
                            />
                            <BaseButton
                                style={{
                                    color: buttonHover ? "white" : "black",
                                }}
                                onMouseEnter={() => setButtonHover(true)}
                                onMouseLeave={() => setButtonHover(false)}
                                type="submit"
                                className="rounded-full text-sm bg-transparent border text-gray-950 border-black hover:border-none transition-all hover:text-white hover:bg-black"
                                label="Register"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
