const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
