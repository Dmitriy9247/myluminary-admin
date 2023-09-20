import React from 'react';

import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../graphql/query';


const ParentCategory = () => {
  const { data, loading } = useQuery(GET_CATEGORIES);

  return (
    <>
      {data?.categories.filter((item)=> item.children.length > 0).map((parent) => (
        <option key={parent._id} value={parent._id}>
          {parent.title}
        </option>
      ))}
    </>
  );
};

export default ParentCategory;
