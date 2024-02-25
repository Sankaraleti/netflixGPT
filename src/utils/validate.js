export const validateFormData = (
  email,
  password,
  name = null,
  isSignup = false
) => {
  const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isValidPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  if (!isValidEmail) return "Email Id is Invalid";
  if (!isValidPassword) return "Password is Invalid";
  if (isSignup && name.length < 3) return "Name should be atleast 3 characters";
  return null;
};
