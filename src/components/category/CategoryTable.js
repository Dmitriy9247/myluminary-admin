import React from 'react';
import { TableBody, TableRow, TableCell, Avatar } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import ShowHideButton from '../table/ShowHideButton';
import CategoryDrawer from '../drawer/CategoryDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';
import { storjImage } from '../../services/StorjService';

const CategoryTable = ({ categories }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} title={title} />
      <MainDrawer>
        <CategoryDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {categories?.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="font-semibold uppercase text-xs">
              {item._id.substring(20, 24)}
            </TableCell>
            <TableCell>
              <Avatar
                className="hidden mr-3 md:block bg-gray-50 p-1"
                src={item?.picture && storjImage(item?.picture?.bucket, item?.picture?.key)}
                // alt={item.title}
              />
            </TableCell>
            <TableCell className="text-sm">{item.title}</TableCell>
            <TableCell className="text-sm ">{item.parent && item.parent.title}</TableCell>
            <TableCell className="font-medium text-sm">
              <div className="flex flex-row">
                {item?.children?.map((child, i) => (
                  <span
                    key={i + 1}
                    className="bg-gray-200 mr-2 border-0 text-gray-500 rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold font-serif mt-2 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {child.title}
                  </span>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <ShowHideButton id={item._id} status={item.status} />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={item._id}
                title={item.title}
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

export default CategoryTable;
