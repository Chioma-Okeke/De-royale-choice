import React from "react";

function MainDashboardContainer({ children }: { children: React.ReactNode }) {
    return <div className="flex-1 max-lg:pl-12 pl-[255px]">{children}</div>;
}

export default MainDashboardContainer;
