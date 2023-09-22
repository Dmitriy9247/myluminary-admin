import { useQuery } from "@apollo/client"
import MainDrawer from "../components/drawer/MainDrawer"
import Loading from "../components/preloader/Loading"
import PageTitle from "../components/Typography/PageTitle"
import { GET_BRANDS } from "../graphql/query"
import NotFound from "../components/table/NotFound"
import { Button, Card, CardBody, Input, Pagination, Table, TableCell, TableContainer, TableFooter, TableHeader } from "@windmill/react-ui"
import useFilter from "../hooks/useFilter"
import BrandTable from "../components/brand/BrandTable"
import { useContext } from "react"
import { SidebarContext } from "../context/SidebarContext"
import BrandDrawer from "../components/brand/BrandDrawer"
import { FiPlus } from "react-icons/fi"

const Brand = () => {
    const {data, loading} = useQuery(GET_BRANDS)
    const {toggleDrawer, isUpdate, setIsUpdate} = useContext(SidebarContext)
    const {
        brandRef,
        handleChangePage,
        totalResults,
        resultsPerPage,
        dataTable,
        serviceData,
        handleSubmitBrand,
      } = useFilter(data?.brands);

    return (
    <>
        <PageTitle>Brand</PageTitle>
        <MainDrawer>
            <BrandDrawer />
        </MainDrawer>

        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
            <CardBody>
                <form 
                    onSubmit={handleSubmitBrand}
                    className="py-3 grid gap-4 lg:gap-6 md:flex"
                >
                    <div className="flex-grow-0 md:flex-grow">
                        <Input
                            ref={brandRef}
                            className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                            type="search"
                            name="search"
                            placeholder="Search by Brand title"
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-5 mr-1">
                        </button>
                    </div>
                    <div className="w-full md:w-56 lg:w-56 xl:w-56">
                        <Button
                            type="button"
                            onClick={toggleDrawer}
                            className="w-full rounded-md h-12"
                        >
                            <span className="mr-3">
                            <FiPlus />
                            </span>
                            Add Brand
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>

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
                        <BrandTable brands={dataTable}></BrandTable>
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