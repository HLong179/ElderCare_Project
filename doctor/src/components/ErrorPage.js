import React from "react"
import { withRouter } from "react-router-dom"

import "./Error.css"
import Img404 from "../assets/404.jpg"

const ErrorPage = (props) => {
  return (
    <div className="site">
      <div className="img-error">
        <img src={Img404} alt="404" />
      </div>
      {/* <Link to={"/dashboard"} className="goback-button">
        Quay lại
      </Link> */}
      <div className="goback-button">
        <button onClick={() => props.history.push("/dashboard")}>
          QUAY LẠI
        </button>
      </div>
    </div>
  )
}

export default withRouter(ErrorPage)
