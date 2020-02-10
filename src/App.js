import React from "react";
import "./App.css";
// Components
import Navigation from "./components/navigation/navigation.component.jsx";
import Logo from "./components/logo/logo.component.jsx";
import ImageLinkForm from "./components/image-link-form/image-link-form.component.jsx";
import FaceRecognition from "./components/face-recognition/face-recognition.component.jsx";
import Rank from "./components/rank/rank.component";
import Particles from "react-particles-js";
import particleOptions from "./particlesjs-config.json";
import Clarifai from "clarifai";
import SignIn from "./components/sign-in/sign-in.component.jsx";
import Register from "./components/register/register.component";

const app = new Clarifai.App({
    apiKey: "352da46f49bc408bba5c0afcd1b12186"
});

const INITIAL_STATE = {
    input: "",
    imageUrl: "",
    box: {},
    route: "signin",
    isSignedIn: false,
    currentUser: null
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    setCurrentUser = user => {
        this.setState({
            currentUser: {
                ...user
            }
        });
    };

    calculateFaceLocation = data => {
        const clarifaiFace =
            data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - clarifaiFace.right_col * width,
            bottomRow: height - clarifaiFace.bottom_row * height
        };
    };

    // componentDidMount() {
    //     fetch("http://localhost:4200/")
    //         .then(response => response.json())
    //         .then(data => console.log(data));
    // }

    displayFaceBox = box => {
        console.log(box);
        this.setState({ box: box });
    };

    onInputChange = event => {
        this.setState({ input: event.target.value });
    };

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => {
                if (response) {
                    fetch("http://localhost:4200/image", {
                        method: "put",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: this.state.currentUser.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState({
                                currentUser: {
                                    ...this.state.currentUser,
                                    entries: count
                                }
                            });
                        });
                }
                this.displayFaceBox(this.calculateFaceLocation(response));
            })
            .catch(err => console.log(err));
    };

    onRouteChange = route => {
        if (route === "signout") {
            this.setState({ isSignedIn: false });
            this.setState(INITIAL_STATE);
        } else if (route === "home") {
            this.setState({ isSignedIn: true });
        }
        this.setState({ route: route });
    };

    render() {
        return (
            <div className="App">
                <Particles params={particleOptions} className="particles" />
                <Navigation
                    isSignedIn={this.state.isSignedIn}
                    onRouteChange={this.onRouteChange}
                />
                {this.state.route === "home" ? (
                    <div>
                        {" "}
                        <Logo />
                        <Rank
                            entries={this.state.currentUser.entries}
                            name={this.state.currentUser.name}
                        />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition
                            box={this.state.box}
                            imageUrl={this.state.imageUrl}
                        />
                    </div>
                ) : this.state.route === "signin" ? (
                    <SignIn
                        onRouteChange={this.onRouteChange}
                        setCurrentUser={this.setCurrentUser}
                    />
                ) : (
                    <Register
                        onRouteChange={this.onRouteChange}
                        setCurrentUser={this.setCurrentUser}
                    />
                )}
            </div>
        );
    }
}

export default App;
