function Plus({ image, isVisible }) {
    const imagescr = isVisible
    ? require(`../img/ornament_big${image}.png`).default
    : require(`../img/ornament_big1.png`).default;
    
    return (
        <div
            style={{
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            <img
            src={imagescr}
            style={{
                height: "60px",
            }}
            alt='오너먼트'
            />
        </div>
    );
}
    
export default Plus;
    