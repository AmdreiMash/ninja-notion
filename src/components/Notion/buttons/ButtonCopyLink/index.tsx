import React from "react";
import styles from "./ButtonCopyLink.module.scss";
import { Button } from "../Button";
import { ReactComponent as CopySVG } from "../../../../assets/img/svg/copy.svg";

import { useAppSelector } from "../../../../hooks/redux";
import { main } from "../../../../data/languages/main";
import copy from "copy-to-clipboard";
import { TpageId } from "../../../../types/types";

export const ButtonCopyLink: React.FC<TpageId> = ({ pageId }) => {
  const { lang } = useAppSelector((store) => store.userReducer);
  const data = main[lang];

  const [text, setText] = React.useState(data.text_copy_link);

  function onClick() {
    if (pageId) {
      const protocol = window.location.protocol;
      const host = window.location.host;
      const pageUrl = `${protocol}://${host}/pages/${pageId}`;
      copy(pageUrl);
      setText(data.text_copy_link_ok);
      setTimeout(() => setText(data.text_copy_link), 1000);
    }
  }

  return (
    <>
      <div className={`${styles.button}`} onClick={onClick}>
        <Button icon={<CopySVG />} text={text} />
      </div>
    </>
  );
};
