import Lottie from 'lottie-react';
import loadingAnimation from "../public/loader.json";

const LoadingUi = () => {
    return (
        <Lottie
            style={{
                width: "50%",
                left: "25%",
                position: "relative",
                height: "60vh",
                alignContent: "center"
            }}
            animationData={loadingAnimation}
        />
    );
}
export default LoadingUi;