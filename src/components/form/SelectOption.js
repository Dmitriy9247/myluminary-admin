import React from "react";
import { Select } from "@windmill/react-ui";

import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../graphql/query';

const SelectOption = ({ register, name, label, require=true}) => {
  const {data} = useQuery(GET_CATEGORIES)
  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, require && {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue>Select Category</option>
        {data?.categories.map((parent) => (
        <option key={parent._id} value={parent._id}>
          {parent.title}
        </option>
      ))}
      </Select>
    </>
  );
};

export default SelectOption;
