import { DataType } from "../types";
import { Button } from "@mui/material";

interface Iprops {
  multiple: true | false;
  data: DataType[];
  setStore: any;
  setCancel: any;
  setValue: any; //@ts-ignore
}

function Canceler({ data, setStore, setValue, setCancel, multiple }: Iprops) {
  const copyData = [...data];
  const cancelAddButton = document.querySelectorAll("button")[3];
  if (cancelAddButton) {
    cancelAddButton.style.display = "block";
  }
  const lastaddedElement = copyData[copyData.length - 1];
  //@ts-ignore
  const onClick = (e) => {
    e.preventDefault(e);
    if (!multiple) {
      copyData.splice(-1);
      //@ts-ignore
      setStore((prevState) => {
        return {
          ...prevState,
          cutomSelectTextInput: {
            value: null,
            data: copyData,
            selectedData: [],
            error: {
              errorMessage: null,
            },
          },
        };
      });
      setValue(null);
      setCancel(false);
    }
  };
  if (lastaddedElement) {
    const entity = lastaddedElement.name;
    //
    return (
      <div>
        <Button
          className={"myButton"}
          onClick={onClick}
          color={"error"}
          variant={"contained"}
          size="small"
        >
          Отменить добалвение --- <b>{`${entity}`}</b>
        </Button>
      </div>
    );
  }
  return <></>;
}

export default Canceler;
