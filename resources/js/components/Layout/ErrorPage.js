import React ,{Component} from 'react';
import { Link } from "react-router-dom";

class ErrorPage extends Component{
    render() {
        return (
            <React.Fragment>
                <div id="error">
                    <div className="container text-center pt-32">
                        <h1 className='error-title'>404</h1>
                        <p>we couldn't find the page you are looking for</p>
                        <Link to='/' className={'btn btn-primary'} >Go Home</Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default ErrorPage;

