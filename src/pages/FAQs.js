
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
    Button,
  } from '@windmill/react-ui';
import PageTitle from "../components/Typography/PageTitle"

import FAQTable from '../components/faq/FAQTable';

import { useQuery } from "@apollo/client"
import { GET_FAQS } from "../graphql/query"
import useFilter from "../hooks/useFilter"
import Loading from "../components/preloader/Loading"
import NotFound from '../components/table/NotFound';
import { FiPlus } from 'react-icons/fi';
import MainDrawer from '../components/drawer/MainDrawer';
import FAQDrawer from '../components/drawer/FAQDrawer';
import { useContext } from 'react';
import { SidebarContext } from '../context/SidebarContext';


const FAQs = () => {
    const {data, loading} = useQuery(GET_FAQS)
    const {
        faqRef,
        handleChangePage,
        totalResults,
        resultsPerPage,
        dataTable,
        serviceData,
        handleSubmitFAQ,
    } = useFilter(data?.faqs)
    const {toggleDrawer} = useContext(SidebarContext);
    return(
        <>
            <PageTitle>FAQs</PageTitle>
            <MainDrawer>
                <FAQDrawer />
            </MainDrawer>
            <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
                <CardBody>
                <form
                    onSubmit={handleSubmitFAQ}
                    className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
                >
                    <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <Input
                            ref={faqRef}
                            className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                            type="search"
                            name="search"
                            placeholder="Search by FAQ Question"
                        />
                        <button
                            type="submit"
                            className="absolute right-0 top-0 mt-5 mr-1"
                        ></button>
                    </div>
                    <div className="w-full md:w-56 lg:w-56 xl:w-56">
                        <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                            <span className="mr-3">
                            <FiPlus />
                            </span>
                            Add FAQ
                        </Button>
                    </div>
                </form>
                </CardBody>
            </Card>
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
                                    <TableCell className='text-right'>Actions</TableCell>
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