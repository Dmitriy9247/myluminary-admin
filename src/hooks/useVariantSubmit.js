import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError, notifySuccess } from '../utils/toast';
import { storjImage } from '../services/StorjService';
import { CREATE_VARIANT } from '../graphql/mutation';
import { useParams } from 'react-router';


const useVariantSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [children, setChildren] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [createVariant] = useMutation(CREATE_VARIANT);
  const { id:productId } = useParams();


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

    console.log(variantData)
    if (id) {
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
      setValue('sale_price')
      setImageUrl(null);
      clearErrors('color');
      clearErrors('size');
      clearErrors('quantity');
      clearErrors('sale_price');
      clearErrors('price');
      return;
    }
    if (id) {
    //   getCategory({ variables: {id}}).then((res) =>{
    //     setValue('slug', res.data.category.slug)
    //     setValue('title', res.data.category.title)
    //     setValue('description', res.data.category.description)
    //     setValue('parentId', res.data.category.parent?._id)
    //     if(res.data.category.picture){
    //       const{_id, bucket, key} = res.data.category.picture
    //       setImageUrl({id:_id, url:storjImage(bucket, key)})
    //     }
    //   }).catch((err)=>{
    //     notifyError(err.message)
    //   })
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
