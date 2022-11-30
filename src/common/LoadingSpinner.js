
// import "./LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
    return (
        <div className="LoadingSpinner m-5" role="status">
            <div className="spinner-border" role="status" />
            <div className="lead">Loading...</div>
        </div>
    );
}

export default LoadingSpinner;