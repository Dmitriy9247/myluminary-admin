import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError, notifySuccess } from '../utils/toast';
import { storjImage } from '../services/StorjService';
import { CREATE_VARIANT, UPDATE_VARIANT } from '../graphql/mutation';
import { useParams } from 'react-router';
import { GET_VARIANT } from '../graphql/query';


const useVariantSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [children, setChildren] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [createVariant] = useMutation(CREATE_VARIANT);
  const [updateVariant] = useMutation(UPDATE_VARIANT);
  const { id:productId } = useParams();
  const [getVariant] = useLazyQuery(GET_VARIANT);


  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ color, size, quantity, price, sale_price }) => {
    if (!imageUrl) {
      notifyError('Icon is required!');
      return;
    }

    const variantData = {
        color: color,
        size: Number(size),
        quantity: Number(quantity),
        price: Number(price),
        sku: `${color}${sale_price}`,
        sale_price: Number(sale_price),
        picture: imageUrl.id,
        product: productId,
    };

    if (id) {
        updateVariant({variables: {id, ...variantData}}).then((res)=> {
            setIsUpdate(true);
            notifySuccess("Successfully created!");
        }).catch((err) => notifyError("Something went wrong!"))
      closeDrawer();
    } else {
        createVariant({variables: {...variantData}}).then((res)=> {
            setIsUpdate(true);
            notifySuccess("Successfully created!");
        }).catch((err) => notifyError("Something went wrong!"))
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('color');
      setValue("size");
      setValue('quantity');
      setValue('price');
      setValue('sale_price');
      setImageUrl(null);
      clearErrors('color');
      clearErrors('size');
      clearErrors('quantity');
      clearErrors('sale_price');
      clearErrors('price');
      return;
    }
    if (id) {
        getVariant({variables:{id}}).then((res)=>{
            setValue('color', res.data.variant.color);
            setValue("size", res.data.variant.size);
            setValue('quantity', res.data.variant.quantity);
            setValue('price', res.data.variant.price);
            setValue('sale_price', res.data.variant.sale_price);
            if(res.data.variant.picture){
                const{_id, bucket, key} = res.data.variant.picture
                setImageUrl({id:_id, url:storjImage(bucket, key)})
              }
        }).catch((err)=>{
            notifyError("Something Went Wrong")
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

export default useVariantSubmit;
