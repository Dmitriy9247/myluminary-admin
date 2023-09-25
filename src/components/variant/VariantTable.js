import React from 'react'
import useToggleDrawer from '../../hooks/useToggleDrawer'
import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import { TableBody, TableCell, TableRow } from '@windmill/react-ui';
import VariantDrawer from '../drawer/VariantDrawer';

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
                        <TableCell>
                            {item._id.substring(20, 24)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    )
}

export default VariantTable;