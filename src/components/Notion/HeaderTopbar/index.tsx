import React from "react";
import styles from "./HeaderTopbar.module.scss";
import { Menu } from "@headlessui/react";
import { ButtonStyle } from "../ButtonStyle";
import { ButtonSwitch } from "../ButtonSwitch";
import { ReactComponent as FavoriteSVG } from "../../../assets/img/svg/favorite.svg";
import { ReactComponent as FavoriteActiveSVG } from "../../../assets/img/svg/favorite_active.svg";
import { ReactComponent as TrashSVG } from "../../../assets/img/svg/trash.svg";
import { ReactComponent as CopySVG } from "../../../assets/img/svg/copy.svg";
import { ReactComponent as MoreSVG } from "../../../assets/img/svg/more.svg";
import { ReactComponent as MoveToSVG } from "../../../assets/img/svg/move_to.svg";

import { ButtonMini } from "../ButtonMini";
import { Button } from "../Button";

export const HeaderTopbar = (): React.ReactElement => {
  const [toogleFavorite, setToogleFavorite] = React.useState<boolean>(false);
  const [font, setFont] = React.useState<string>("default");
  const handleFavorite = () => {
    setToogleFavorite(!toogleFavorite);
  };

  const data = {
    text_add_favorite: "Add to Favorites",
    text_remove_favorite: "Remove from Favorites",
    text_copy_link: "Copy link",
    text_delete: "Delete",
    text_rename: "Rename",
    text_move_to: "Move to",
    text_not_page: "Not pages inside",
    text_style: "Style",
    text_style_dafault: "Default",
    text_style_serif: "Serif",
    text_style_mono: "Mono",
    text_small_text: "Small text",
    text_full_width: "Full width",
  };

  const dataPage = {
    object: "page",
    id: 102,
    cover: null,
    icon: null,
    favorite: false,
    property: {
      font: "default",
      small_text: false,
      full_width: false,
    },
    name: "Name Page",
    url: "/page/3",
    children: [],
  };

  return (
    <>
      <div className={styles.topbar}>
        <ButtonMini
          icon={toogleFavorite ? <FavoriteSVG /> : <FavoriteActiveSVG />}
          handle={handleFavorite}
        />
        <Menu as="div" className={styles.topbar__menu + " notion-popup__menu"}>
          <Menu.Button className={styles.topbar__more}>
            <ButtonMini icon={<MoreSVG />} />
          </Menu.Button>
          <Menu.Items className={styles.topbar__popup + " notion-popup__body"}>
            <div className={styles.topbar__style}>
              <div className={styles.topbar__title}>{data.text_style}</div>
              <div className={styles.topbar__row}>
                <ButtonStyle
                  description={data.text_style_dafault}
                  font={font}
                  target="default"
                  handle={setFont}
                />

                <ButtonStyle
                  description={data.text_style_serif}
                  font={font}
                  target="serif"
                  handle={setFont}
                />
                <ButtonStyle
                  description={data.text_style_mono}
                  font={font}
                  target="mono"
                  handle={setFont}
                />
              </div>
            </div>
            <div className="hr-line"></div>
            <div className={styles.topbar__wrapper}>
              <ButtonSwitch text={data.text_small_text} status={true} />
              <ButtonSwitch text={data.text_full_width} status={false} />
            </div>
            <div className="hr-line"></div>
            <div className={styles.topbar__wrapper}>
              <Button
                icon={<MoveToSVG />}
                text={data.text_move_to}
                cName={styles.topbar__button}
                hotkey="Ctrl+Shft+P"
              />
            </div>
            <div className="hr-line"></div>
            <Button
              icon={<FavoriteSVG />}
              text={data.text_add_favorite}
              cName={styles.topbar__button}
            />
            <Button
              icon={<CopySVG />}
              text={data.text_copy_link}
              cName={styles.topbar__button}
              hotkey="Ctrl+Alt+L"
            />
            <Button
              icon={<TrashSVG />}
              text={data.text_delete}
              cName={styles.topbar__button}
            />
          </Menu.Items>
        </Menu>
      </div>
    </>
  );
};