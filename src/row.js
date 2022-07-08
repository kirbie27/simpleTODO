import { ToastContainer, toast } from 'react-toastify';

const Row = (props) => {

    const handleSubmit = event => {
        // 👇️ prevent page refresh
        event.preventDefault();
      };

    const rowStyle = {
        width: "100%",
        minHeight: "5rem",
        backgoundColor: "white",
        display: "flex",
        flexDirection: "row",
        gap: "1rem"
    };
 
    const left = props.rowLeft === undefined ? "" : props.rowLeft;
    const right = props.rowRight === undefined ? "" : props.rowRight;
    return (
        <form className = "row" onSubmit = {handleSubmit} style = {rowStyle}>
            {left}
            {right}
            <ToastContainer toastStyle={
                {
                    color: "white",
                    backgroundColor: "#212121"
                }
            }></ToastContainer>
        </form>
    );
}

export default Row;