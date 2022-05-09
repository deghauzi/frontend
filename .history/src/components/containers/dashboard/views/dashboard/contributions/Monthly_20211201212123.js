import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { fetchMonthlyContributions } from "store/actions/Contributions";
import CircularProgress from "util/CircularProgress";


var numeral = require("numeral");



const Monthly = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMonthlyContributions());
  }, []);

  const contributionState = useSelector((state) => state.contributionReducer);
  const { monthlyContributions} = contributionState;

  const commonLoading = useSelector((state) => state.commonReducer);
  const { loading } = commonLoading ;

  return (
    <>
      <h4 className="text-uppercase text-center mb-4 mt-4">Monthly Contributions</h4>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              {/* table */}
              <table className="table table-hover table-outline mb-0 d-sm-table">
                {/* table header */}
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">TransID</th>
                    <th className="text-center">Account No</th>
                    <th className="text-center">Amount</th>
                    <th className="text-center">Created By</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Type</th>
                    <th className="text-center">Trans Type</th>
                  </tr>
                </thead>
                {/* table body */}
                {loading ? (
                  <div style={{"display":"flex","height":"3rem","weight":"100%",
                  "alignItem": "center","marginTop":"10px","justifyItem":"center",
                  "border":"#000"}}>
                    <CircularProgress />
                  </div>
                ) : monthlyContributions.length ? (
                  monthlyContributions.map((bid) => {
                    const contribution_type =
                      bid.contribution_type === 1
                        ? "Year Contribution"
                        : bid.contribution_type == 2
                        ? "Sallah Contribution"
                        : bid.contribution_type === 3
                        ? "Hajj/Umrah Pilgrimage"
                        : bid.contribution_type === 4
                        ? "Jerusalem Pilgrimage"
                        : bid.contribution_type === 5
                        ? "Car Facility"
                        : "Mortgage Facilty";

                    const transactionText =
                      bid.transaction_type === 1
                        ? "Deposit"
                        : bid.transaction_type === 2
                        ? "Withdrawal"
                        : bid.transaction_type === 3
                        ? "Interest"
                        : "no transaction";

                    const transactionStyle =
                      bid.transaction_type === 1
                        ? "text-white bg-success"
                        : bid.transaction_type == 2
                        ? "text-white bg-danger"
                        : bid.transaction_type === 3
                        ? "bg-amber"
                        : "text-white bg-grey";

                    return (
                      <tbody>
                        <tr key={bid.id}>
                          <td className="text-center">
                            <div>{bid.id}</div>
                          </td>
                          <td className="text-center">
                            <div>{bid.account["bank_account_no"]}</div>
                          </td>
                          <td className="text-center">
                            <div>₦{numeral(bid.contribution_amount).format("0,0")}</div>
                          </td>
                          <td className="text-center">
                            <div>{bid.created_by_admin_user}</div>
                          </td>
                          <td className="text-center">
                            <div>{bid.created.substring(0, 10)}</div>
                          </td>
                          <td className="text-center">
                            <div>{contribution_type}</div>
                          </td>
                          <td className="text-center">
                            <div className={` badge text-uppercase ${transactionStyle}`}>
                              {transactionText}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                ) : (
                  <div className="text-center">
                    <h6>You have no transactions yet.</h6>
                  </div>
                )}
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Monthly;
