import React from "react";

const Stat = () => {
  return (
<div>

  <div>
    <h1 className="text-3xl text-center text-[#FFD700]">
      See Our Contribution
    </h1>
  </div>




      <div className="flex justify-center items-center my-10">
      <div className="stats stats-vertical bg-[#FFD700] lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Total registered users</div>
          <div className="stat-value">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title">total issues resolved </div>
          <div className="stat-value">200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">pending</div>
          <div className="stat-value">20</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
</div>
  );
};

export default Stat;
