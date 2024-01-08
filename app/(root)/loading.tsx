import React from "react";

import classes from "./loading.module.css";

const loading = () => {
  return (
    <>
      <section className="wrapper flex items-center justify-center h-screen">
        <div className={classes.loader}></div>
      </section>
    </>
  );
};

export default loading;
