import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui"
import useToggleDrawer from "../../hooks/useToggleDrawer";
import MainDrawer from "../drawer/MainDrawer";
import MainModal from "../modal/MainModal"
import EditDeleteButton from "../table/EditDeleteButton";
import BrandDrawer from "./BrandDrawer";

const BrandTable = ({brands}) => {
    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

    return (
        <>
            <MainModal id={serviceId} title={title} />
            <MainDrawer>
                <BrandDrawer id={serviceId} />
            </MainDrawer>
            <TableBody>
                {brands?.map((item) => (
                    <TableRow key={item._id}>
                        <TableCell className="font-semibold uppercase text-xs">
                            {item._id.substring(20, 24)}
                        </TableCell>
                        <TableCell>
                            <Avatar
                                className="hidden mr-3 md:block bg-gray-50 p-1"
                                src={item.picture}
                            />
                        </TableCell>
                        <TableCell className="text-sm">
                            {item.title}
                        </TableCell>
                        <TableCell className="text-sm">
                            {item.url}
                        </TableCell>
                        <TableCell>
                            <EditDeleteButton
                                id={item._id}
                                title={item.title}
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

export default BrandTable