import React from 'react'
import useToggleDrawer from '../../hooks/useToggleDrawer'
import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import { Avatar, TableBody, TableCell, TableRow } from '@windmill/react-ui';
import VariantDrawer from '../drawer/VariantDrawer';
import { storjImage } from '../../services/StorjService';
import EditDeleteButton from '../table/EditDeleteButton';

const VariantTable = ({variants}) => {
    const {title, serviceId, handleModalOpen, handleUpdate} = useToggleDrawer();

    return (
        <>
            <MainModal id={serviceId} title={title} />
            <MainDrawer>
                <VariantDrawer />
            </MainDrawer>

            <TableBody>
                {variants?.map((item) => (
                    <TableRow key={item._id}>
                        <TableCell className='text-xs'>
                            {item._id.substring(20, 24)}
                        </TableCell>
                        <TableCell>
                            <Avatar
                                className="hidden mr-3 md:block bg-gray-50 p-1"
                                src={item?.picture && storjImage(item?.picture?.bucket, item?.picture?.key)}
                                // alt={item.title}
                            />
                        </TableCell>
                        <TableCell className='text-xs'>
                            {item.color}
                        </TableCell>
                        <TableCell className='text-sm'>
                            {item.size}
                        </TableCell>
                        <TableCell className='text-sm'>
                            {item.quantity}
                        </TableCell>
                        <TableCell className='text-sm'>
                            {item.price}
                        </TableCell>
                        <TableCell className='text-sm'>
                            {item.sale_price}
                        </TableCell>
                        <TableCell>
                            <EditDeleteButton
                                id={item._id}
                                title={'Variant'}
                                handleUpdate={handleUpdate}
                                handleModalOpen={handleModalOpen}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    )
}

export default VariantTable;