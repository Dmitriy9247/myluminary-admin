import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui"
import useToggleDrawer from "../../hooks/useToggleDrawer";
import MainDrawer from "../drawer/MainDrawer";
import MainModal from "../modal/MainModal"
import EditDeleteButton from "../table/EditDeleteButton";
import BlogDrawer from "./BlogDrawer";
import { storjImage } from "../../services/StorjService";

const BlogTable = ({blogs}) => {
    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

    return (
        <>
            <MainModal id={serviceId} title={title} />
            <MainDrawer>
                <BlogDrawer id={serviceId} />
            </MainDrawer>
            <TableBody>
                {blogs?.map((item) => (
                    <TableRow key={item._id}>
                        <TableCell className="font-semibold uppercase text-xs">
                            {item._id.substring(20, 24)}
                        </TableCell>
                        <TableCell>
                            <Avatar
                                className="hidden mr-3 md:block bg-gray-50 p-1"
                                src={item?.main_image && storjImage(item?.main_image.bucket, item?.main_image.key)}
                            />
                        </TableCell>
                        <TableCell className="text-sm">
                            {item.title}
                        </TableCell>
                        <TableCell className="text-sm">
                            {item.author}
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

export default BlogTable