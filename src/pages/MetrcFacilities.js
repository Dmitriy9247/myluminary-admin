import React, { useContext, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
} from '@windmill/react-ui';
import { FiPlus } from 'react-icons/fi';
import NotFound from '../components/table/NotFound';
import Loading from '../components/preloader/Loading';
import PageTitle from '../components/Typography/PageTitle';
import ProductTable from '../components/product/ProductTable';
import SelectCategory from '../components/form/SelectCategory';
import MainDrawer from '../components/drawer/MainDrawer';
import ProductDrawer from '../components/drawer/ProductDrawer';
import axios from 'axios';

const MetrcFacilities = () => {
  const [facilityData, setFacilityData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://sandbox-api-dc.metrc.com/facilities/v2/',
        headers: { 
          'Authorization': 'Basic MmNZVEVHV0ZxWHFWVm1UcGYxQjZpTUpWQWVBaWVzaVJNcUduMmdvdzgxdXYybDZSOmhHS2pGamZuTHJHZDQ2V2NqUGZjRVNxTm9sck9XeURyOTdTclBMNnlqY3VETm41VQ=='
        }
      };
  
      try {
        setLoading(true);
        const response = await axios.request(config);
        setFacilityData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  useEffect(()=>{
    if (isUpdate){
      refetch()
      setIsUpdate(false)
    }
  },[isUpdate])

  return (
    <>
      <PageTitle>Facilities</PageTitle>

      {loading ? (
        <Loading loading={loading} />
      ) : data?.products || data?.products.products.length !== 0 ? (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Facility Name</TableCell>
                <TableCell>Facility Display Name</TableCell>
                <TableCell>Support Expiration Date</TableCell>
                <TableCell>Support Last Paid Date</TableCell>
                <TableCell>Is Medical</TableCell>
                <TableCell>Is Retail</TableCell>
                <TableCell>License End Data</TableCell>
                <TableCell>License Type</TableCell>
                {/* <TableCell className="text-center">Published</TableCell> */}
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <ProductTable products={facilityData} />
          </Table>
          {/* <TableFooter>
            <Pagination
              totalResults={data?.products.totalProducts}
              resultsPerPage={10}
              onChange={handleChangePage}
              label="Product Page Navigation"
            />
          </TableFooter> */}
        </TableContainer>
      ) : (
        <NotFound title="Product" />
      )}
    </>
  );
};

export default MetrcFacilities;
