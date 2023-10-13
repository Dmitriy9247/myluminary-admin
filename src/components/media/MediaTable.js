import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import MainModal from "../modal/MainModal"
import { storjImage } from "../../services/StorjService";
import { useContext, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import Tooltip from "../tooltip/Tooltip";
import { FiTrash } from "react-icons/fi";

const MediaTable = ({ medias }) => {

    const [mediaId, setMediaId] = useState('');
    const { toggleModal } = useContext(SidebarContext);
    const [title, setTitle] = useState('');

    const handleModalOpen = (id, title) => {
        setMediaId(id);
        toggleModal();
        setTitle(title);
    };

    return (
        <>
            <MainModal id={mediaId} title={title} />
            <TableBody>
                {medias?.map((item, i) => (
                    <TableRow key={item._id}>
                        <TableCell>
                            <span className="text-xs uppercase font-semibold">
                                {' '}
                                {item._id.substring(18, 26)}
                            </span>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center">
                                <Avatar 
                                    className="p-1"
                                    src={storjImage(item.bucket, item.key)}
                                >
                                </Avatar>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className="text-xs">{item.bucket}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-xs">{item.key}</span>
                        </TableCell>
                        <TableCell>
                        <div
                            onClick={() => handleModalOpen(item._id, item.key)}
                            className="p-2 cursor-pointer text-gray-400 hover:text-red-600 text-right"
                            >
                            <Tooltip
                                id="delete"
                                Icon={FiTrash}
                                title="Delete"
                                bgColor="#F87171"
                            />
                        </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
        )
}

export default MediaTable