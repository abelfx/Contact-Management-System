const useDeleteSingleContact = () => {
  const DeleteContact = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/${id}`, {
        method: "Delete",
      });

      const data = await res.json();
      if (data.Status === "deleted") {
        toast.error("Contact deleted successfully!");
      } else {
        toast.error("Contact is not deleted, please try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("It is not you it's us");
    }
  };

  return DeleteContact;
};

export default useDeleteSingleContact;
