import React from "react";
import "./App.css";
// Components
import Navigation from "./components/navigation/navigation.component.jsx";
import Logo from "./components/logo/logo.component.jsx";
import ImageLinkForm from "./components/image-link-form/image-link-form.component.jsx";
import FaceRecognition from "./components/face-recognition/face-recognition.component.jsx";

function App() {
    return (
        <div className="App">
            <Navigation />
            <Logo />
            <ImageLinkForm />
            <FaceRecognition />
        </div>
    );
}

export default App;
