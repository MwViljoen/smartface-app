import React, {Component} from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            registerResponse: ''
        }
    }

    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    onEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit = () => {
        const {name, email, password} = this.state;

        const data = {
            name: name,
            email: email,
            password: password
        }

        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch('/register', config)
            .then(response => response.json())
            .then(user => {
                if(user.id){
                    this.props.loadUser(user);
                    this.setState({
                        name: '',
                        email: '',
                        password: '',
                        registerResponse: ''
                    })
                    this.props.onRouteChange('home');
                } else {
                    this.setState({
                        registerResponse: user
                    })
                }
            });
    }

    render() {
        const {registerResponse} = this.state;
        return (
            <div>
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0 center">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                           type="text"
                                           name="name"
                                           id="name"
                                           onChange={this.onNameChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                           type="email"
                                           name="email-address"
                                           id="email-address"
                                           onChange={this.onEmailChange}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                           type="password"
                                           name="password"
                                           id="password"
                                           onChange={this.onPasswordChange}
                                    />
                                </div>
                            </fieldset>
                            <div className="">
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                       type="submit"
                                       value="Register"
                                       onClick={this.onSubmit}
                                />
                            </div>
                        </div>
                        <p className='f5 pt2 ma0 red fw9'>{registerResponse}</p>
                    </main>
                </article>
            </div>
        );
    }
}

export default Register;