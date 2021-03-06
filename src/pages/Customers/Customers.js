import React from 'react';
import {
  CCard, CCardBody, CCol, CDataTable, CRow
} from '@coreui/react';
import API from '../../utils/api';
import { HTTP_SUCCESS, CUSTOMERS } from '../../utils/constants';
import { PageLoader } from '../../components/Loaders';

export default class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      processing: false,

      customers: []
    }
  };

  async componentDidMount() {
    document.title = "Customers | BGC";
    this.getCustomers();
  };

  getCustomers = async () => {
    this.setState({ loading: true });
    let response = await API.getAsync(`${CUSTOMERS}`);
    if (HTTP_SUCCESS.includes(response.status)) {
      this.setState({ customers: response.data, loading: false });
    } else {
      this.setState({ loading: false });
      //Add Error Alerts Messages here
      // console.log("An error occured while retreiving Customers data");
    }
  };

  render() {
    return (
      <div>
        <CRow>
          {this.state.loading ? <PageLoader /> : null}
          <CCol xl={12}>
            <CCard>
              <CCardBody>
                <CDataTable
                  items={this.state.customers}
                  fields={[
                    { key: 'customer_id', label: 'Customer Id', _classes: 'font-weight-bold' },
                    { key: 'name', label: 'Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'phone', label: 'Phone' },
                    { key: 'income', label: 'Income' },
                    { key: 'region', label: 'Region' },
                    { key: 'gender', label: 'Gender' },
                    { key: 'marital_status', label: 'Marital Status' }
                  ]}
                  scopedSlots={{
                    'marital_status':
                      (item) => (
                        <td>{item.marital_status ? "Married" : item.marital_status === false ? "Single" : "Unknown"}</td>
                      )
                  }}
                  hover
                  pagination
                  columnFilter={true}
                  itemsPerPage={10}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    )
  }
}