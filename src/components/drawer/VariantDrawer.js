import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ReactTagInput from '@pathofdev/react-tag-input';

import Error from '../form/Error';
import Title from '../form/Title';
import InputArea from '../form/InputArea';
import LabelArea from '../form/LabelArea';
import DrawerButton from '../form/DrawerButton';
import Uploader from '../image-uploader/Uploader';
import useVariantSubmit from '../../hooks/useVariantSubmit';

const VariantDrawer = ({ id }) => {

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
  } = useVariantSubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Variant"
            description="Updated your Product variant and necessary information from here"
          />
        ) : (
          <Title
            title="Add Variant"
            description=" Add your Product variant and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Variant Picture" />
              <div className="col-span-8 sm:col-span-4">
                <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Variant Color" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Variant color"
                  name="color"
                  type="text"
                  placeholder="Variant color"
                />
                <Error errorName={errors.color} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Variant size" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Variant size"
                  name="size"
                  type="number"
                  placeholder="Variant size"
                />
                <Error errorName={errors.size} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Variant quantity" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Variant quantity"
                  name="quantity"
                  type="number"
                  placeholder="Variant quantity"
                />
                <Error errorName={errors.quantity} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Variant price" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Variant price"
                  name="price"
                  type="number"
                  placeholder="Variant price"
                />
                <Error errorName={errors.price} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Variant sale price" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Variant sale price"
                  name="sale_price"
                  type="number"
                  placeholder="Variant sale price"
                />
                <Error errorName={errors.sale_price} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Category" />
        </form>
      </Scrollbars>
    </>
  );
};

export default VariantDrawer;
