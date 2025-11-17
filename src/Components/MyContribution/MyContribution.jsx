import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

const MyContribution = () => {
  const { user } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    if (!user?.accessToken) return;

    fetch(
      `https://my-cocerptual-session-server.vercel.app/contributions?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setContributions(data.result);
      })
      .catch((err) => console.error("Error fetching contributions:", err));
  }, [user?.email, user?.accessToken]);

  const handleDownload = (contribution) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Contribution Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Contributor: ${contribution.contributorName}`, 14, 30);
    doc.text(`Email: ${user.email}`, 14, 38);
    doc.text(
      `Date: ${new Date(contribution.date).toLocaleDateString()}`,
      14,
      46
    );

    autoTable(doc, {
      startY: 60,
      head: [["Field", "Details"]],
      body: [
        ["Issue Title", contribution.issueTitle],
        ["Category", contribution.category],
        ["Paid Amount", `$${contribution.amount}`],
        ["Issue ID", contribution.issueId || "N/A"],
      ],
    });
    toast("Report is  downloading.....");

    doc.save(`${contribution.issueTitle}_report.pdf`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Contributions</h2>

      {contributions.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          You haven;t made any contributions yet.
        </p>
      ) : (
        <>
          {/* ---------------------- LG: TABLE VIEW ---------------------- */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="table w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Issue Title</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>

              <tbody>
                {contributions.map((c) => (
                  <tr key={c._id} className="text-center border">
                    <td className="p-2 border">{c.issueTitle}</td>
                    <td className="p-2 border">{c.category}</td>
                    <td className="p-2 border">${c.amount}</td>
                    <td className="p-2 border">
                      {new Date(c.date).toLocaleDateString()}
                    </td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDownload(c)}
                        className="btn btn-sm btn-primary"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------------------- SM: CARD VIEW ---------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
            {contributions.map((c) => (
              <div key={c._id} className="card bg-base-100 shadow-lg border">
                <div className="card-body p-5">
                  <h2 className="card-title text-lg font-bold">
                    {c.issueTitle}
                  </h2>

                  <p>
                    <strong>Category: </strong> {c.category}
                  </p>
                  <p>
                    <strong>Contributor: </strong> {c.contributorName}
                  </p>
                  <p>
                    <strong>Paid Amount: </strong>${c.amount}
                  </p>
                  <p>
                    <strong>Date: </strong>
                    {new Date(c.date).toLocaleDateString()}
                  </p>

                  <div className="card-actions justify-end mt-3">
                    <button
                      onClick={() => handleDownload(c)}
                      className="btn btn-sm btn-primary"
                    >
                      Download Report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyContribution;
