import { Fragment } from "react";
import { Avatar } from "antd";
import css from "./Card.module.scss";
const Card = ({ cade_title, cade_total }) => {
  return (
    <Fragment>
      <div className={`${css.container}`}>
        {/* <div className="card-body">
          <h5 className="card-title">
            {props.icon}
            {props.cade_title}
          </h5>
          <p>
            <h6 display="4" className="lead py-3">
              {
                <Avatar
                  size={70}
                  style={{ backgroundColor: "#f56a00", fontSize: "25px" }}
                >
                  {props.cade_total}
                </Avatar>
              }
            </h6>
          </p>
        </div> */}

        <div className={`${css.card}`}>
          <div className={`${css.card__title}`}>{cade_title}</div>
          <div className={`${css.card__body}`}>{cade_total}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
