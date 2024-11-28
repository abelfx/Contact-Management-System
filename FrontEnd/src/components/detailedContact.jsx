import React from "react";

const detailedContact = () => {
  return (
    <div className="text-gray-800">
      <h1 className="text-center font-bold pb-5 text-2xl">
        Detailed Contact Information
      </h1>
      <div className="p-2">
        <p>
          <strong> FullName: </strong>
          John Doe
        </p>
      </div>

      <div className="p-2">
        <p>
          <strong>Phone Number: </strong>
          +1 555 444 3210
        </p>
      </div>

      <div className="p-2">
        <p>
          <strong>Email: </strong>
          johnDoe@gmail.com
        </p>
      </div>
      <div className="p-2">
        <p>
          <strong>Notes: </strong>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore iste
          natus cumque ad est quisquam ab aspernatur dolore suscipit! Omnis est
          sit nobis tempora odio dolorem accusamus quibusdam doloribus odit.
        </p>
      </div>
    </div>
  );
};

export default detailedContact;
