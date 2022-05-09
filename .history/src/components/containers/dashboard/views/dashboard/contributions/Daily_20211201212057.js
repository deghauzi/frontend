import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { fetchDailyContributions } from "store/actions/Contributions";
import CircularProgress from "util/CircularProgress";

var numeral = require("numeral");

const Auction = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDailyContributions());
  }, []);

  const auctionState = useSelector((state) => state.contributionReducer);
  const { dailyContributions} = auctionState;

  const commonLoading = useSelector((state) => state.commonReducer);
  const { loading } = commonLoading ;

  return (
    <>
      <h4 className="text-uppercase text-center mb-4 mt-4">Daily Contributions</h4>
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
                    <th className="text-center">Balance</th>
                    <th className="text-center">Created By</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>

                {/* table body */}
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      height: "3rem",
                      weight: "100%",
                      alignItem: "center",
                      marginTop: "10px",
                      justifyItem: "center",
                      border: "#000"
                    }}
                  >
                    <CircularProgress />
                  </div>
                ) : dailyContributions.length ? (
                  dailyContributions.map((bid) => {
                    const {
                      id,
                      amount,
                      account,
                      balance_after_transaction,
                      created_by_admin_user,
                      transaction_type,
                      created
                    } = bid;
                    const transactionText =
                      transaction_type === 1
                        ? "Deposit"
                        : transaction_type === 2
                        ? "Withdrawal"
                        : transaction_type === 3
                        ? "Interest"
                        : "no transaction";

                    const transactionStyle =
                      transaction_type === 1
                        ? "text-white bg-success"
                        : transaction_type == 2
                        ? "text-white bg-danger"
                        : transaction_type === 3
                        ? "bg-amber"
                        : "text-white bg-grey";
                    return (
                      <tbody>
                        <tr key={id}>
                          <td className="text-center">
                            <div>{id}</div>
                          </td>
                          <td className="text-center">
                            <div>{account['bank_account_no']}</div>
                          </td>
                          <td className="text-center">
                            <div>₦{numeral(amount).format("0,0")}</div>
                          </td>
                          <td className="text-center">
                            <div>₦{numeral(balance_after_transaction).format("0,0")}</div>
                          </td>
                          <td className="text-center">
                            <div>{created_by_admin_user}</div>
                          </td>
                          <td className="text-center">
                            <div>{created.substring(0, 10)}</div>
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

export default Auction;
