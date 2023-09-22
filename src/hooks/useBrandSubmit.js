import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import { CREATE_BRAND, UPDATE_BRAND  } from '../graphql/mutation';
import { GET_BRAND, GET_CATEGORY } from '../graphql/query';
import { notifyError, notifySuccess } from '../utils/toast';

const useBrandSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState('');
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [createBrand] = useMutation(CREATE_BRAND)
  const [updateBrand] = useMutation(UPDATE_BRAND)
  const [getBrand] = useLazyQuery(GET_BRAND)

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ picture, title, description, url }) => {
    if (!imageUrl) {
      notifyError('Picture is required!');
      return;
    }
    const brandData = {
      title: title,
      description: description,
      slug: "test-slug",
      url: url,
    };

    if (id) {
      updateBrand({variables: {
        id, 
        ...brandData
      }}).then((res) => {
        setIsUpdate(true);
        notifySuccess("Successfully Updated!");
      }).catch((err) => notifyError(err.message))
      closeDrawer();
    } else {
      createBrand({variables:{...brandData}}).then((res) => {
        setIsUpdate(true);
        notifySuccess("Successfully Created!");
      }).catch((err)=> notifyError(err.message))
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('slug');
      setValue("title");
      setValue('description');
      setValue('url');
      setImageUrl('');
      clearErrors('slug');
      clearErrors('title');
      clearErrors('description');
      clearErrors('url');
      return;
    }
    if (id) {
        getBrand({ variables: {id}}).then((res) =>{
        setValue('slug', res.data.brand.slug)
        setValue('title', res.data.brand.title)
        setValue('description', res.data.brand.description)
        setValue('url',res.data.brand.url)
      }).catch((err)=>{
        notifyError(err.message)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
  };
};

export default useBrandSubmit;
