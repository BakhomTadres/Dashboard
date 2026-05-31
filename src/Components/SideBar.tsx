import { useNavigate } from "react-router-dom";

export default function SideBar({
  active,
  setActive,
}: {
  active?: string;
  setActive?: React.Dispatch<React.SetStateAction<string>>;
}) {
  let navigate = useNavigate();

  const items = [
    { key: "tasks", icon: "fa-list-check", path: "/" },
    { key: "completed", icon: "fa-clipboard-check", path: "/completed" },
    { key: "pending", icon: "fa-clock", path: "/pending" },
  ];

  return (
    // hidden على موبايل — يظهر من md فأكبر فقط
    <aside className="absolute z-10 left-0 top-16 hidden md:flex flex-col items-center w-16 h-[calc(100vh-64px)] bg-white shadow-md py-4 gap-3">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => {
            setActive && setActive(item.key);
            navigate(item.path);
          }}
          className={`cursor-pointer h-9 w-9 flex justify-center items-center border-2 border-teal-400 rounded-full transition duration-200
            ${active === item.key
              ? "bg-teal-400 text-white"
              : "bg-white text-teal-400 hover:bg-teal-400 hover:text-white"
            }`}
        >
          <i className={`fa-solid ${item.icon} text-sm`}></i>
        </button>
      ))}
    </aside>
  );
}
