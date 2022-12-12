import clsx from "clsx";
import React from "react";
import styles from "./ModalEditing.module.scss";

interface ModalEditingProps {
  editing: () => void;
  remove: () => void;
  location: string;
}

const ModalEditing: React.FC<ModalEditingProps> = ({
  editing,
  remove,
  location,
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={styles.dialogWindowBlock}
      style={
        location === "left"
          ? { left: "120%", position: "absolute", top: "0" }
          : { right: "120%", position: "absolute", top: "0" }
      }
    >
      <ul className={styles.dialogWindowItems}>
        <li onClick={editing}>
          <button>Редактировать</button>
        </li>
        <li onClick={remove}>
          <button>Удалить</button>
        </li>
      </ul>
    </div>
  );
};

export default ModalEditing;
