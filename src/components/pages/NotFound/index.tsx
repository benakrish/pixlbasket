import { Link } from 'react-router-dom';
import { Button } from '../../common/Button';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container not-found-container">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;