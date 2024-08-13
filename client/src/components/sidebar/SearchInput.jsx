import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (event) => {
    event.preventDefault();

    // if search input is empty, dont allow submit
    if (!search) {
      return;
    }
    if (search.length < 3) {
      return toast.error("search term must be at least 3 characters long");
    }

    //** explanation
    const searchedConversation = conversations.find((c) => {
      return c.fullName.toLowerCase().includes(search.toLowerCase());
    });

    if (searchedConversation) {
      setSelectedConversation(searchedConversation);
      setSearch(""); // clear search input field after submit
    } else toast.error("no such user found");
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <button type="submit" className="btn btn-circle bg-sky-500">
        <IoSearchSharp className="w-5 h-5 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;

//**
//
