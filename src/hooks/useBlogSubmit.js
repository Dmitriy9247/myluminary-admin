import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import { CREATE_POST, UPDATE_POST  } from '../graphql/mutation';
import { GET_BLOG, GET_CATEGORY } from '../graphql/query';
import { notifyError, notifySuccess } from '../utils/toast';
import { storjImage } from '../services/StorjService';

const useBrandSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState('');
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [createPost] = useMutation(CREATE_POST)
  const [updatePost] = useMutation(UPDATE_POST)
  const [getBlog] = useLazyQuery(GET_BLOG)

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ main_image, title, author,  content, postType, slug}) => {
    if (!imageUrl) {
      notifyError('Picture is required!');
      return;
    }
    const blogData = {
      title: title,
      main_image: imageUrl.id,
      content: content,
      author: author,
      postType : postType,
      slug : slug
    };

    if (id) {
      updatePost({variables: {
        id, 
        ...blogData
      }}).then((res) => {
        setIsUpdate(true);
        notifySuccess("Successfully Updated!");
      }).catch((err) => notifyError(err.message))
      closeDrawer();
    } else {
      createPost({variables:{...blogData}}).then((res) => {
        setIsUpdate(true);
        notifySuccess("Successfully Created!");
      }).catch((err)=> notifyError(err.message))
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("title");
      setValue('content');
      setValue("author");
      setValue('slug');
      setValue("postType");
      setImageUrl('');
      clearErrors('slug');
      clearErrors('title');
      clearErrors('content');
      clearErrors('author');
      clearErrors('postType');
      clearErrors('slug');
      return;
    }
    if (id) {
        getBlog({ variables: {id}}).then((res) =>{
            setValue('title', res.data.post.title)
            setValue('content', res.data.post.content)
            setValue('author', res.data.post.author)
            setValue('postType', res.data.post.postType)
            setValue('slug', res.data.post.slug)         
            if(res.data.post.main_image){
                const{_id, bucket, key} = res.data.post.main_image
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
  };
};

export default useBrandSubmit;
