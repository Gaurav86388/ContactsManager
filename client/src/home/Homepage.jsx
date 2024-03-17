import React, { useState } from "react";
import "./Homepage.css";
import Signin from "../auth/Signin";
import Signup from "../auth/Signup";
import Loader from "../extra/Loader"

function Circle({ circleName, size, tableName }) {
  if (size === "small dots") {
    return (
      <table className={tableName}>
        <tbody className="table-circle">
          {Array.from({ length: 6 }, (item,index) => {
            const rowkey = String(index) + "row"
            return (
              <tr key={rowkey} className="table-circle-row">
                {Array.from({ length: 7 }, (item, index) => {

                  const colkey = String(index) + "col"
                  return <td className="circle" id={circleName} key={colkey}/>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return <div className="circle" id={circleName} />;
}

const Homepage = () => {

const [signIn, setSignIn] = useState(true)
const [signinSuccess, setSigninSuccess] = useState(false)

function handleSignToggle(){
    setSignIn(prev=>!prev)
}


  return (<>
    {signinSuccess && <Loader />}
    <div className="homepage-container">
      <div className="content-outside">
        <Circle circleName="first-circle" />
        <Circle
          circleName="small-circle"
          size="small dots"
          tableName="top-table"
        />

        <div className="content-inside">
          <h1 className="logo">Logo</h1>
          <>
          {signIn ?
          <Signin handleSignUpToggle={handleSignToggle} setSigninSuccess={setSigninSuccess}/>
          :
          <Signup handleSignUpToggle ={handleSignToggle}/>
        }
          </>
        </div>

        <Circle
          circleName="small-circle"
          size="small dots"
          tableName="bottom-table"
        />
        <Circle circleName="second-circle" />
      </div>
    </div>
    </>
  );
};

export default Homepage;
