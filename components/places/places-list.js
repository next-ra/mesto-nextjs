import PlaceCard from './place-card';
import styles from './places-list.module.css';

const PlacesList = ({ cards }) => {
  return (
    <div className={styles.list}>
      {cards.map((card) => (
        <PlaceCard
          key={card.id}
          id={card.id}
          name={card.name}
          image={card.image}
        />
      ))}
    </div>
  );
};

export default PlacesList;
