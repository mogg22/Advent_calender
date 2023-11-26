import plus from "../img/plus.png";

function Plus({ onClick }) {
    return (
        <div 
        onClick={onClick}
            style={{
                width: "60px",
                height: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <img
                src={plus}
                style={{
                    width: "18px",
                    height: "18px",
                }}  
            />
        </div>
    );
}

export default Plus;
