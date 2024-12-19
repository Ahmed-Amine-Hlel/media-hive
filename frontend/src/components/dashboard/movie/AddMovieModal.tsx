"use client";

import React, {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FaPlus} from "react-icons/fa6";
import {Input} from "@/components/ui/input";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {languages} from "@/utils/languages";
import {Textarea} from "@/components/ui/textarea";
import {addMovie} from "@/services/movie/addMovie";
import useMovie from "@/hooks/movie/useMovie";

const AddMovieModal = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const {saveMovieToState} = useMovie();


    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            coverImage: "",
            duration: "",
            language: "",
            rating: ""
        },

        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            duration: Yup.string().required('Duration is required'),
            language: Yup.string().required('Language is required'),
            rating: Yup.number().required('Rating is required')
                .min(1, 'Rating must be greater than 0')
                .max(5, 'Rating must equal or less than 5'),
            coverImage: Yup.string()
                .url('Please enter a valid URL')
                .matches(/\.(jpeg|jpg|gif|png|bmp|webp)$/i, 'Image must be a valid image file (jpg, jpeg, png, gif, bmp, webp)')
                .required('Image is required')
        }),

        onSubmit: async (values) => {
            const {title, description, coverImage, duration, language, rating} = values;
            try {

                setError(null);
                setLoading(true);
                const newMovie = await addMovie({
                    title,
                    description,
                    coverImage,
                    duration,
                    language,
                    rating: Number(rating)
                });
                saveMovieToState(newMovie);
                setLoading(false);
                setOpen(false);
                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
                setError("An issue occurred while updating the movie");
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
                    New movie
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[32rem] max-h-[95%] overflow-y-auto" aria-describedby={undefined}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add new movie</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="fullName">
                                Title
                            </label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.title && formik.errors.title ? (
                                    <p className="text-red-500 text-sm">{formik.errors.title}</p>
                                ) : null
                            }
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="description">
                                Description
                            </label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full"
                            />
                            {
                                formik.touched.description && formik.errors.description ? (
                                    <p className="text-red-500 text-sm">{formik.errors.description}</p>
                                ) : null
                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="coverImage">
                                Image url
                            </label>
                            <Input
                                id="coverImage"
                                name="coverImage"
                                type="url"
                                value={formik.values.coverImage}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.coverImage && formik.errors.coverImage ? (
                                    <p className="text-red-500 text-sm">{formik.errors.coverImage}</p>
                                ) : null
                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="duration">
                                Duration
                            </label>
                            <Input
                                id="duration"
                                name="duration"
                                type="text"
                                value={formik.values.duration}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.duration && formik.errors.duration ? (
                                    <p className="text-red-500 text-sm">{formik.errors.duration}</p>
                                ) : null
                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="language">
                                Language
                            </label>
                            <Select
                                name="language"
                                value={formik.values.language}
                                onValueChange={(value) => formik.setFieldValue('language', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a language"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            languages.map((language, index) => (
                                                <SelectItem key={index} value={language}>
                                                    {language}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {
                                formik.touched.language && formik.errors.language ? (
                                    <p className="text-red-500 text-sm">{formik.errors.language}</p>
                                ) : null
                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="rating">
                                Rating
                            </label>
                            <Input
                                id="rating"
                                name="rating"
                                type="text"
                                value={formik.values.rating}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.rating && formik.errors.rating ? (
                                    <p className="text-red-500 text-sm">{formik.errors.rating}</p>
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

export default AddMovieModal;