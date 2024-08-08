import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  const signup = async ({
    // destructure arguments passed from signup form imput values
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    // check all validations for signup input fields
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    // create/signup user in the backend w/ form input values
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();
      // if the backend catches an error: it will be caught here and displayed in the error toast
      if (data.error) {
        throw new Error(data.error);
      }

      // save created user in localstorage
      localStorage.setItem("chat-user", JSON.stringify(data));
      // save created user in context
      setAuthUser(data);

      console.log("user created in backend:", data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // if signup = error or success, loading should = false
    }
  };
  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields.");
    return false; // so success will = false and handleInputErrors will not continue (return)
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters.");
    return false;
  }

  return true; // so success will = true and handleInputErrors will continue (return)
}
