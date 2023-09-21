import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_CATEGORIES } from '../../graphql/query';

import useAsync from '../../hooks/useAsync';
import CategoryServices from '../../services/CategoryServices';


const ChildrenCategory = ({ value }) => {
  const [categories, setCategories] = useState([]);

  // const { data } = useAsync(CategoryServices.getAllCategory);

  const {data} = useQuery(GET_CATEGORIES)

  useEffect(() => {
    if (value) {
      const result = data?.categories.filter((parent) =>
        parent.parent.toLowerCase().includes(value.toLowerCase())
      );
      setCategories(result);
    } else {
      setCategories(data);
    }
  }, [data, value]);

  return (
    <>
      {categories.map((parent) => {
        return parent.children.map((children) => (
          <option key={children} value={children}>
            {children}
          </option>
        ));
      })}
    </>
  );
};

export default ChildrenCategory;
