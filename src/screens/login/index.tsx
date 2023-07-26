import { BaseButton } from "../../components/base-button";
import { BaseInput } from "../../components/base-input";
import { Header } from "../../components/header";
import { Formik, Form, useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../../hooks/redux";
import { UserActions } from "../../store/modules/user";
import { useEffect, useState } from "react";
import { Breakpoint } from "../../utils/breakpoints";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export function LoginScreen() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [shouldRenderLoginForm, setShouldRenderLoginForm] = useState(true);
    const [shouldRenderRegisterForm, setShouldRenderRegisterForm] =
        useState(true);

    const [mobileButtonHover, setMobileButtonHover] = useState(false);
    const [registerButtonHover, setRegisterButtonHover] = useState(false);
    const breakpointSm = Breakpoint("sm");

    useEffect(() => {
        setShouldRenderRegisterForm(!breakpointSm);

        if (!breakpointSm && !shouldRenderLoginForm) {
            setShouldRenderLoginForm(true);
        }
    }, [breakpointSm]);

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
            dispatch(UserActions.login(values));
        },
        validationSchema: loginValidationSchema,
    });

    function renderLoginForm() {
        if (!shouldRenderLoginForm) {
            return null;
        }

        return (
            <div className="sm:w-1/2 w-full border-r p-10">
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
        );
    }

    function renderRegisterForm() {
        if (!shouldRenderRegisterForm) {
            return null;
        }

        return (
            <div className="w-full sm:w-1/2 h-full p-10">
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
                                color: registerButtonHover ? "white" : "black",
                            }}
                            onMouseEnter={() => setRegisterButtonHover(true)}
                            onMouseLeave={() => setRegisterButtonHover(false)}
                            type="submit"
                            className="rounded-full text-sm bg-transparent border text-gray-950 border-black hover:border-none transition-all hover:text-white hover:bg-black"
                            label="Register"
                        />
                    </div>
                </form>
            </div>
        );
    }

    function handleMobileButtonClick() {
        if (!shouldRenderRegisterForm) {
            setShouldRenderRegisterForm(true);
            setShouldRenderLoginForm(false);
        } else {
            setShouldRenderRegisterForm(false);
            setShouldRenderLoginForm(true);
        }
    }

    function renderRegisterMobileButton() {
        return (
            <div className="px-10 block sm:hidden">
                <BaseButton
                    style={{
                        color: mobileButtonHover ? "white" : "black",
                    }}
                    onClick={handleMobileButtonClick}
                    onMouseEnter={() => setMobileButtonHover(true)}
                    onMouseLeave={() => setMobileButtonHover(false)}
                    type="button"
                    className="rounded-full text-sm bg-transparent border text-gray-950 border-black hover:border-none transition-all hover:text-white hover:bg-black"
                    label={shouldRenderRegisterForm ? "Login" : "Register"}
                />
            </div>
        );
    }

    return (
        <div>
            <Header shouldUseCustomStyle={false} />
            <div className="container w-full pt-44 md:px-22 lg:px-44  mx-auto flex">
                {renderLoginForm()}

                {renderRegisterForm()}
            </div>
            {renderRegisterMobileButton()}
        </div>
    );
}
