import useDeleteSingleContact from "../hooks/useDeleteSingleContact";

const deleteContacts = () => {
  const DeleteContacts = useDeleteSingleContact();

  const contactDeleter = (e) => {
    e.preventDefault();
    DeleteContacts(id);
  };
  return (
    <div>
      <h1 className="text-black font-bold text-2xl text-center m-4">
        Delete All Contacts?
      </h1>
      <form onSubmit={contactDeleter}>
        <input
          type="text"
          className="input w-full mb-3 bg-blue-100"
          placeholder="write Delete "
          value={dWritten}
          onChange={(e) => setDWritten(e.target.value)}
        />
        <button
          className="delete btn bg-red-500 border-none hover:bg-red-600 text-white w-full"
          type="submit"
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default deleteContacts;
