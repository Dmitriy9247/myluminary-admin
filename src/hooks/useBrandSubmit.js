import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import { CREATE_BRAND, CREATE_CATEGORY, UPDATE_CATEGORY } from '../graphql/mutation';
import { GET_CATEGORY } from '../graphql/query';
import { notifyError, notifySuccess } from '../utils/toast';

const useBrandSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState('');
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [createCategory] = useMutation(CREATE_CATEGORY)
  const [updateCategory] = useMutation(UPDATE_CATEGORY)
  const [createBrand] = useMutation(CREATE_BRAND)
  const [getCategory] = useLazyQuery(GET_CATEGORY)

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
    //   updateCategory({variables: {
    //     id, 
    //     ...categoryData
    //   }}).then((res) => {
    //     setIsUpdate(true);
    //     notifySuccess("Successfully Updated!");
    //   }).catch((err) => notifyError(err.message))
    //   closeDrawer();
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
      setValue('parentId');
      setImageUrl('');
      clearErrors('slug');
      clearErrors('title');
      clearErrors('description');
      return;
    }
    if (id) {
      getCategory({ variables: {id}}).then((res) =>{
        setValue('slug', res.data.category.slug)
        setValue('title', res.data.category.title)
        setValue('description', res.data.category.description)
        setValue('parentId', res.data.category.parent?._id)
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
