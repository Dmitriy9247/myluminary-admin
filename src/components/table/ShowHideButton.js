import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';

import { notifySuccess, notifyError } from '../../utils/toast';
import ProductServices from '../../services/ProductServices';
import CategoryServices from '../../services/CategoryServices';
import { SidebarContext } from '../../context/SidebarContext';
import { useMutation } from '@apollo/client';
import { UPDATE_CATEGORY } from '../../graphql/mutation';

const ShowHideButton = ({ id, status }) => {
  const location = useLocation();
  const { setIsUpdate } = useContext(SidebarContext);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  const handleChangeStatus = (id) => {
    let newStatus;
    if (status === true) {
      newStatus = false;
    } else {
      newStatus = true;
    }

    if (location.pathname === '/category') {
      const updatedData = {
        status: newStatus
      }
      updateCategory({variables: {
        id:id,
        ...updatedData
      }}).then((res)=>{
        setIsUpdate(true);
        notifySuccess(res.message);
      }).catch((err) => notifyError(err.message))
    }

    if (location.pathname === '/products') {
      ProductServices.updateStatus(id, { status: newStatus })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
  };

  return (
    <span
      className="cursor-pointer text-xl flex justify-center text-center"
      onClick={() => handleChangeStatus(id)}
    >
      {status === true ? (
        <BsToggleOn className="text-green-500" />
      ) : (
        <BsToggleOff className="text-orange-500" />
      )}
    </span>
  );
};

export default ShowHideButton;
