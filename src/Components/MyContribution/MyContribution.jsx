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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributions.map((c) => (
            <div key={c._id} className="card bg-base-100 shadow-xl border">
              <div className="card-body">
                <h2 className="card-title text-lg font-bold">{c.issueTitle}</h2>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Category:</span>{" "}
                  {c.category || "Not   specified"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Contributor:</span>{" "}
                  {c.contributorName}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Paid Amount:</span> $
                  {c.amount}
                </p>
                <p className="text-sm   text-gray-600">
                  <span className="font-semibold   ">Date:</span>{" "}
                  {new Date(c.date).toLocaleDateString()}
                </p>

                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleDownload(c)}
                    className="btn   btn-sm btn-primary"
                  >
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyContribution;
