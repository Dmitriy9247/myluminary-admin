import { useContext, useEffect } from "react"
import { SidebarContext } from "../context/SidebarContext"
import { useQuery } from "@apollo/client";
import { GET_MEDIAS } from "../graphql/query";
import PageTitle from "../components/Typography/PageTitle";
import Loading from "../components/preloader/Loading";
import NotFound from '../components/table/NotFound';
import { Pagination, Table, TableCell, TableContainer, TableFooter, TableHeader } from "@windmill/react-ui";
import MediaTable from "../components/media/MediaTable";


const Medias = () => {
    const {
        limitData,
        currentPage,
        isUpdate,
        setIsUpdate,
        handleChangePage
    } = useContext(SidebarContext);

    const {data, loading, refetch} = useQuery(GET_MEDIAS, { variables:{
        limit: limitData,
        skip: currentPage - 1
    }})

    useEffect(() => {
        if (isUpdate) {
            refetch()
            setIsUpdate(false)
        }
    })

    return (
    <>
        <PageTitle>Medias</PageTitle>
                <TableContainer className="mb-8 rounded-b-lg">
                    {
                        loading ? (
                        <Loading loading={loading}></Loading>
                    ) : data?.medias || data?.medias.medias.length !== 0 ? (
                            <Table>
                                <TableHeader>
                                    <tr>
                                        <TableCell>
                                            ID
                                        </TableCell>
                                        <TableCell>
                                            Image
                                        </TableCell>
                                        <TableCell>
                                            Bucket
                                        </TableCell>
                                        <TableCell>
                                            Object
                                        </TableCell>
                                        <TableCell className="text-right">
                                            Actions
                                        </TableCell>
                                    </tr>
                                </TableHeader>
                                <MediaTable medias={data?.medias.medias}></MediaTable>
                            </Table>) : (
                        <NotFound title="Media" />
                    )}
                    <TableFooter>
                        <Pagination
                            totalResults={data?.medias.totalMedias || 0}
                            resultsPerPage={limitData}
                            onChange={handleChangePage}
                            label="Media Page Navigation" 
                        />
                    </TableFooter>
                </TableContainer>
    </>
    )
}

export default Medias