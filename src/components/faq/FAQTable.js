import { TableCell, TableBody, TableRow } from '@windmill/react-ui';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';
import MainModal from '../modal/MainModal';

const FAQTable = ({faqs}) => {
    const {title, serviceId, handleModalOpen, handleUpdate} = useToggleDrawer();
    return (
        <>
            <MainModal id={serviceId} title={title} />

            <TableBody>
                {
                    faqs?.map((faq) => (
                        <TableRow key={faq._id}>
                            <TableCell>
                                <span className='font-semibold uppercase text-xs'>
                                    {' '}
                                    {faq._id.substring(20, 24)}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>{faq.question}</span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>{faq.faq_type}</span>
                            </TableCell>
                            <TableCell>
                            <EditDeleteButton
                                id={faq._id}
                                title={faq.question}
                                handleUpdate={handleUpdate}
                                handleModalOpen={handleModalOpen}
                            />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </>
    )
}

export default FAQTable;