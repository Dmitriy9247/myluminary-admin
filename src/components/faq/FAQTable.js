import { TableCell, TableBody, TableRow } from '@windmill/react-ui';

const FAQTable = ({faqs}) => {
    return (
        <>
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
                        </TableRow>
                    ))
                }
            </TableBody>
        </>
    )
}

export default FAQTable;