import { useQuery } from "@apollo/client"
import MainDrawer from "../components/drawer/MainDrawer"
import Loading from "../components/preloader/Loading"
import PageTitle from "../components/Typography/PageTitle"
import { GET_BRANDS } from "../graphql/query"
import NotFound from "../components/table/NotFound"
import { Pagination, Table, TableCell, TableContainer, TableFooter, TableHeader } from "@windmill/react-ui"
import useFilter from "../hooks/useFilter"
import BrandTable from "../components/brand/BrandTable"

const Brand = () => {
    const {data, loading} = useQuery(GET_BRANDS)

    const {
        categoryRef,
        setFilter,
        handleChangePage,
        totalResults,
        resultsPerPage,
        dataTable,
        serviceData,
        handleSubmitCategory,
      } = useFilter(data?.brands);

    return (
    <>
        <PageTitle>Brand</PageTitle>
        <MainDrawer></MainDrawer>

        {
            loading ? (
                <Loading loading={loading} />
            ) : serviceData && serviceData.length !== 0 ? (
                <>
                <TableContainer className="mb-8">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableCell>ID</TableCell>
                                <TableCell>Icon</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Url</TableCell>
                                <TableCell className="text-right">Actions</TableCell>
                            </tr>
                        </TableHeader>
                        <BrandTable brands={serviceData}></BrandTable>
                    </Table>
                </TableContainer>
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        onChange={handleChangePage}
                        label="Table navigation"
                    />
                </TableFooter>
                </>
            ) : (
                <>
                <NotFound title="Brand"></NotFound>
                </>
            )
        }
    </>
    )
}

export default Brand