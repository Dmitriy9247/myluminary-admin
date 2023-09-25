import { useLazyQuery, useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '../graphql/mutation';
import { GET_PRODUCT } from '../graphql/query';
import ProductServices from '../services/ProductServices';
import { notifyError, notifySuccess } from '../utils/toast';
import { storjImage } from '../services/StorjService';

const useProductSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [children, setChildren] = useState('');
  const [tag, setTag] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [getProduct] = useLazyQuery(GET_PRODUCT);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!imageUrl) {
      notifyError('Image is required!');
      return;
    }
    if (data.originalPrice < data.salePrice) {
      notifyError('SalePrice must be less then or equal of product price!');
      return;
    }

    const productData = {
      name: data.name,
      slug: data.slug
        ? data.slug
        : data.name.toLowerCase().replace('&', '').split(' ').join('-'),
      short_description: data.short_description,
      long_description: data.long_description,
      category: data.category,
      type: data.type,
      pictures: [imageUrl.id],
      // tag: JSON.stringify(tag),
    };

    if (id) {
      updateProduct({variables:{ id,
        ...productData
      }}).then((res) => {
        setIsUpdate(true)
        notifySuccess("Successfully Updated!")
      }).catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      createProduct({variables:{
        ...productData
      }}).then((res) => {
        setIsUpdate(true)
        notifySuccess("Successfully Added!");
      }).catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('name');
      setValue('slug');
      setValue('short_description');
      setValue('long_description');
      setValue('category');
      setImageUrl(null);
      setTag([]);
      setValue('name');
      setValue('slug');
      setValue('short_description');
      setValue('long_description');
      setValue('category');
      return;
    }

    if (id) {
      getProduct({variables: {id}})
        .then((res) => {
          if (res) {
            const {data} = res
            setValue('name', data.product.name);
            setValue('slug', data.product.slug);
            setValue('short_description', data.product.short_description);
            setValue('long_description', data.product.long_description);
            setValue('category', data.product.category._id);
            if(data.product.pictures && data.product.pictures.length > 0){
              const {_id, bucket, key} = data.product.pictures[0]
              setImageUrl({id:_id, url:storjImage(bucket, key)})
            }
          }
        })
        .catch((err) => {
          notifyError('There is a server error!');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  useEffect(() => {
    setChildren(watch('children'));
  }, [watch, children]);

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
  };
};

export default useProductSubmit;
