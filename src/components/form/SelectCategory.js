import React from 'react';
import { Select } from '@windmill/react-ui';
import SlugCategory from '../category/SlugCategory';

const SelectCategory = ({ setCategory }) => {
  return (
    <>
      <Select
        onChange={(e) => setCategory(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
      >
        <option value="" defaultValue>
          All Categories
        </option>
        <SlugCategory />
      </Select>
    </>
  );
};

export default SelectCategory;
