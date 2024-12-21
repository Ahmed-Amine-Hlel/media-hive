"use client";

import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as Yup from "yup";
import {useFormik} from "formik";
import {loginUser} from "@/services/user/loginUser";
import useUser from "@/hooks/user/useUser";
import {setCookie} from "cookies-next";
import {calculateMaxAge} from "@/utils/calculateMaxAge";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";
import useMovie from "@/hooks/movie/useMovie";


const SignInForm = () => {

    const [authError, setAuthError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const {
        setUser,
        setToken
    } = useUser();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters long')
                .matches(/\d/, 'Password must contain at least one digit')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .required('Password is required')

        }),
        onSubmit: async (values) => {
            const {email, password} = values;

            try {
                setAuthError(null);
                setLoading(true);
                const response = await loginUser(email, password);

                if (response.user.role !== 'admin') {
                    setAuthError('Only admins can access this dashboard');
                    setLoading(false);
                    return;
                }

                setUser(response.user);
                const maxAge = calculateMaxAge(response.token);
                setCookie('token', response.token, {
                    secure: true,
                    sameSite: 'strict',
                    maxAge
                });
                setToken(response.token);
                setLoading(false);

                router.push('/');

            } catch (error) {
                console.log(error instanceof AxiosError)
                console.log(error)
                setLoading(false);
                if (error instanceof AxiosError && error.status === 401) {
                    setAuthError('Invalid email or password');
                } else {
                    setAuthError('Could not login. Please try again later');
                }
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-5">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                >
                    Email Address
                </label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="text-white"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            {
                formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm mb-4">
                        {formik.errors.email}
                    </div>
                ) : null
            }

            <div className="mb-5">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                >
                    Password
                </label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="text-white"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

            </div>

            {
                formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm mb-4">
                        {formik.errors.password}
                    </div>
                ) : null
            }

            {authError && (
                <div className="mb-4 text-red-500 text-center text-sm">
                    {authError}
                </div>
            )}

            <Button
                type="submit"
                className="w-full bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-center transition-colors"
                disabled={loading || formik.isSubmitting}
            >
                {
                    loading || formik.isSubmitting ? (
                            "Loading..."
                        ) :
                        "Login"
                }
            </Button>

        </form>
    );
};

export default SignInForm;