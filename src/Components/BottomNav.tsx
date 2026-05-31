import { useNavigate } from "react-router-dom";

export default function BottomNav({
  active,
  setActive,
}: {
  active?: string;
  setActive?: React.Dispatch<React.SetStateAction<string>>;
}) {
  let navigate = useNavigate();

  const items = [
    { key: "tasks", icon: "fa-list-check", label: "Tasks", path: "/" },
    { key: "completed", icon: "fa-clipboard-check", label: "Completed", path: "/completed" },
    { key: "pending", icon: "fa-clock", label: "Pending", path: "/pending" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setActive && setActive(item.key);
              navigate(item.path);
            }}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors duration-200
              ${active === item.key
                ? "text-teal-400"
                : "text-gray-400 hover:text-teal-400"
              }`}
          >
            <i className={`fa-solid ${item.icon} text-lg`}></i>
            <span className="text-[10px] font-medium">{item.label}</span>
            {active === item.key && (
              <span className="absolute bottom-0 w-1/3 h-0.5 bg-teal-400 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
