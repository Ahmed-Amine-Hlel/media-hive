import React, {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Genre} from "@/types/Genre";
import {updateGenre} from "@/services/genre/updateGenre";
import useGenre from "@/hooks/genre/useGenre";

interface UpdateGenreModalProps {
    genre: Genre;
}

const UpdateGenreModal = ({genre}: UpdateGenreModalProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const {updateGenreState} = useGenre();

    const formik = useFormik({
        initialValues: {
            name: genre.name || "",
            description: genre.description || "",
        },

        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            description: Yup.string().required('Description is required'),
        }),

        onSubmit: async (values) => {
            const {name, description} = values;
            try {
                setError(null);
                setLoading(true);
                const updatedGenre = await updateGenre(genre.id, {name, description});
                updateGenreState(genre.id, updatedGenre);
                setLoading(false);
                setOpen(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError("An issue occurred while updating the genre");
            }
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-600">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[32rem] max-h-[95%] overflow-y-auto">
                <form onSubmit={formik.handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Update Genre</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">
                                Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <p className="text-red-500 text-sm">{formik.errors.name}</p>
                            ) : null}
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
                            {formik.touched.description && formik.errors.description ? (
                                <p className="text-red-500 text-sm">{formik.errors.description}</p>
                            ) : null}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button
                            type="submit"
                            className="bg-gradient-to-b from-gray-800 to-gray-900"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Save changes'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateGenreModal;
