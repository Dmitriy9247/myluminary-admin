import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Error from '../form/Error';
import Title from '../form/Title';
import InputArea from '../form/InputArea';
import LabelArea from '../form/LabelArea';
import DrawerButton from '../form/DrawerButton';
import Uploader from '../image-uploader/Uploader';
import useBlogSubmit from '../../hooks/useBlogSubmit';
import { Select, Textarea } from "@windmill/react-ui";
const BlogDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
  } = useBlogSubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Blog"
            description="Update your posted Blog here"
          />
        ) : (
          <Title
            title="Add Blog"
            description=" Add your new Blog from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Blog Picture" />
              <div className="col-span-8 sm:col-span-4">
                <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Blog Title" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Blog title"
                  name="title"
                  type="text"
                  placeholder="Blog title"
                />
                <Error errorName={errors.title} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Blog Author" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Author"
                  name="author"
                  type="text"
                  placeholder="Blog Author"
                />
                <Error errorName={errors.author} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Blog Type" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Blog Type"
                  name="postType"
                  type="text"
                  placeholder="Blog Post Type"
                />
                <Error errorName={errors.postType} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Blog Slug" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Blog Slug"
                  name="slug"
                  type="text"
                  placeholder="Blog slug"
                />
                <Error errorName={errors.slug} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Blog Content" />
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    {
                        ...register('content', {
                            required: 'Content is required!',
                        })
                    }
                    name="content"
                    type="text"
                    placeholder="Blog Content"
                />
                <Error errorName={errors.content} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Blog" />
        </form>
      </Scrollbars>
    </>
  );
};

export default BlogDrawer;
