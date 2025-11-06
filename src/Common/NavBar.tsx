import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../Store/Slices/app_slice";
import { LocalStorage } from "../Utils/Localstorage";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setIsLoading(true));

    await LocalStorage.clearStorage();
    window.location.reload();
  };

  return (
    <header className="h-16 bg-gray-800 text-white flex items-center px-4 justify-between">
      <span className="text-lg font-semibold">Welcome, Admin</span>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700 transition"
      >
        <FiLogOut className="text-lg" />
      </button>
    </header>
  );
};

export default Navbar;
