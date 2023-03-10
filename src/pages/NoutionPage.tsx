import React from "react";
import { useParams } from "react-router";
import { Content } from "../components/Notion/Content";
import { Header } from "../components/Notion/Header";
import { Home } from "../components/Notion/Home";
import { Sidebar } from "../components/Notion/Sidebar";
import SkeletonContent from "../components/Notion/Skeleton/SkeletonContent";
import { TextEditorProvider } from "../editor/TextEditor";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getUser } from "../store/user/user.action";
import { userSlice } from "../store/user/user.slice";

function NoutionPage() {
  const dispatch = useAppDispatch();

  const { navigate, theme, user, isLoading } = useAppSelector(
    (state) => state.userReducer
  );
  const { updateActivePage, updateArrayPage } = userSlice.actions;

  async function load() {
    if (!user) {
      const logData = await getUser();
      dispatch(logData);
    }
  }

  load();

  const { pageId } = useParams();

  React.useEffect(() => {
    if (pageId && user) {
      dispatch(updateActivePage());
      dispatch(updateArrayPage());
    }
  }, [pageId]);

  return (
    <>
      <div className="notion" data-theme={theme}>
        <aside className="notion__aside" data-status={navigate}>
          <Sidebar />
        </aside>
        <section className="notion__section">
          <>
            <Header />
            {isLoading ? (
              <SkeletonContent />
            ) : pageId === "home" ? (
              <Home />
            ) : (
              <TextEditorProvider>
                <Content />
              </TextEditorProvider>
            )}
          </>
        </section>
      </div>
    </>
  );
}

export default NoutionPage;
