import React from "react";
import { CRow, CCol } from "@coreui/react";
import { BiMoney } from "react-icons/bi";
import { RiFundsLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CircularProgress from "util/CircularProgress";
var numeral = require("numeral");

const WidgetsDropDown = () => {
  // account
  const accountState = useSelector((state) => state.contributionReducer);
  const { mainAccount, bonusAccount } = accountState;
  const commonLoading = useSelector((state) => state.commonReducer);
  const { loading } = commonLoading;

  // const mainAccountBal =
  //   mainAccount.length &&
  //   mainAccount.map((acc) => {
  //     return (
  //       <>
  //         <div className=" d-flex justify-content-between pr-3">
  //           <h4 className="font-weight-bold">AccountID: {acc.bank_account_no}</h4>
  //           <span className="text-white  icon-position">
  //             <BiMoney className="fs-3" />
  //           </span>
  //         </div>
  //         <div className="d-block pr-3">
  //           <h4 className="mt-2 font-weight-bold">
  //             Balance: ₦{numeral(acc.bank_account_balance).format("0,0")}
  //           </h4>
  //           <p className="total-donations-received font-weight-bold">
  //             Type: {acc.bank_account_type["name"]}
  //           </p>
  //         </div>
  //       </>
  //     );
  //   });

  // const bonusAccountBal = (
  //   <>
  //     <div className=" d-flex justify-content-between pr-3">
  //       <h4>WalletID: {bonusAccount[0].walletID}</h4>
  //       <span className="text-white  icon-position">
  //         <BiMoney className="fs-3" />
  //       </span>
  //     </div>

  //     <div className="d-flex justify-content-between pr-3">
  //       <h4 className="mt-2 font-weight-bold">
  //         Balance: ₦{numeral(bonusAccount[0].wallet_balance).format("0,0")}
  //       </h4>
  //       <p className="font-weight-bold total-donations-received"></p>
  //     </div>
  //   </>
  // );

  return <CRow>
      <CCol sm="6" lg="4">
        <div className="pt-4 pl-3" style={{ height: "170px", backgroundColor: "#B1882C", color: "#fff" }}>
        {loading ? (
          <CircularProgress />
        ) : mainAccount.length ?
          <>
            <div className=" d-flex justify-content-between pr-3">
              <h4 className="font-weight-bold">AccountID: {mainAccount[0].bank_account_no}</h4>
              <span className="text-white  icon-position">
                <BiMoney className="fs-3" />
              </span>
            </div>
            <div className="d-block pr-3">
              <h4 className="mt-2 font-weight-bold">
                Balance: ₦{numeral(mainAccount[0].bank_account_balance).format("0,0")}
              </h4>
              <p className="total-donations-received font-weight-bold">
                Type: {mainAccount[0].bank_account_type["name"]}
              </p>
            </div>
          </>
          :
            <p className="text-center">You have no account setup yet</p>
        }
        </div>
      </CCol>

      <CCol sm="6" lg="4">
        <div className="ogaDonasi">
          <div className="ikon">
            <Link title="Click and fill in your detail" style={{ backgroundColor: "#B1882C" }} role="button" to="/dashboard/contribution/withdrawal">
              <span>Request Withdrawal</span>
            </Link>
          </div>
        </div>
      </CCol>

      <CCol sm="6" lg="4">
        <div className="pt-4 pl-3" style={{ height: "170px", backgroundColor: "#0C5421", color: "#fff" }}>
          {loading ? <CircularProgress /> : bonusAccount ? <>
            <div className=" d-flex justify-content-between pr-3">
              <h4>WalletID: {bonusAccount.walletID}</h4>
              <span className="text-white  icon-position">
                <BiMoney className="fs-3" />
              </span>
            </div>

            <div className="d-flex justify-content-between pr-3">
              <h4 className="mt-2 font-weight-bold">
                Balance: ₦{numeral(bonusAccount.wallet_balance).format("0,0")}
              </h4>
              <p className="font-weight-bold total-donations-received"></p>
            </div>
          </> :
            <p className="text-center">You have no wallet account setup yet</p>
          }
        </div>
      </CCol>
    </CRow>;
};

export default WidgetsDropDown;
