import React, {Component, Fragment} from "react";
import './App.css';
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Navigation from "./Components/Navigation/Navigation";
import Register from "./Components/Register/Register";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";

import Particles from "react-particles-js";
import 'tachyons';
import SignIn from "./Components/SignIn/SignIn";

const particleOptions = {
    particles: {
        line_linked: {
            shadow: {
                enable: true,
                color: "#3CA9D1",
                blur: 2
            }
        },
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 700
            }
        }
    }
}

const initialState = {
    input: '',
    imgUrl: '',
    box: {},
    route: 'signIn',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component{
    constructor(props) {
        super(props);
        this.state = initialState
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        });
    }

    onChange = (event) => {
        this.setState({
            input: event.target.value
        })
    }

    onDetect = () => {
        const {input, user} = this.state;
        this.setState({imgUrl: input});
        fetch('/imageurl', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({input: this.state.input})
        })
            .then((response) => response.json())
            .then((response) => {
                if (response) {
                    fetch('/image', {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({id: user.id})
                    })
                        .then(response => response.json())
                        .then((entries) => {
                            this.setState(Object.assign(user, {entries: entries}))
                        })
                        .catch((err) => console.log)
                }
                this.displayFaceBox(this.calculateFaceLocation(response));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    displayFaceBox = (box) => {
        this.setState({
            box: box
        })
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        }
    }

    onRouteChange = (route) => {
        if (route === 'signIn' || route === 'register') {
            this.setState(initialState);
        } else if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({route: route});
    }

    render() {
        const {isSignedIn, route, imgUrl, box, user} = this.state;
        return (
            <div className="App">
                <Particles className="particles" params={particleOptions}/>
                <Navigation
                    onRouteChange={this.onRouteChange}
                    isSignedIn={isSignedIn}
                />
                {
                    route === 'signIn'
                        ? <SignIn onRouteChange={this.onRouteChange}
                                  loadUser={this.loadUser}
                        />
                        : route === 'register'
                        ? <Register
                            onRouteChange={this.onRouteChange}
                            loadUser={this.loadUser}
                        />
                        : <Fragment>
                            <Logo/>
                            <Rank user={user}/>
                            <ImageLinkForm
                                onChange={this.onChange}
                                onDetect={this.onDetect}
                            />
                            <FaceRecognition
                                imageURL={imgUrl}
                                box={box}
                            />
                        </Fragment>
                }
            </div>
        );
    }
}

export default App;
