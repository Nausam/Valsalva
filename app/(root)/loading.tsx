import React from "react";

import classes from "./loading.module.css";

const loading = () => {
  return (
    <>
      <section className="wrapper flex items-center justify-center h-screen">
        <div className={classes.wrapper}>
          <div className={classes.circle}></div>
          <div className={classes.circle}></div>
          <div className={classes.circle}></div>
          <div className={classes.shadow}></div>
          <div className={classes.shadow}></div>
          <div className={classes.shadow}></div>
        </div>
      </section>
    </>
  );
};

export default loading;
