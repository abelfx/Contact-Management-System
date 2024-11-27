const userSearchContact = () => {
  const searchContact = async (search) => {
    const res = await fetch("http://localhost:3000/contact/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search }),
    });

    const data = res.json();

    console.log(data);
  };

  return searchContact;
};

export default userSearchContact;
