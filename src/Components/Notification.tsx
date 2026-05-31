export default function Notification({ type }: { type: "success" | "info" | "error" | string }) {
  return (
    <div
      className={
        type === "success"
          ? `fixed z-50 bottom-4 right-4 bg-green-400 text-white p-4 rounded-md shadow-lg`
          : type === "info"
          ? `fixed z-50 bottom-4 right-4 bg-blue-400 text-white p-4 rounded-md shadow-lg`
          : `fixed z-50 bottom-4 right-4 bg-red-400 text-white p-4 rounded-md shadow-lg`
      }
    >
      {type === "success" ? (
        <div>
          <i className="fa-regular fa-circle-check"></i> Added task successfully!
        </div>
      ) : type === "info" ? (
        <div>
          <i className="fa-solid fa-pen-to-square"></i> Edited successfully!
        </div>
      ) : type === "error" ? (
        <div>
          <i className="fa-regular fa-circle-xmark"></i> Task is removed
          successfully!
        </div>
      ) : ""}
    </div>
  );
}
