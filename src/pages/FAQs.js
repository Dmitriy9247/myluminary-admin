
import {
    Table,
    TableHeader,
    TableCell,
    TableFooter,
    TableContainer,
    Input,
    Card,
    CardBody,
    Pagination,
  } from '@windmill/react-ui';
import PageTitle from "../components/Typography/PageTitle"

import FAQTable from '../components/faq/FAQTable';

import { useQuery } from "@apollo/client"
import { GET_FAQS } from "../graphql/query"
import useFilter from "../hooks/useFilter"
import Loading from "../components/preloader/Loading"
import NotFound from '../components/table/NotFound';


const FAQs = () => {
    const {data, loading} = useQuery(GET_FAQS)
    const {
        handleChangePage,
        totalResults,
        resultsPerPage,
        dataTable,
        serviceData,
    } = useFilter(data?.faqs)
    return(
        <>
            <PageTitle>FAQs</PageTitle>
            {
                loading ? (
                    <Loading loading={loading}></Loading>
                ) : serviceData.length !== 0 ? (
                    <TableContainer className='mb-8'>
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Question</TableCell>
                                    <TableCell>FAQ Type</TableCell>
                                </tr>
                            </TableHeader>
                            <FAQTable faqs={dataTable}></FAQTable>
                        </Table>
                        <TableFooter>
                            <Pagination
                                totalResults={totalResults}
                                resultsPerPage={resultsPerPage}
                                onChange={handleChangePage}
                                label='Table navigation'
                            />
                        </TableFooter>
                    </TableContainer>
                ) : (
                    <NotFound title="FAQs" />
                )
            }
        </>
    )
}

export default FAQs