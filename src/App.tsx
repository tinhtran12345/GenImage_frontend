import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ImageProvider } from "./context/ImageProvider";

function App() {
    return (
        <>
            <ImageProvider>
                <RouterProvider router={router} />
            </ImageProvider>
        </>
    );
}

export default App;
