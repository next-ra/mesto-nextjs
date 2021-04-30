import PlaceCard from './place-card';
import styles from './places-list.module.css';

const PlacesList = ({ cards }) => {
  return (
    <div className={styles.list}>
      {cards.map((card) => (
        <PlaceCard
          key={card._id}
          id={card._id}
          name={card.name}
          image={card.link}
          likes={card.likes}
          owner={card.owner}
        />
      ))}
    </div>
  );
};

export default PlacesList;
