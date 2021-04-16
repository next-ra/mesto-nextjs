import styles from './place-card.module.css';

const PlaceCard = (props) => {
  const { image, name, id, likes } = props;
  return (
    <div className={styles['place-card']} id={id}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <button className={styles['delete-icon']} />
      </div>
      <div className={styles.description}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles['like-box']}>
          <button className={styles['like-icon']} />
          <p className={styles['like-counter']}>{likes.length || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
