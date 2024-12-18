"use client";

import React, {useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useActor from "@/hooks/actor/useActor";
import {addActor} from "@/services/actor/addActor";
import {FaPlus} from "react-icons/fa6";

const AddActorModal = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const {saveActorToState} = useActor();


    const formik = useFormik({
        initialValues: {
            fullName: "",
            dateOfBirth: "",
            image: ""
        },

        validationSchema: Yup.object({
            fullName: Yup.string().required('Full name is required'),
            dateOfBirth: Yup.date().required('Date of birth is required'),
            image: Yup.string()
                .url('Please enter a valid URL')
                .matches(/\.(jpeg|jpg|gif|png|bmp|webp)$/i, 'Image must be a valid image file (jpg, jpeg, png, gif, bmp, webp)')
                .required('Image is required')
        }),

        onSubmit: async (values) => {
            const {fullName, dateOfBirth, image} = values;
            try {
                setError(null);
                setLoading(true);
                const newActor = await addActor({fullName, dateOfBirth: new Date(dateOfBirth), image});
                saveActorToState(newActor);
                setOpen(false);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError("An issue occurred while updating the actor");
            }
        }
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="flex items-center gap-2 bg-gradient-to-b from-gray-800 to-gray-900"
                >
                    <FaPlus/>
                    New actor
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[26rem]" aria-describedby={undefined}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add new actor</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="fullName">
                                Full name
                            </label>
                            <Input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.fullName && formik.errors.fullName ? (
                                    <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
                                ) : null
                            }
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="dateOfBirth">
                                Date of birth
                            </label>
                            <Input
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                                value={formik.values.dateOfBirth ? new Date(formik.values.dateOfBirth).toISOString().split('T')[0] : ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full"
                            />
                            {
                                formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                                    <p className="text-red-500 text-sm">{formik.errors.dateOfBirth as string}</p>
                                ) : null
                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="image">
                                Image url
                            </label>
                            <Input
                                id="image"
                                name="image"
                                type="url"
                                value={formik.values.image}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.image && formik.errors.image ? (
                                    <p className="text-red-500 text-sm">{formik.errors.image}</p>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>
                            {
                                error && <p className="text-red-500 text-sm">{error}</p>
                            }
                        </div>
                        <Button
                            type="submit"
                            className="bg-gradient-to-b from-gray-800 to-gray-900"
                            disabled={loading}
                        >
                            {
                                loading ? 'Loading...' : 'Save changes'
                            }
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddActorModal;