'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Textarea } from '@/components/ui/textarea';
import { addGenre } from '@/services/genre/addGenre';
import useGenre from '@/hooks/genre/useGenre';

const AddGenreModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { saveGenreToState } = useGenre();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
    }),

    onSubmit: async (values, { resetForm }) => {
      const { name, description } = values;
      try {
        setError(null);
        setLoading(true);
        const newGenre = await addGenre({
          name,
          description,
        });
        saveGenreToState(newGenre);
        resetForm();
        setLoading(false);
        setOpen(false);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError('An issue occurred while adding the genre');
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-gradient-to-b from-gray-800 to-gray-900">
          <FaPlus />
          New genre
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[32rem] max-h-[95%] overflow-y-auto"
        aria-describedby={undefined}
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add new genre</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Genre Name</label>
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
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full"
              />
              {formik.touched.description && formik.errors.description ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.description}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-b from-gray-800 to-gray-900"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Save genre'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGenreModal;
