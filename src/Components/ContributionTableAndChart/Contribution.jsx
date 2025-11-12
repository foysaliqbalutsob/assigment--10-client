import React, { useEffect, useState } from "react";

const Contribution = ({ model }) => {
  const [contributors, setContributors] = useState([]);
  const issueId = model._id; // মডেলের id

  useEffect(() => {
    if (!issueId) return;

    fetch(`http://localhost:3000/contributions/issue/${issueId}`)
      .then((res) => res.json())
      .then((data) => setContributors(data.result))
      .catch((err) => console.error(err));
  }, [issueId]);

  return (
    <div className="mt-6 p-4 border rounded-lg bg-white shadow">
      <h3 className="text-xl font-bold mb-3">Contributions</h3>
      {contributors.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1">Contributor</th>
              <th className="border px-2 py-1">Amount</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Info</th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((c) => (
              <tr key={c._id}>
                <td className="border px-2 py-1">{c.contributorName}</td>
                <td className="border px-2 py-1">${c.amount}</td>
                <td className="border px-2 py-1">{new Date(c.date).toLocaleDateString()}</td>
                <td className="border px-2 py-1">{c.info}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contributions yet.</p>
      )}
    </div>
  );
};

export default Contribution;
