import Link from "next/link";
import React from "react";

const DashboardFooter = () => {
  return (
    <div className="mt-12 border-t border-gray-100 pt-6">
      {" "}
      <div className="text-center sm:flex sm:justify-between sm:text-left">
        {" "}
        <p className="text-sm text-gray-500">
          <span className="block sm:inline">All rights reserved.</span>{" "}
          <Link className="inline-block text-teal-600 underline transition hover:text-teal-600/75" href="#">
            Terms & Conditions{" "}
          </Link>
          <span>&middot;</span>{" "}
          <Link className="inline-block text-teal-600 underline transition hover:text-teal-600/75" href="#">
            Privacy Policy{" "}
          </Link>{" "}
        </p>
        <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">&copy; 2024 Sepetimiz</p>{" "}
      </div>{" "}
    </div>
  );
};

export default DashboardFooter;
