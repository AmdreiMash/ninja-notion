import React from "react";
import { Content } from "../components/Notion/Content";
import { Header } from "../components/Notion/Header";
import { Sidebar } from "../components/Notion/Sidebar";
import { IPage, IStateContext } from "../types/interface";

import { dataPage } from "../data/dataPage";
import { Ttheme } from "../types/types";

export const StateContext = React.createContext<Partial<IStateContext>>({});

export function NoutionPage() {
  const [pageState, setPageState] = React.useState<IPage>(dataPage);

  const theme: Ttheme = "cobalt2" || "dark";
  const [asideStatus, setAsideStatus] = React.useState<boolean>(true);
  const handleAsideToggle = () => {
    setAsideStatus(!asideStatus);
  };

  const context = { handleAsideToggle, asideStatus, pageState, setPageState };

  return (
    <>
      <StateContext.Provider value={{ context }}>
        <div className="notion" data-theme={theme}>
          <aside className="notion__aside" data-status={asideStatus}>
            <Sidebar />
          </aside>
          <section className="notion__section">
            <Header />
            <Content />
          </section>
        </div>
      </StateContext.Provider>
    </>
  );
}
