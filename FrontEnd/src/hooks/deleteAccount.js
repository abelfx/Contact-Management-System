const deleteAccount = async () => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "red",
  }).then((result) => {
    if (result.isConfirmed) {
      toast.success("Account Deleted");
      navigate("/signup");
    }
  });
};

export default deleteAccount;
