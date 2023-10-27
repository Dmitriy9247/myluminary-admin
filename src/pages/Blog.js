import { useQuery } from "@apollo/client"
import MainDrawer from "../components/drawer/MainDrawer"
import Loading from "../components/preloader/Loading"
import PageTitle from "../components/Typography/PageTitle"
import { GET_BLOGS } from "../graphql/query"
import NotFound from "../components/table/NotFound"
import { Button, Card, CardBody, Input, Pagination, Table, TableCell, TableContainer, TableFooter, TableHeader } from "@windmill/react-ui"
import useFilter from "../hooks/useFilter"
import BlogTable from "../components/blog/BlogTable"
import { useContext, useEffect } from "react"
import { SidebarContext } from "../context/SidebarContext"
import BlogDrawer from "../components/blog/BlogDrawer"
import { FiPlus } from "react-icons/fi"

const Blog = () => {
    const {data, loading, refetch} = useQuery(GET_BLOGS)
    const {toggleDrawer, isUpdate, setIsUpdate} = useContext(SidebarContext)
    const {
        brandRef,
        handleChangePage,
        totalResults,
        resultsPerPage,
        dataTable,
        serviceData,
        handleSubmitBrand,
      } = useFilter(data?.posts);

      useEffect(()=>{
        if (isUpdate){
          refetch()
          setIsUpdate(false)
        }
      },[isUpdate])

    return (
    <>
        <PageTitle>Blogs</PageTitle>
        <MainDrawer>
            <BlogDrawer />
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
                            placeholder="Search by Blog title"
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
                            Add Blog
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
                                <TableCell>Author</TableCell>
                                <TableCell className="text-right">Actions</TableCell>
                            </tr>
                        </TableHeader>
                        <BlogTable blogs={dataTable}></BlogTable>
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
                <NotFound title="Blog"></NotFound>
                </>
            )
        }
    </>
    )
}

export default Blog