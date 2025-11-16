import React, { useEffect, useState } from "react";

const Contribution = ({ model, reload }) => {
  const [contributors, setContributors] = useState([]);
  const [totalCollected, setTotalCollected] = useState(0);

  useEffect(() => {
    if (!model?._id) return;
console.log('hello')
    fetch(
      `https://my-cocerptual-session-server.vercel.app/contributions/${model._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        const result = data.result || [];
        setContributors(result);

        const total = result.reduce((sum, c) => sum + c.amount, 0);
        setTotalCollected(total);
      })
      .catch((err) => {
        console.error(err);
        setContributors([]);
        setTotalCollected(0);
      });
  }, [model._id,reload]);

  const progressPercent = Math.min((totalCollected / model.amount) * 100, 100);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-3">Contributors</h3>

      {/* <div className="flex items-center gap-4 mb-2">
  <div className="w-full absolute -amber-400 bg-gray-200 rounded-full flex h-6 overflow-hidden">

    <div
      className="h-full bg-green-500 text-indigo-700  relative top-1.5 left-10 b text-center text-sm font-semibold"
      style={{ width: `${progressPercent}%` }}
    >
      ${totalCollected} / ${model.amount}
    </div>

  </div>

  <span className="text-sm font-medium min-w-[50px]">
    {progressPercent.toFixed(1)}%
  </span>
</div> */}

<div className="flex items-center gap-4 mb-2">
  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden relative">

    {/* Progress Fill */}
    <div
      className="h-full bg-green-500 transition-all duration-500"
      style={{ width: `${progressPercent}%` }}
    ></div>

    {/* Center Text */}
    <div className="absolute inset-0 flex text-blue-700 items-center justify-center text-sm font-semibold ">
      ${totalCollected} / ${model.amount}
    </div>

  </div>

  <span className="text-sm font-medium min-w-[50px]">
    {progressPercent.toFixed(1)}%
  </span>
</div>



      {/* Contributors Table with Image */}
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Image</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Amount</th>
          </tr>
        </thead>
        <tbody>
          {contributors.length > 0 ? (
            contributors.map((c) => (
              <tr key={c._id}>
                <td className="border px-2 py-1">
                  <img
                    src={c.image || "https://via.placeholder.com/40"}
                    alt={c.contributorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="border px-2 py-1">
                  {c?.contributorName || "-"}
                </td>
                <td className="border px-2 py-1">{c?.email || "-"}</td>
                <td className="border px-2 py-1">${c?.amount || 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-2 py-1 text-center" colSpan={4}>
                No contributions yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Contribution;
