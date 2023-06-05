import css from './Home.module.css';

export default function Home() {
  return (
    <div>
      <h1 className={css.heroTitle}>Tweets app</h1>
      <h2 className={css.subTitle}>
        Please go to the Tweets page and add users you want to follow
      </h2>
    </div>
  );
}
