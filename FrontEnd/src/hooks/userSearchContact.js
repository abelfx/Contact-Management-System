const userSearchContact = () => {
  const searchContact = async (search) => {
    try {
      const res = await fetch("http://localhost:3000/contact/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: search }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        console.error(`Error ${res.status}: ${errorData}`);
        return;
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return searchContact;
};

export default userSearchContact;
