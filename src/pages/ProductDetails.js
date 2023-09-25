import { Badge, Button, Table, TableCell, TableContainer, TableHeader } from '@windmill/react-ui';
import React from 'react';
import { useParams } from 'react-router';

import MainDrawer from '../components/drawer/MainDrawer';
import Loading from '../components/preloader/Loading';
import PageTitle from '../components/Typography/PageTitle';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../graphql/query';
import { storjImage } from '../services/StorjService';
import VariantTable from '../components/variant/VariantTable';
import { useContext } from 'react';
import { FiPlus } from 'react-icons/fi';
import { SidebarContext } from '../context/SidebarContext';
import VariantDrawer from '../components/drawer/VariantDrawer';

const ProductDetails = () => {
  const { id } = useParams();
  // const { handleUpdate } = useToggleDrawer();
  const { toggleDrawer, isUpdate, setIsUpdate } = useContext(SidebarContext);

  // const { data, loading } = useAsync(() => ProductServices.getProductById(id));
  const {data, loading} = useQuery(GET_PRODUCT, {variables:{id}})

  return (
    <>
      <MainDrawer>
        <VariantDrawer />
      </MainDrawer>

      <PageTitle>Product Details</PageTitle>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
          <div className="flex flex-col lg:flex-row md:flex-row w-full overflow-hidden">
            <div className="flex-shrink-0 flex items-center justify-center h-auto">
              <img 
                src={(data.product.pictures && data.product.pictures.length > 0) ? storjImage(data.product.pictures[0].bucket, data.product.pictures[0].key) : ""} 
                alt={data.product.title} 
                />
            </div>
            <div className="w-full flex flex-col p-5 md:p-8 text-left">
              <div className="mb-5 block ">
                <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold font-serif dark:text-gray-400">
                  {data.product.name}
                </h2>
                <p className="uppercase font-serif font-medium text-gray-500 dark:text-gray-400 text-sm">
                  SKU :{' '}
                  <span className="font-bold text-gray-500 dark:text-gray-500">
                    {data.product._id !== undefined && data.product._id.substring(18, 24)}
                  </span>
                </p>
                <p className="uppercase font-serif font-medium text-gray-500 dark:text-gray-400 text-sm">
                  SLUG :{' '}
                  <span className="font-bold text-gray-500 dark:text-gray-500">
                    {data.product.slug && data.product.slug}
                  </span>
                </p>
              </div>
              <p className="text-sm leading-6 text-gray-500 dark:text-gray-400 md:leading-7">
                {data.product.short_description}
              </p>
              <p className="text-xs leading-6 text-gray-500 dark:text-gray-400 md:leading-7">
                {data.product.long_description}
              </p>
              <div className="flex flex-col mt-4">
                <p className="font-serif font-semibold py-1 text-gray-500 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Category:{' '}
                  </span>{' '}
                  {data.product.category.title}
                </p>
              </div>
            </div>
          </div>
          <div className='w-full flex justify-end'>
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <form>
                <Button
                  type="button"
                  onClick={toggleDrawer}
                  className="w-full rounded-md h-12"
                >
                  <span className="mr-3">
                    <FiPlus />
                  </span>
                  Add Variant
                </Button>
                </form>
            </div>
          </div>

          <TableContainer className='my-8'>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>ID</TableCell>
                  <TableCell>Picture</TableCell>
                  <TableCell>color</TableCell>
                  <TableCell>size</TableCell>
                  <TableCell>quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Sale Price</TableCell>
                  <TableCell className='text-right'>Actions</TableCell>
                </tr>
              </TableHeader>
              <VariantTable variants={data.product.variants} />
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
