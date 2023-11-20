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
import { storjImage } from '../../services/StorjService';

const FacilitiesTable = ({ facilities }) => {
  console.log(facilities.data);
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} title={title} />
      <MainDrawer>
        <ProductDrawer id={serviceId} />
      </MainDrawer>
      <TableBody>
        {facilities?.data?.map((facility, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-xs uppercase font-semibold">
                {' '}
                {facility?.Name}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-xs">{facility?.DisplayName}</span>
            </TableCell>
            <TableCell>
              <span className="text-xs">{facility?.SupportExpirationDate}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">{ facility?.SupportLastPaidDate }</span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">False</span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">False</span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">{ facility?.License.EndDate }</span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">{ facility?.License.LicenseType }</span>
            </TableCell>

            <TableCell>
              <Link
                to={`/product/${facility?.License.Number}`}
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
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default React.memo(FacilitiesTable);
