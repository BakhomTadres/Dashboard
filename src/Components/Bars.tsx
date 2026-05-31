
export default function Bars({ show, setShowMobileSidebar, children }: { show: boolean; setShowMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>; children: React.ReactNode  }) {
  return (
    <>
      {show && (
        <>
        <div
        onClick={() => setShowMobileSidebar(false)}
        className="fixed z-20 h-[calc(100vh-56px)] left-0 top-14 w-full bg-gray-900 opacity-60 block lg:hidden"
        ></div>
        <div className="fixed z-50 top-14 right-0 h-[calc(100vh-56px)] w-1/2 overflow-y-auto bg-white p-4 block lg:hidden">
          {children}
        </div>
        </>
      )}
      
    </>
  );
}
