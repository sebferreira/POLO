import {useEffect, useState} from "react";
import {getAllUserBoards} from "../queryFn";

export function useBoard() {
  const [boards, setBoards] = useState([]);

  const getAllBoards = async () => {
    const data = await getAllUserBoards();
    if (data.length === 0) {
      return console.log(data, "hola11");
    }
    setBoards(data);
  };
  useEffect(() => {
    getAllBoards();
  }, []);
  return {boards};
}
