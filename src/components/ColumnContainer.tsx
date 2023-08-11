import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Column, Id } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
}

function ColumnContainer(props: Props) {
  const { column, deleteColumn, updateColumn } = props;
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBgColor w-[350px] h-[500px] max-h-[500px] opacity-40 border-2 border-rose-500 rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBgColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      {/* Column Title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="bg-mainBgColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBgColor border-4 flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="flex items-center justify-center px-2 py-1 text-sm rounded-full bg-columnBgColor">
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="px-2 bg-black border rounded outline-none focus:border-rose-500"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="px-1 py-2 rounded stroke-gray-500 hover:stroke-white hover:bg-columnBgColor"
        >
          <TrashIcon />
        </button>
      </div>
      {/* Column taks container */}
      <div className="flex flex-grow">Content</div>
      {/* Column footer */}
      <div className="">Footer</div>
    </div>
  );
}

export default ColumnContainer;
