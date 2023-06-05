import { BallTriangle } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <BallTriangle
        height={80}
        width={80}
        radius={5}
        color="#5cd3a8"
        ariaLabel="ball-triangle-loading"
        // wrapperClass={css.loader}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
}
