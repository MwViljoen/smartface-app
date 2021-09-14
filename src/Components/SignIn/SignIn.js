import React, {Component} from 'react';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            signInResponse: ''
        }
    }

    onEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    onSubmitSignIn = () => {
        const {email, password} = this.state;

        const data = {
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

        fetch('/signin', config)
            .then(response => response.json())
            .then(user => {
                if(user.id){
                    this.setState({
                        password: '',
                        email: '',
                        signInResponse: ''
                    })
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    this.setState({
                        signInResponse: user
                    })
                }
            });
    }

    render() {
        const {onRouteChange} = this.props;
        const {signInResponse} = this.state;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
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
                                   value="Sign in"
                                   onClick={this.onSubmitSignIn}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p className="f6 link dim black db pointer"
                               onClick={() => onRouteChange('register')}>
                                Register
                            </p>
                        </div>
                    </div>
                    <p className='f5 pt2 ma0 red fw9'>{signInResponse}</p>
                </main>
            </article>
        );
    }
}

export default SignIn;