import React from 'react';

import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../graphql/query';


const SlugCategory = () => {
  const { data } = useQuery(GET_CATEGORIES);

  return (
    <>
      {data?.categories.map((parent) => (
        <option key={parent._id} value={parent.slug}>
          {parent.title}
        </option>
      ))}
    </>
  );
};

export default SlugCategory;
