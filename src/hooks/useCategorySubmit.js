import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import { CREATE_CATEGORY, UPDATE_CATEGORY } from '../graphql/mutation';
import { GET_CATEGORY } from '../graphql/query';
import { notifyError, notifySuccess } from '../utils/toast';
import { storjImage } from '../services/StorjService';
import slugify from 'slugify';

const useCategorySubmit = (id) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [children, setChildren] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [createCategory] = useMutation(CREATE_CATEGORY)
  const [updateCategory] = useMutation(UPDATE_CATEGORY)
  const [getCategory] = useLazyQuery(GET_CATEGORY)

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ parentId, title, description }) => {
    if (!imageUrl) {
      notifyError('Icon is required!');
      return;
    }
    const categoryData = {
      parentId: (parentId == "") ? null : parentId,
      title: title,
      description: description,
      slug: slugify(title, {lower:true}),
      pictureId: imageUrl.id,
      status: true,
    };

    if (id) {
      updateCategory({variables: {
        id, 
        ...categoryData
      }}).then((res) => {
        setIsUpdate(true);
        notifySuccess("Successfully Updated!");
        closeDrawer();
      }).catch((err) => notifyError(err.message))
    } else {
      createCategory({variables:{...categoryData}}).then((res) => {
        setIsUpdate(true);
        notifySuccess("Successfully Created!");
        closeDrawer();
      }).catch((err)=> notifyError(err.message))
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('slug');
      setValue("title");
      setValue('description');
      setValue('parentId');
      setImageUrl(null);
      setChildren([]);
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
        if(res.data.category.picture){
          const{_id, bucket, key} = res.data.category.picture
          setImageUrl({id:_id, url:storjImage(bucket, key)})
        }
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
    children,
    setChildren,
  };
};

export default useCategorySubmit;
