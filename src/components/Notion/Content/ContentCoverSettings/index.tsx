import React, { ChangeEvent } from "react";
import styles from "./ContentCoverSettings.module.scss";
import { Menu } from "@headlessui/react";
import { ButtonTab } from "../../buttons/ButtonTab";
import { Button } from "../../buttons/Button";
import { Gallery } from "../Gallery";
import { UploadFile } from "../../UploadFile";
import { LinkUrl } from "../../LinkUrl";

import { main } from "../../../../data/languages/main";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { userSlice } from "../../../../store/user/user.slice";
import { IPage } from "../../../../types/interface";
import saveImage from "../../../../store/user/saveImage";

export const ContentCoverSettings = ({
  cName,
}: {
  cName: string;
}): React.ReactElement => {
  const { lang, activePage } = useAppSelector((store) => store.userReducer);
  const data = main[lang];
  const [tab, setTab] = React.useState("gallery");

  const dispatch = useAppDispatch();
  const { updatePagesState } = userSlice.actions;

  function updatePageStateFn(replaceObject: Partial<IPage>) {
    if (activePage?._id) {
      const pageId = activePage._id;
      dispatch(
        updatePagesState({
          replaceObject,
          pageId,
        })
      );
    }
  }

  const handleRemoveBackground = () => {
    const replaceObject = { cover: { url: "", position: 100 } };
    updatePageStateFn(replaceObject);
  };
  const setCaver = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = await saveImage(e);
    updatePageStateFn({ cover: { url, position: 100 } });
  };

  const addCoverLink = (url: string) =>
    updatePageStateFn({ cover: { url, position: 100 } });

  return (
    <Menu as="div" className="notion-popup__menu">
      <Menu.Button>
        <div className={cName}>{data.text_change_cover}</div>
      </Menu.Button>
      <Menu.Items className={`${styles.popup} notion-popup__body`}>
        <div className={styles.container}>
          <div className={styles.control}>
            <div className={styles.control__tab}>
              <ButtonTab
                text={data.text_gallery}
                target="gallery"
                tab={tab}
                handle={setTab}
              />
              <ButtonTab
                text={data.text_update}
                target="upload"
                tab={tab}
                handle={setTab}
              />
              <ButtonTab
                text={data.text_link}
                target="link"
                tab={tab}
                handle={setTab}
              />
            </div>
            <div className={styles.control__button}>
              <Button text={data.text_remove} handle={handleRemoveBackground} />
            </div>
          </div>

          <div className={styles.body}>
            {tab === "gallery" && <Gallery />}
            {tab === "upload" && <UploadFile handle={setCaver} />}
            {tab === "link" && <LinkUrl handle={addCoverLink} />}
          </div>
        </div>
      </Menu.Items>
    </Menu>
  );
};
