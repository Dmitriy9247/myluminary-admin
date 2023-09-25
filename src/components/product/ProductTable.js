import React from 'react';
import { Link } from 'react-router-dom';
import {
  TableCell,
  TableBody,
  TableRow,
  Badge,
  Avatar,
} from '@windmill/react-ui';
import { FiZoomIn } from 'react-icons/fi';

import Tooltip from '../tooltip/Tooltip';
import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import ProductDrawer from '../drawer/ProductDrawer';
import EditDeleteButton from '../table/EditDeleteButton';
import useToggleDrawer from '../../hooks/useToggleDrawer';

const ProductTable = ({ products }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} title={title} />
      <MainDrawer>
        <ProductDrawer id={serviceId} />
      </MainDrawer>
      <TableBody>
        {products?.map((product, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-xs uppercase font-semibold">
                {' '}
                {product._id.substring(18, 26)}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Avatar
                  className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                  src={product.image}
                />
                <div>
                  <h2 className="text-sm font-medium">{product.name}</h2>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-xs">{product?.short_description}</span>
            </TableCell>
            <TableCell>
              <span className="text-xs">{product?.category.title}</span>
            </TableCell>

            <TableCell>
              {/* <span className="text-sm font-semibold">${`${product.price[0]} - ${product.price[1]}`}</span> */}
            </TableCell>

            <TableCell>
              <Link
                to={`/product/${product._id}`}
                className="flex justify-center text-center text-gray-400 hover:text-green-600"
              >
                <Tooltip
                  id="details"
                  Icon={FiZoomIn}
                  title="Details"
                  bgColor="#10B981"
                />
              </Link>
            </TableCell>
            {/* <TableCell>
              <ShowHideButton id={product._id} status={product.status} />
            </TableCell> */}
            <TableCell>
              <EditDeleteButton
                id={product._id}
                title={product.title}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default React.memo(ProductTable);
