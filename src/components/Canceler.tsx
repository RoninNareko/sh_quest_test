import { Button } from "@mui/material";
import { DataType } from "./SingleAutoComplite/SingleAutoComplite.types";

interface Iprops {
  multiple: true | false;
  data: DataType[];
  setStore: any;
  setCancel: any;
  setValue: any; //@ts-ignore
}

function Canceler({ data, setStore, setValue, setCancel, multiple }: Iprops) {
  const buttons = document.querySelectorAll(".myButton");
  if (buttons.length > 1) {
    // @ts-ignore
    buttons[0].style.display = "block";
  }
  const copyData = [...data];
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
